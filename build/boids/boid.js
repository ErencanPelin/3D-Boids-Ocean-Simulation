import * as THREE from '../three.module.js';
import { BoidSettings } from './boidSettings.js';

class Boid {
    constructor(
        id = 0,
        cohesion = 0.02,
        separation = 0.15,
        alignment = 0.02,
        moveSpeed = 0.8,
        separationAwareness = 3,
        awareness = 50,
        color) {

        this._id = id;
        this._cohesion = cohesion;
        this._separation = separation;
        this._alignment = alignment;
        this._moveSpeed = moveSpeed;
        this._separationAwareness = separationAwareness;
        this._awareness = awareness;
        this._color = color;

        //spawn
        var xSpawn = ((BoidSettings.worldSize - 50) * Math.random()) - ((BoidSettings.worldSize * 0.5) - 25);
        var ySpawn = ((BoidSettings.worldSize - 50) * Math.random()) - ((BoidSettings.worldSize * 0.5) - 25);
        var zSpawn = ((BoidSettings.worldSize - 50) * Math.random()) - ((BoidSettings.worldSize * 0.5) - 25);

        //start each boid at a random position
        this.position = new THREE.Vector3(xSpawn, ySpawn, zSpawn);
        this.velocity = new THREE.Vector3().randomDirection();//new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.velocity.setLength(Math.random() * (4 - 2) + 2);
        this.acceleration = new THREE.Vector3();
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.clampLength(-this._moveSpeed, this._moveSpeed);
        this.boidMesh.position.set(this.position.x, this.position.y, this.position.z);

        this.acceleration.set(0, 0, 0);
    }

    viewingAngle(other) {
        let rads = this.position.angleTo(other);
        // return true;
        return (rads < 3.927 || rads > 5.4978)
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        let avoidance = this.avoidance(boids);
        let edgeAvoidance = this.edgeAvoidance();
        this.acceleration.add(separation);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(avoidance);
        this.acceleration.add(edgeAvoidance);
    }

    align(boids) {
        var avg = new THREE.Vector3(0, 0, 0);
        let total = 0;
        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            let distance = this.position.distanceTo(other.position);

            if (other != this && distance < this._awareness && this.viewingAngle(other.position)) {
                if (this._id >= other._id) {
                    avg.add(other.velocity);
                    total++;
                }
            }
        }

        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total);
            avg.setLength(this._moveSpeed);
            avg.sub(this.velocity);
            avg.clampLength(-this._alignment, this._alignment);
        }
        return avg;
    }

    cohesion(boids) {
        var avg = new THREE.Vector3(0, 0, 0);
        let total = 0;
        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            let distance = this.position.distanceTo(other.position);

            if (other != this && distance < this._awareness && this.viewingAngle(other.position)) {
                if (this._id >= other._id) {
                    avg.add(other.position);
                    total++;
                }
            }
        }

        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total);
            avg.sub(this.position);
            avg.setLength(this._moveSpeed);
            avg.sub(this.velocity);
            avg.clampLength(-this._cohesion, this._cohesion);
        }
        return avg;
    }

    separation(boids) {
        var avg = new THREE.Vector3(0, 0, 0);
        let total = 0;
        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            let distance = this.position.distanceTo(other.position);

            if (this._id >= other._id) {
                if (other != this && distance < this._separationAwareness && this.viewingAngle(other.position)) {
                    let diff = new THREE.Vector3().subVectors(this.position, other.position);
                    diff.divideScalar(distance);
                    avg.add(diff);
                    total++;
                }
            }
            else {
                if (other != this && distance < this._separationAwareness * 6 && this.viewingAngle(other.position)) {
                    let diff = new THREE.Vector3().subVectors(this.position, other.position);
                    diff.divideScalar(distance);
                    avg.add(diff);
                    total++;
                }
            }
        }

        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total);
            avg.setLength(this._moveSpeed);
            avg.sub(this.velocity);
            avg.clampLength(-this._separation, this._separation);
        }
        return avg;
    }

    avoidance(boids) {
        let total = 0;
        var avg = new THREE.Vector3();

        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            let distance = this.position.distanceTo(other.position);

            if (other != this && distance < this._separationAwareness * 10 && this.viewingAngle(other.position)) {
                if (this._id < other._id) {
                    avg.add(new THREE.Vector3().copy(this.velocity).reflect(new THREE.Vector3().subVectors(this.position, other.position).normalize()));
                    total++;
                }
            }
        }

        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total);
            avg.setLength(this._moveSpeed);
            avg.sub(this.velocity);
            avg.clampLength(-this._separation, this._separation);
        }
        return avg;
    }

    edgeAvoidance() {
        var avg = new THREE.Vector3(0, 0, 0);

        if (this.position.x - 20 <= -BoidSettings.worldSize * 0.5)
            avg.setX(1);
        if (this.position.x + 20 >= BoidSettings.worldSize * 0.5)
            avg.setX(-1);

        if (this.position.y - 20 <= -BoidSettings.worldSize * 0.5)
            avg.setY(1);
        if (this.position.y + 20 >= BoidSettings.worldSize * 0.5)
            avg.setY(-1);

        if (this.position.z - 20 <= -BoidSettings.worldSize * 0.5)
            avg.setZ(1);
        if (this.position.z + 20 >= BoidSettings.worldSize * 0.5)
            avg.setZ(-1);

        avg.setLength(this._moveSpeed);
        avg.clampLength(-this._alignment, this._alignment);
        return avg;
    }

    createBoid(scene) {
        const boidGeometry = new THREE.SphereGeometry();
        const boidMat = new THREE.MeshBasicMaterial();
        boidMat.wireframe = true;
        boidMat.color = this._color;
        this.boidMesh = new THREE.Mesh(boidGeometry, boidMat);
        this.boidMesh.position.set(this.position.x, this.position.y, this.position.z);
        scene.add(this.boidMesh);
    }
}

export { Boid, BoidSettings };
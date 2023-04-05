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

        /*         this._id = 0;
                this._cohesion = 0.02;
                this._separation = 0.15;
                this._alignment = 0.02;
                this._moveSpeed = 0.8;
                this._separationAwareness = 3;
                this._awareness = 50;
                this._color = new THREE.Color(1, 1, 1);
         */
        //spawn
        var xSpawn = (BoidSettings.worldSize * Math.random()) - BoidSettings.worldSize / 2;
        var ySpawn = (BoidSettings.worldSize * Math.random()) - BoidSettings.worldSize / 2;
        var zSpawn = (BoidSettings.worldSize * Math.random()) - BoidSettings.worldSize / 2;

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

    edgeAvoid() {
        if (this.position.x <= -(BoidSettings.worldSize * 0.5))
            this.position.setX(BoidSettings.worldSize * 0.5);
        else if (this.position.x >= BoidSettings.worldSize * 0.5)
            this.position.setX(-(BoidSettings.worldSize * 0.5));

        if (this.position.y <= -(BoidSettings.worldSize * 0.5))
            this.position.setY((BoidSettings.worldSize * 0.5));
        else if (this.position.y >= BoidSettings.worldSize * 0.5)
            this.position.setY(-(BoidSettings.worldSize * 0.5));

        if (this.position.z <= -(BoidSettings.worldSize * 0.5))
            this.position.setZ((BoidSettings.worldSize * 0.5));
        else if (this.position.z >= BoidSettings.worldSize * 0.5)
            this.position.setZ(-(BoidSettings.worldSize * 0.5));
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
        this.acceleration.add(separation);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
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
                    continue;
                }
                avg.set(other.velocity.x, other.velocity.y, other.velocity.z).multiplyScalar(2);
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

            if (other != this && distance < this._separationAwareness && this.viewingAngle(other.position)) {
                if (this._id >= other._id) {
                    let diff = new THREE.Vector3().subVectors(this.position, other.position);
                    diff.divideScalar(distance);
                    avg.add(diff);
                    total++;
                }
                else{
                    let diff = new THREE.Vector3().subVectors(this.position, other.position);
                    diff.divideScalar(distance);
                    avg.add(diff.multiplyScalar(3));
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

    createBoid(scene) {
        const boidGeometry = new THREE.SphereGeometry();
        const boidMat = new THREE.MeshBasicMaterial();
        boidMat.color = this._color;
        this.boidMesh = new THREE.Mesh(boidGeometry, boidMat);
        this.boidMesh.position.set(this.position.x, this.position.y, this.position.z);
        scene.add(this.boidMesh);
    }
}

export { Boid, BoidSettings };
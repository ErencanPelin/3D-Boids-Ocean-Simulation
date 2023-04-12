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

        //set values
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
        this.position.add(this.velocity); //update reference position
        this.velocity.add(this.acceleration);
        this.velocity.clampLength(-this._moveSpeed, this._moveSpeed); //clamp the length of the vector so it doesn't get faster than the movespeed
        this.boidMesh.position.set(this.position.x, this.position.y, this.position.z); //update the mesh/object position in the scene

        this.acceleration.set(0, 0, 0); //reset acceleration
    }

    viewingAngle(other) {
        let rads = this.position.angleTo(other);
        // return true if other boid position is within our viewing angle
        return (rads < 3.927 || rads > 5.4978);
    }

    flock(boids) {
        //by adding all the forces together, we can simulate all of them at the same time (just like physics in real life)
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

    //align each boid to the average direction of every its surrounding boids
    align(boids) {
        var avg = new THREE.Vector3(0, 0, 0); //store the average
        let total = 0; //number of boids we've sampled
        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            //the closer the other boids are, the more they should affect our direction
            let distance = this.position.distanceTo(other.position);

            if (other != this && distance < this._awareness && this.viewingAngle(other.position)) {
                if (this._id >= other._id) { //don't align with enemy boids
                    avg.add(other.velocity);
                    total++;
                }
            }
        }

        //if we actually sampled any / if there are boids around us
        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total); //divide by the number of samples to find the average
            avg.setLength(this._moveSpeed);
            avg.sub(this.velocity); //subtract our current velocity so we gradually turn to face the average
            avg.clampLength(-this._alignment, this._alignment); //clamp the length between our alignment constant
        }
        return avg;
    }

    //flock to the average position of surrounding boids
    cohesion(boids) {
        var avg = new THREE.Vector3(0, 0, 0);
        let total = 0;
        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            let distance = this.position.distanceTo(other.position);

            if (other != this && distance < this._awareness && this.viewingAngle(other.position)) {
                if (this._id >= other._id) { //don't flock to enemy boids
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
            avg.clampLength(-this._cohesion, this._cohesion); //clamp length to constant
        }
        return avg;
    }

    //move away from boids to avoid collisions
    separation(boids) {
        var avg = new THREE.Vector3(0, 0, 0);
        let total = 0;
        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            let distance = this.position.distanceTo(other.position); //move more if the other boid is closer

            if (this._id >= other._id) {
                if (other != this && distance < this._separationAwareness && this.viewingAngle(other.position)) {
                    let diff = new THREE.Vector3().subVectors(this.position, other.position);
                    diff.divideScalar(distance);
                    avg.add(diff);
                    total++;
                }
            }
            else { //move further away from enemy boids
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

    //custom rule, avoid going near enemy boids
    avoidance(boids) {
        let total = 0;
        var avg = new THREE.Vector3();

        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            let distance = this.position.distanceTo(other.position);

            if (other != this && distance < this._separationAwareness * 10 && this.viewingAngle(other.position)) {
                if (this._id < other._id) {
                    avg.add(new THREE.Vector3()
                        .copy(this.velocity) //create new reference (so we don't overwrite)
                        .reflect( //point in the opposite direction
                            new THREE.Vector3().subVectors(this.position, other.position).normalize(), //direction from this boid to other boid
                        ),
                    );
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

    //avoid going near edges by reflecting off them
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

export { Boid };
import * as THREE from 'three';

var BoidSettings = {
    cohesion: 0.5,
    separation: 0.5,
    alignment: 0.2,
    awareness: 10,
    moveSpeed: 4,
    worldSize: 200,
};

class Boid {
    constructor() {
        var xSpawn = (BoidSettings.worldSize * Math.random()) - BoidSettings.worldSize / 2;
        var ySpawn = (BoidSettings.worldSize * Math.random()) - BoidSettings.worldSize / 2;
        var zSpawn = (BoidSettings.worldSize * Math.random()) - BoidSettings.worldSize / 2;

        //start each boid at a random position
        this.position = new THREE.Vector3(xSpawn, ySpawn, zSpawn);
        this.velocity = new THREE.Vector3().randomDirection();//new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.velocity.setLength(Math.random() * (4 - 2) + 2);
        this.acceleration = new THREE.Vector3();
    }

    update () {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.boidMesh.position.set(this.position.x, this.position.y, this.position.z);
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

    flock(boids) {
        let alignment = this.align(boids);
        this.acceleration.set(alignment.x, alignment.y, alignment.z);
    }

    align(boids) {
        var avg = new THREE.Vector3(0,0,0);
        let total = 0;
        //loop through every nearby boid and set your own direction to the average of everyone elses
        for (let other of boids) {
            let distance = this.position.distanceTo(other.position);
            
            if (other != this && distance < BoidSettings.awareness) {
                avg.add(other.velocity);
                total++;
            }
        }
        
        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total);
            avg.setLength(BoidSettings.moveSpeed);
            avg.sub(this.velocity);
            avg.clampLength(-BoidSettings.alignment, BoidSettings.alignment);
        }
        return avg;
    }

    createBoid (scene) {
        const boidGeometry = new THREE.SphereGeometry();
        const boidMat = new THREE.MeshBasicMaterial();
        boidMat.color = new THREE.Color(1, 1, 1);
        this.boidMesh = new THREE.Mesh(boidGeometry, boidMat);
        this.boidMesh.position.set(this.position.x, this.position.y, this.position.z);
        scene.add(this.boidMesh);
    }
}

export { Boid, BoidSettings };
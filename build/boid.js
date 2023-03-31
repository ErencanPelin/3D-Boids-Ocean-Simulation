import * as THREE from 'three';

class Boid {
    constructor(size) {
        var xSpawn = (size * Math.random()) - size / 2;
        var ySpawn = (size * Math.random()) - size / 2;
        var zSpawn = (size * Math.random()) - size / 2;
        this.position = new THREE.Vector3(xSpawn, ySpawn, zSpawn);
    }

    createBoid = function (scene) {
        const boidGeometry = new THREE.SphereGeometry();
        const boidMat = new THREE.MeshBasicMaterial();
        boidMat.color = new THREE.Color(1, 1, 1);
        var boidMesh = new THREE.Mesh(boidGeometry, boidMat);
        boidMesh.position.set(this.position.x, this.position.y, this.position.z);
        scene.add(boidMesh);
    }
}

export { Boid };
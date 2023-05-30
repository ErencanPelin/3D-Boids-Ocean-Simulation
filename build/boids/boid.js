import * as THREE from '../three.module.js';
import { scene, MainProperties, octree, boids } from '../main.js';
import { BoidSettings } from './boidSettings.js';
import { PLYLoader } from '../loaders/PLYLoader.js';

class Boid {
    constructor(properties) {

        //set values
        this.properties = properties;

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
        this.velocity.clampLength(-this.properties.moveSpeed, this.properties.moveSpeed); //clamp the length of the vector so it doesn't get faster than the movespeed
        if(this.boidMesh != null)
        {
            this.boidMesh.position.set(this.position.x, this.position.y, this.position.z); //update the mesh/object position in the scene
            this.acceleration.set(0, 0, 0); //reset acceleration
            var dir = new THREE.Vector3().copy(this.position).add(this.velocity);
            this.boidMesh.lookAt(dir);
        }
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

            if (other != this && distance < this.properties.awareness && this.viewingAngle(other.position)) {
                if (this.properties.id >= other.properties.id) { //don't align with enemy boids
                    avg.add(other.velocity);
                    total++;
                }
            }
        }

        //if we actually sampled any / if there are boids around us
        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total); //divide by the number of samples to find the average
            avg.setLength(this.properties.moveSpeed);
            avg.sub(this.velocity); //subtract our current velocity so we gradually turn to face the average
            avg.clampLength(-this.properties.alignment, this.properties.alignment); //clamp the length between our alignment constant
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

            if (other != this && distance < this.properties.awareness && this.viewingAngle(other.position)) {
                if (this.properties.id >= other.properties.id) { //don't flock to enemy boids
                    avg.add(other.position);
                    total++;
                }
            }
        }

        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total);
            avg.sub(this.position);
            avg.setLength(this.properties.moveSpeed);
            avg.sub(this.velocity);
            avg.clampLength(-this.properties.cohesion, this.properties.cohesion); //clamp length to constant
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

            if (this.properties.id >= other.properties.id) {
                if (other != this && distance < this.properties.separationAwareness && this.viewingAngle(other.position)) {
                    let diff = new THREE.Vector3().subVectors(this.position, other.position);
                    diff.divideScalar(distance);
                    avg.add(diff);
                    total++;

                    //make babies
                    if (distance <= 1 && this.properties.id == 0 && MainProperties.numBoids < MainProperties.maxBlueFish) { //only blue fish can reproduce (avoid reds from taking over the world)
                        var newBoid = new Boid(this.properties);
                        octree.insert(newBoid);
                        boids.push(newBoid);
                    }
                }
            }
            else { //move further away from enemy boids
                if (other != this && distance < this.properties.separationAwareness * 16 && this.viewingAngle(other.position)) {
                    let diff = new THREE.Vector3().subVectors(this.position, other.position);
                    diff.divideScalar(distance);
                    avg.add(diff);
                    total++;
                    
                    //eat babies
                    if (distance <= 5) {
                        scene.remove(this.boidMesh);
                        MainProperties.numBoids--;
                        this.boidMesh = null;
                        this.position = new THREE.Vector3(-1000000, 1000000, 1000000);
                    }
                }
            }
        }

        if (total > 0) { //if there are actually boids near us
            avg.divideScalar(total);
            avg.setLength(this.properties.moveSpeed);
            avg.sub(this.velocity);
            avg.clampLength(-this.properties.separation, this.properties.separation);
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

            if (other != this && distance < this.properties.separationAwareness * 10 && this.viewingAngle(other.position)) {
                if (this.properties.id < other.properties.id) {
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
            avg.setLength(this.properties.moveSpeed);
            avg.sub(this.velocity);
            avg.clampLength(-this.properties.separation, this.properties.separation);
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

        avg.setLength(this.properties.moveSpeed);
        avg.clampLength(-this.properties.alignment, this.properties.alignment);
        return avg;
    }

    async createBoid(scene) {
        //old boid creation
        
        // const boidGeometry = new THREE.SphereGeometry();
        // const boidMat = new THREE.MeshBasicMaterial();
        // boidMat.wireframe = true;
        // boidMat.color = this._color;
        // this.boidMesh = new THREE.Mesh(boidGeometry, boidMat);
        // this.boidMesh.position.set(this.position.x, this.position.y, this.position.z);
        // scene.add(this.boidMesh);

        //creating boid via the fish ply model by Nathan

        //initialise a new Ply loader
        var loader = new PLYLoader();
        var pos = new THREE.Vector3(this.position.x, this.position.y, this.position.z);
        //  var mesh = this.boidMesh;

        const boidMat = new THREE.MeshLambertMaterial();
        //boidMat.wireframe = true;
        boidMat.color = this.properties.colour;
        //load and create the mesh of the fish

        var loader = new PLYLoader();
        var promise = loader.loadAsync('../../models/fishe.ply');

        var mesh;
        MainProperties.numBoids++;
        await promise.then(function ( geometry ) {
            //compute bounding box of fish geometry
            geometry.computeBoundingBox();

            //variables to resize and recenter mesh position
            var center = new THREE.Vector3();
            var size = new THREE.Vector3();
            geometry.boundingBox.getCenter(center);
            geometry.boundingBox.getSize(size);
            geometry.rotateX(Math.PI / 2);
            var min = geometry.boundingBox.min;

            //transform and scale matrices
            var sca = new THREE.Matrix4();
            var tra = new THREE.Matrix4();

            //apply transform and scale variables to matrices
            var ScaleFact=7/size.length();
            sca.makeScale(ScaleFact,ScaleFact,ScaleFact);
            tra.makeTranslation (-center.x,-center.y,-min.z);

            //make the mesh
            mesh = new THREE.Mesh( geometry, boidMat );
            
            //apply matrices to mesh
            mesh.applyMatrix4(tra);
            mesh.applyMatrix4(sca);

            //rotates the fish mesh to make it face towards the x axis
            mesh.rotation.x = Math.PI/2;

            //bring the mesh to its position
            mesh.position.set(pos.x, pos.y, pos.z);
            
            //adds the fish mesh to scene
            //this.boidMesh = mesh;
            scene.add( mesh );
            //console.log(mesh);
            //buildScene();
            //console.log('PLY file loaded!');
        }).catch();
        
        this.boidMesh = mesh;
        //this.boidMesh = mesh;
        //scene.add(this.boidMesh);
        //console.log(mesh);
    }
}

export { Boid };

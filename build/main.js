import * as THREE from 'three';
import { Octree } from './octree/octree.js';
import { Box } from './octree/box.js';
import { BoidSettings } from './boids/boidSettings.js';

const scene = new THREE.Scene();
//list of all active boids in the simulation
var boids = [];
//boids octree, used for spacial partitioning and boid-neighbour comparison optimisation
const octree = new Octree(
  new Box(
    -BoidSettings.worldSize * 0.5, -BoidSettings.worldSize * 0.5, -BoidSettings.worldSize * 0.5,
    BoidSettings.worldSize * 0.5, BoidSettings.worldSize * 0.5, BoidSettings.worldSize * 0.5),
  10);

var MainProperties = {
  numBoids: 0,
  maxBlueFish: 2000,
};

export { scene, MainProperties, boids, octree };
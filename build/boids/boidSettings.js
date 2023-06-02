import * as THREE from '../three.module.js';

//can be referenced in GUI
const BoidSettings = {
    worldSize: 300,
}

var BlueProperty = {
    id: 0,
    cohesion: 0.05,
    separation: 0.3,
    alignment: 0.05,
    moveSpeed: 0.8,
    separationAwareness: 4.2,
    awareness: 25,
    colour: new THREE.Color(0, 1, 1)
}

var RedProperty = {
    id: 1, // id (greater than 0 means it'll chase the blue boids)
    cohesion: 0.05,
    separation: 0.3,
    alignment: 0.05,
    moveSpeed: 0.8,
    separationAwareness: 4.2,
    awareness: 25,
    colour: new THREE.Color(1, 0, 0)
}

export { BoidSettings, BlueProperty, RedProperty }
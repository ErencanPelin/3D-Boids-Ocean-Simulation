import * as THREE from 'three';

const trailGeometry = new THREE.BufferGeometry();
// const trailGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const trailMaterial = new THREE.LineBasicMaterial({ 
    color: 0xdfdfdf, 
    linewidth: 1,
    linecap: 'square',
    linejoin: 'round', 
});
// const trailMaterial = new THREE.MeshBasicMaterial({ color: 0x1313ff });
const trailPoints = []; // Array to hold trail points

export { trailGeometry, trailMaterial, trailPoints };
  
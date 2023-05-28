import * as THREE from '../build/three.module.js'

const loader = new THREE.TextureLoader();
const noiseNormal = loader.load('./assets/noise/perlin-noise-normal.png');
noiseNormal.wrapS = THREE.RepeatWrapping;
noiseNormal.wrapT = THREE.RepeatWrapping;
const noiseZIn = loader.load('./assets/noise/perlin-noise-zoomin.png')
noiseZIn.wrapS = THREE.RepeatWrapping;
noiseZIn.wrapT = THREE.RepeatWrapping;
const noiseZOut = loader.load('./assets/noise/perlin-noise-zoomout.png')
noiseZOut.wrapS = THREE.RepeatWrapping;
noiseZOut.wrapT = THREE.RepeatWrapping;

// Control what the shader looks like with these values.

export const Uniforms = {
    noiseNormal: { value: noiseNormal },
    noiseZIn: { value: noiseZIn },
    noiseZOut: { value: noiseZOut },
    time: { value: 0.0 },

    scroll_speed: { value: 0.1 },
    wave_height: { value: 25.0 },
    intensity: { value: 2.25 }, // Intensity (lighting)
}

export function ForwardTime() {
    Uniforms.time.value += 0.005;
}

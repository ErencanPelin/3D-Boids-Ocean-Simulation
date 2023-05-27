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

export const Uniforms = {
    noiseNormal: { value: noiseNormal },
    noiseZIn: { value: noiseZIn },
    noiseZOut: { value: noiseZOut },
    noiseZOut_scale: { value: 1.0 },
    noiseZout_amount: { value: 0.05 },
    time: { value: 0.0 },
    scroll_speed: { value: 0.2 },
    wave_height: { value: 2.0 },
    intensity: { value: 2.0 },
    refraction: { value: -0.0 },
    refraction_scale: { value: 1.0 },
    refraction_detail: { value: 0.1 },
}

export function ForwardTime() {
    Uniforms.time.value += 0.01;
}

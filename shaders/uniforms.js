import * as THREE from '../build/three.module.js'

const loader = new THREE.TextureLoader();
const noiseNormal = loader.load('./assets/noise/perlin-noise-normal.png');
noiseNormal.wrapS = THREE.RepeatWrapping;
noiseNormal.wrapT = THREE.RepeatWrapping;
noiseNormal.repeat.set(24, 24);
const noiseZIn = loader.load('./assets/noise/perlin-noise-zoomin.png');
noiseZIn.wrapS = THREE.RepeatWrapping;
noiseZIn.wrapT = THREE.RepeatWrapping;
noiseZIn.repeat.set(24, 24);
const noiseZOut = loader.load('./assets/noise/perlin-noise-zoomout.png');
noiseZOut.wrapS = THREE.RepeatWrapping;
noiseZOut.wrapT = THREE.RepeatWrapping;
noiseZOut.repeat.set(24, 24);
const sandTexture = loader.load('./assets/sand/2-white-sand-texture.jpg');
sandTexture.wrapS = THREE.RepeatWrapping;
sandTexture.wrapT = THREE.RepeatWrapping;
sandTexture.repeat.set(24, 24);

// Control what the shader looks like with these values.

export const WaterUniforms = {
    noiseNormal: { value: noiseNormal },
    noiseZIn: { value: noiseZIn },
    noiseZOut: { value: noiseZOut },
    time: { value: 0.0 },

    scroll_speed: { value: 0.1 },
    wave_height: { value: 25.0 },
    intensity: { value: 2.25 }, // Intensity (lighting)
}

export const SandUniforms = {
    noiseNormal: { value: noiseNormal },
    noiseZIn: { value: noiseZIn },
    noiseZOut: { value: noiseZOut },
    sandTexture: { value: sandTexture },
    time: { value: 0.0 },

    scroll_speed: { value: 0.1 },
    sand_height: { value: 50.0 },
    intensity: { value: 1.25 }, // Intensity (lighting)
}

export function ForwardTime() {
    WaterUniforms.time.value += 0.005;
    SandUniforms.time.value += 0.005;
}

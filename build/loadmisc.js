import * as THREE from 'three';
import { GLTFLoader } from './loaders/GLTFLoader.js';

export function loadseaweed(scene, pos) {
    var mixer;
    seaweedload(scene, pos, mixer);
}

export function loadship(scene, pos) {
    shipload(scene, pos);
}

async function seaweedload(scene, pos, mixer)
{
    var coralloader = new GLTFLoader();
    var loadPromise = coralloader.loadAsync('../models/sea_weed/scene.gltf');
        await loadPromise.then(function (gltf) {
            
            gltf.scene.position.set(pos.x, pos.y-2, pos.z);
            gltf.scene.rotation.y += randDir();
            gltf.scene.scale.set(10,10,10);

            mixer = new THREE.AnimationMixer( gltf.scene );

            scene.add(gltf.scene);
            //console.log(gltf.animations);
            
            var Clock = new THREE.Clock();

            const clip = THREE.AnimationClip.findByName( gltf.animations, 'Sway' );
            const action = mixer.clipAction( clip );
            action.play();

            var update = function()
            {
                var deltaSeconds = Clock.getDelta();
                if(mixer != null)
                {
                    //console.log("playing...");
                    mixer.update( deltaSeconds );
                }
                requestAnimationFrame(update);
            }
            requestAnimationFrame(update);

        }).catch();
}

async function shipload(scene, pos)
{
    var coralloader = new GLTFLoader();
    var loadPromise = coralloader.loadAsync('../models/sunkenboat/sketch.gltf');
    await loadPromise.then(function (gltf) {
            
        gltf.scene.position.set(pos.x, pos.y, pos.z);
        gltf.scene.rotation.y += randDir();
        gltf.scene.scale.set(50,50,50);

        scene.add(gltf.scene);

    }).catch();
}

function randModifier ()
{
    var randNum = Math.floor(Math.random()*5) + 1;
    randNum *= Math.round(Math.random()) ? 1 : -1; 
    return randNum;
}

function randDir ()
{
    var randNum = Math.floor(Math.random()*180) + 1;
    randNum *= Math.round(Math.random()) ? 1 : -1; 
    return randNum;
}
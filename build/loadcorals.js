import * as THREE from 'three';
import { PLYLoader } from './loaders/PLYLoader.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';

export function loadcoral(scene, pos) {
    
    var coralMesh;
    var coralTexture1 = new THREE.TextureLoader().load('../models/cora_2l.jpg');

    var coralMaterial1 = new THREE.MeshPhongMaterial();
    coralMaterial1.map = coralTexture1;

    coralLoad1(scene, pos, coralMesh, coralMaterial1);
    
}

export function loadrarecoral(scene, pos) {
    
    var rareCoralType = randLoad();

    if(rareCoralType == 1)
        coralLoad2(scene, pos);
    else if(rareCoralType == 2)
        coralLoad3(scene, pos);
}

async function coralLoad1(scene, pos, coralMesh, coralMaterial)
{
    var coralloader = new PLYLoader();
    var loadPromise = coralloader.loadAsync('../models/coral.ply');
        await loadPromise.then(function (geometry) {
          //compute bounding box of coral geometry
          geometry.computeBoundingBox();
    
          //variables to resize and recenter mesh position
          var center = new THREE.Vector3();
          var size = new THREE.Vector3();
          geometry.boundingBox.getCenter(center);
          geometry.boundingBox.getSize(size);
          //geometry.rotateX(Math.PI / 2);
          var min = geometry.boundingBox.min;
    
          //transform and scale matrices
          var sca = new THREE.Matrix4();
          var tra = new THREE.Matrix4();
    
          //apply transform and scale variables to matrices
          var ScaleFact = (25 + randModifier()) / size.length();
          sca.makeScale(ScaleFact, ScaleFact, ScaleFact);
          tra.makeTranslation(-center.x, -center.y, -min.z);
    
          //make the mesh
          coralMesh = new THREE.Mesh(geometry, coralMaterial);
    
          //apply matrices to mesh
          coralMesh.applyMatrix4(tra);
          coralMesh.applyMatrix4(sca);
    
          //bring the mesh to its position
          coralMesh.position.set(pos.x, pos.y, pos.z);
          coralMesh.rotation.x = -Math.PI/2;
          coralMesh.rotation.z += randDir();
    
          //adds the coral mesh to scene
          scene.add(coralMesh);
          //console.log("coral loaded :D");
        }).catch();
}

async function coralLoad2(scene, pos)
{
    var coralloader = new GLTFLoader();
    var loadPromise = coralloader.loadAsync('../models/low_poly_red_coral/scene.gltf');
        await loadPromise.then(function (gltf) {
            
            gltf.scene.position.set(pos.x, (pos.y -6), pos.z);
            gltf.scene.rotation.y += randDir();
            gltf.scene.scale.set(3,3,3);

            scene.add(gltf.scene);
            //console.log("coral loaded :D");

        }).catch();
}

async function coralLoad3(scene, pos)
{
    var coralloader = new GLTFLoader();
    var loadPromise = coralloader.loadAsync('../models/blue_lowpoly_coral/scene.gltf');
        await loadPromise.then(function (gltf) {
            
            gltf.scene.position.set(pos.x, pos.y, pos.z);
            gltf.scene.rotation.y += randDir();
            gltf.scene.scale.set(5,5,5);

            scene.add(gltf.scene);

        }).catch();
}

function randLoad ()
{
    var randNum = Math.floor(Math.random()*2) + 1;
    return randNum;
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
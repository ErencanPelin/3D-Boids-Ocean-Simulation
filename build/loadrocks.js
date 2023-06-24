import * as THREE from 'three';
import { PLYLoader } from './loaders/PLYLoader.js';

export function loadRock(scene, pos) {
    
    var rockMesh;
    var rockTexture = new THREE.TextureLoader().load('../models/rocktexture.png');
    var pebbleTexture = new THREE.TextureLoader().load('../models/Pebbletexture.png');
    
    var rockMaterial = new THREE.MeshPhongMaterial();
    rockMaterial.map = rockTexture;

    var pebbleMaterial = new THREE.MeshPhongMaterial();
    pebbleMaterial.map = pebbleTexture;

    var rocktype = randLoad();
    if(rocktype == 1) 
    {
        rock1(scene, pos, rockMesh, rockMaterial);
    }
    else if(rocktype == 2) 
    {
        rock2(scene, pos, rockMesh, rockMaterial);
    }
    else if(rocktype == 3) 
    {
        rock3(scene, pos, rockMesh, pebbleMaterial);
    }
    //console.log(randLoad());
}

async function rock1(scene, pos, rockMesh, rockMaterial)
{
    var rockloader1 = new PLYLoader();
    var loadPromise = rockloader1.loadAsync('../models/rock.ply');
        await loadPromise.then(function (geometry) {
          //compute bounding box of rock geometry
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
          rockMesh = new THREE.Mesh(geometry, rockMaterial);
    
          //apply matrices to mesh
          rockMesh.applyMatrix4(tra);
          rockMesh.applyMatrix4(sca);
    
          //bring the mesh to its position
          rockMesh.position.set(pos.x, pos.y, pos.z);
          rockMesh.rotation.x = -Math.PI/2;
          rockMesh.rotation.z += randDir();
    
          //adds the rock mesh to scene
          scene.add(rockMesh);
        }).catch();
}
async function rock2(scene, pos, rockMesh, rockMaterial)
{
    var rockloader2 = new PLYLoader();
    var loadPromise = rockloader2.loadAsync('../models/rock2.ply');
        await loadPromise.then(function (geometry) {
          //compute bounding box of rock geometry
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
          rockMesh = new THREE.Mesh(geometry, rockMaterial);
    
          //apply matrices to mesh
          rockMesh.applyMatrix4(tra);
          rockMesh.applyMatrix4(sca);
    
          //bring the mesh to its position
          rockMesh.position.set(pos.x, pos.y, pos.z);
          rockMesh.rotation.x = -Math.PI/2;
          rockMesh.rotation.z += randDir();
    
          //adds the rock mesh to scene
          scene.add(rockMesh);
        }).catch();
}

async function rock3(scene, pos, rockMesh, pebbleMaterial)
{
    var rockloader3 = new PLYLoader();
    var loadPromise = rockloader3.loadAsync('../models/pebble.ply');
        await loadPromise.then(function (geometry) {
          //compute bounding box of rock geometry
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
          var ScaleFact = (15 + randModifier()) / size.length();
          sca.makeScale(ScaleFact, ScaleFact, ScaleFact);
          tra.makeTranslation(-center.x, -center.y, -min.z);
    
          //make the mesh
          rockMesh = new THREE.Mesh(geometry, pebbleMaterial);
    
          //apply matrices to mesh
          rockMesh.applyMatrix4(tra);
          rockMesh.applyMatrix4(sca);
    
          //bring the mesh to its position
          rockMesh.position.set(pos.x, pos.y, pos.z);
          rockMesh.rotation.x = -Math.PI/2;
          rockMesh.rotation.z += randDir();
    
          //adds the rock mesh to scene
          scene.add(rockMesh);
        }).catch();
}

function randLoad ()
{
    var randNum = Math.floor(Math.random()*3) + 1;
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
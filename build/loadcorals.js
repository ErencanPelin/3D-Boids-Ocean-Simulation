import * as THREE from 'three';
import { PLYLoader } from './loaders/PLYLoader.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';

export function loadcoral(scene, pos) {
    
    var coralMesh;
    var coralTexture1 = new THREE.TextureLoader().load('../models/cora_2l.jpg');
    var coralTexture2 = new THREE.TextureLoader().load('../models/coral_2_baseColor.jpg');
    var coralTexture3 = new THREE.TextureLoader().load('../models/beigecoral_Material_baseColor.jpg');
    var coralTexture4 = new THREE.TextureLoader().load('../models/coral_3_baseColor.jpg');

    var coralNormal1 = new THREE.TextureLoader().load('../models/coral_2_normal.jpg');
    var coralNormal2 = new THREE.TextureLoader().load('../models/beigecoral_Material_normal.jpg');
    var coralNormal3 = new THREE.TextureLoader().load('../models/coral_3_normal.jpg');

    var coralMaterial1 = new THREE.MeshPhongMaterial();
    coralMaterial1.map = coralTexture1;

    var coralMaterial2 = new THREE.MeshPhongMaterial();
    coralMaterial2.map = coralTexture2;
    coralMaterial2.normalMap = coralNormal1;

    var coralMaterial3 = new THREE.MeshPhongMaterial();
    coralMaterial3.map = coralTexture3;
    coralMaterial3.normalMap = coralNormal2;
    coralMaterial3.side = THREE.DoubleSide;

    var coralMaterial4 = new THREE.MeshPhongMaterial();
    coralMaterial4.map = coralTexture4;
    coralMaterial4.normalMap = coralNormal3;
    coralMaterial4.side = THREE.DoubleSide;

    var coralType = randLoad();
    if(coralType == 1)
        coralLoad1(scene, pos, coralMesh, coralMaterial1);
    else if (coralType == 2)
        coralLoad2(scene, pos, coralMesh, coralMaterial2);
    else if (coralType == 3)
        coralLoad3(scene, pos, coralMesh, coralMaterial3);
    else if (coralType == 4)
        coralLoad4(scene, pos, coralMesh, coralMaterial4);
}

export function loadrarecoral(scene, pos) {
    rarecoralLoad(scene, pos);
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

async function coralLoad2(scene, pos, coralMesh, coralMaterial)
{
    var coralloader = new PLYLoader();
    var loadPromise = coralloader.loadAsync('../models/redcoral.ply');
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
          coralMesh.position.set(pos.x, pos.y-5.5, pos.z);
          coralMesh.rotation.x = -Math.PI/2;
          coralMesh.rotation.z += randDir();
    
          //adds the coral mesh to scene
          scene.add(coralMesh);
        }).catch();
}

async function coralLoad3(scene, pos, coralMesh, coralMaterial)
{
    var coralloader = new PLYLoader();
    var loadPromise = coralloader.loadAsync('../models/beigecoral.ply');
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
        }).catch();
}

async function coralLoad4(scene, pos, coralMesh, coralMaterial)
{
    var coralloader = new PLYLoader();
    var loadPromise = coralloader.loadAsync('../models/orangecoral.ply');
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
        }).catch();
}

async function rarecoralLoad(scene, pos)
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
    var randNum = Math.floor(Math.random()*4) + 1;
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
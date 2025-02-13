import Component from './Component.js';
import * as THREE from 'three';

export default class followCamera extends Component{
    constructor(parentEntity, name, id ){
        super(parentEntity, name, id);
        this.camera = null;
        this.target = parentEntity;
        this.prevRotation = 0;
    }
    
    /* starts the camera
    * @param scene - the scene to add the camera to
    */
    start(scene){
        // make a new camera
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
        // set the camera position to just behind the entity position
        this.camera.position.set(this.target.position.x, this.target.position.y + 17, this.target.position.z + 5);
        // set the camera to look at the entity
        this.camera.lookAt(this.target.position.x, this.target.position.y, this.target.position.z);
        this.camera.rotateX(Math.PI/4);
        // add the camera to the scene
        scene.add(this.camera);
    }

    /* updates the camera position and rotation
    */
    update(){
        // calculate the offset from the entity position
        var offset = new THREE.Vector3(0,7,5);
        // rotate the offset by the entities rotation
        offset.applyAxisAngle(new THREE.Vector3(0,1,0), this.target.rotation.y);
        // add the offset to the entities position
        var cameraPosition = new THREE.Vector3(this.target.position.x + offset.x, this.target.position.y + offset.y, this.target.position.z + offset.z);
        // set the camera position to the new position
        this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        // set the camera to look at the entity
        this.camera.lookAt(this.target.position.x, this.target.position.y, this.target.position.z);
        this.camera.rotateX(Math.PI/4);

        // if the entity has rotated, rotate the camera to match
        if(this.prevRotation != this.target.rotation.y){
            this.camera.rotateY(this.target.rotation.y - this.prevRotation);

            this.prevRotation = this.
            target.rotation.y;
        }
    }

    /* sets the target of the camera
    * @param target - the entity to follow
    */
    setTarget(target){
        this.target = target;
    }

    /* returns the camera
    */
    getCamera(){
        return this.camera;
    }

    /* destroys the camera
    * @param scene - the scene to remove the camera from
    */
    destroy(scene){
        this.target = null;
        scene.remove(this.camera);
    }

    

}
import React, { Component } from "react";
import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import robot from "./badass.glb";
import extexture from "./texture.jpg";

class Badass extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setClearColor("#bbbbbb");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //add Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 8;
    this.camera.position.y = 5;

    //Camera Controls
    var controls = new OrbitControls(this.camera, this.renderer.domElement);

   
    var dirLight = new THREE.DirectionalLight(0xffffff, 1.00);
    // Add directional Light to scene
    this.scene.add(dirLight);

    var dirLight = new THREE.AmbientLight(0xffffff, 1.00);
    // Add directional Light to scene
    this.scene.add(dirLight);

    var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.1;
    grid.material.transparent = true;
    this.scene.add(grid);

    //External Texture

    //External 3D Model Code
    var theModel;
    const loader = new GLTFLoader();
    loader.load(
      robot,
      (gltf) => {
        // called when the resource is loaded
        theModel = gltf.scene;
        // theModel.scale.set(0.5, 0.5, 0.5);
        this.scene.add(theModel);
      },
      (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );

    this.renderScene();
    //start animation
    this.start();
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    //Animate Models Here
    //ReDraw Scene with Camera and Scene Object

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div>
        {/*} These toggle the the different parts of the chair that can be edited, note data-option is the key that links to the name of the part in the 3D file */}

        <div
          style={{ width: "800px", height: "800px" }}
          ref={(mount) => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default Badass;

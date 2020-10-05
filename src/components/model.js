import React, { Component } from "react";
import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import robot from "./robot.glb";

class Model extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setClearColor("#f1f1f1");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //add Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 8;
    this.camera.position.y = 5;

    //Camera Controls
    var controls = new OrbitControls(this.camera, this.renderer.domElement);

    //LIGHTS
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    // Add hemisphere light to scene
    this.scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    // Add directional Light to scene
    this.scene.add(dirLight);

    // Floor
    var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
      shininess: 0,
    });

    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI;
    floor.receiveShadow = true;
    floor.position.y = -1;
    this.scene.add(floor);

    var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.1;
    grid.material.transparent = true;
    this.scene.add(grid);

    //External 3D Model Code + Customization Part
    var activeOption = "Body";
    // Initial material
    const INITIAL_MTL = new THREE.MeshPhongMaterial({
      color: 0xf1f1f1,
      shininess: 10,
    });

    const INITIAL_MAP = [
      { childID: "Body", mtl: INITIAL_MTL },
      { childID: "Leg_Left", mtl: INITIAL_MTL },
      { childID: "Leg_Right", mtl: INITIAL_MTL },
      { childID: "Neck", mtl: INITIAL_MTL },
      { childID: "Shoulders", mtl: INITIAL_MTL },
    ];

    const colors = [
      {
        color: "66533C",
      },
      {
        color: "173A2F",
      },
      {
        color: "153944",
      },
      {
        color: "27548D",
      },
      {
        color: "438AAC",
      },
    ];

    const TRAY = document.getElementById("js-tray-slide");

    // Function - Build Colors
    function buildColors(colors) {
      for (let [i, color] of colors.entries()) {
        let swatch = document.createElement("div");
        swatch.classList.add("tray__swatch");

        swatch.style.background = "#" + color.color;

        swatch.setAttribute("data-key", i);
        TRAY.append(swatch);
      }
    }

    buildColors(colors);

    // Select Option
    const options = document.querySelectorAll(".option");

    for (const option of options) {
      option.addEventListener("click", selectOption);
    }

    function selectOption(e) {
      let option = e.target;
      activeOption = e.target.dataset.option;
      for (const otherOption of options) {
        otherOption.classList.remove("--is-active");
      }
      option.classList.add("--is-active");
    }

    // Swatches
    const swatches = document.querySelectorAll(".tray__swatch");

    for (const swatch of swatches) {
      swatch.addEventListener("click", selectSwatch);
    }

    function selectSwatch(e) {
      let color = colors[parseInt(e.target.dataset.key)];
      let new_mtl;

      new_mtl = new THREE.MeshPhongMaterial({
        color: parseInt("0x" + color.color),
        shininess: color.shininess ? color.shininess : 10,
      });

      setMaterial(theModel, activeOption, new_mtl);
    }

    function setMaterial(parent, type, mtl) {
      parent.traverse((o) => {
        if (o.isMesh && o.nameID != null) {
          if (o.nameID === type) {
            o.material = mtl;
          }
        }
      });
    }

    var theModel;
    const loader = new GLTFLoader();
    loader.load(
      robot,
      (gltf) => {
        // called when the resource is loaded
        theModel = gltf.scene;
        // theModel.scale.set(0.5, 0.5, 0.5);
        for (let object of INITIAL_MAP) {
          initColor(theModel, object.childID, object.mtl);
        }

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

    // Function - Add the textures to the models
    function initColor(parent, type, mtl) {
      parent.traverse((o) => {
        if (o.isMesh) {
          if (o.name.includes(type)) {
            o.material = mtl;
            o.nameID = type; // Set a new property to identify this object
          }
        }
      });
    }

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
        <div class="options">
          <div class="option --is-active" data-option="Body">
            <h1>Body</h1>
          </div>
          <div class="option" data-option="Leg_Left">
            <h1>Leg_Left</h1>
          </div>
          <div class="option" data-option="Leg_Right">
            <h1>Leg_Right</h1>
          </div>
          <div class="option" data-option="Neck">
            <h1>Neck</h1>
          </div>
          <div class="option" data-option="Shoulders">
            <h1>Shoulders</h1>
          </div>
        </div>
        <div
          style={{ width: "800px", height: "800px" }}
          ref={(mount) => {
            this.mount = mount;
          }}
        />
        <div class="controls">
          <div id="js-tray" class="tray">
            <div id="js-tray-slide" class="tray__slide"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Model;

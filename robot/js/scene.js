//scene setup
const scene = new THREE.Scene();

//camera
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

camera.position.z = 10;

//Web GL renderer

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//lighting
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 100, 100);
scene.add(spotLight);

var spotLight1 = new THREE.SpotLight(0xffffff);
spotLight1.position.set(0, 100, 0);
scene.add(spotLight);

var spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(0, 100, -10);
scene.add(spotLight);

//cube
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshPhongMaterial({
//   color: 0x00ff00,
// });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

//orbitcontrols
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

//loader
var loader = new THREE.GLTFLoader();
loader.load("models/simple/scene.gltf", function (gltf) {
  scene.add(gltf.scene);
});

//render function
var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

//markers

let markers = [];
let markerdata = [
  {
    position: [0, 0, 0.2],
    headline: "One",
    description: "",
  },
  {
    position: [-0.2, 0, 0.2],
    headline: "Two",
    description: "",
  },
];

Object.keys(markerdata).forEach(function (key) {
  const marker = markerdata[key];
  console.log(marker);

  var markerContainer = new THREE.Object3D();

  var geometry = new THREE.TorusGeometry(0.06, 0.01, 2, 100);
  var material = new THREE.MeshBasicMaterial({ color: 0xccccccc });

  var torus = new THREE.Mesh(geometry, material);
  markerContainer.add(torus);

  var geometry1 = new THREE.CircleGeometry(0.05, 32);
  var material1 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
  });
  var circle = new THREE.Mesh(geometry1, material1);
  markerContainer.add(circle);

  markerContainer.position.set(marker.position[0], marker.position[1]);

  scene.add(markerContainer);
});

//helper gui

function addHelper() {
  var geometry3 = new THREE.SphereGeometry(0, 0.05, 32, 32);
  var material3 = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  var markerHelper = new THREE.Mesh(geometry3, material3);
  scene.add(markerHelper);

  markerHelper.position.set(0, 0, 0.01);
}

addHelper();

animate();

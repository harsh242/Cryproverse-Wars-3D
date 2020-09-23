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

animate();

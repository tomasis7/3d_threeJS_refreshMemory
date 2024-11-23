import { text } from "express";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { textGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

// Scene setup
const scene = new THREE.Scene();
// Set black background
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// The debounce function ensures that the resize event handler is not called too frequently.
// This is important because resizing the window can trigger many events in quick succession,
// The debounceResizeHandler function ensures that the resize event handler is not called too frequently.
// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// const debounceResizeHandler = debounce(() => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }, 200);

// window.addEventListener("resize", debounceResizeHandler);
const loader = new FontLoader();
const font = "fonts/helvetiker_regular.typeface.json";
loader.load(font, (font) => {
  const textGeometry = new textGeometry("Hello, Three.js!", {
    font: font,
    size: 100,
    height: 0.5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5,
  });

  const MATERIAL_COLOR = 0x00ff00;
  const textMaterial = new THREE.MeshStandardMaterial({
    color: MATERIAL_COLOR,
  });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  textMesh.position.set(-3, 0, 0);
  scene.add(textMesh);

  // Start animation only after text is loaded

  // The animate function continuously renders the scene from the perspective of the camera.
  // It uses requestAnimationFrame to call itself recursively, creating a smooth animation loop.

  camera.position.z = 5;

  const animate = function () {
    textMesh.rotation.x += 0.01;
    textMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  renderer.setAnimationLoop(animate);
});

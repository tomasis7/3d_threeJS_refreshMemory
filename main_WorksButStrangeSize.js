/**
 * Initializes a Three.js scene with a rotating cube and rotating 3D text.
 *
 * - Sets up the scene, camera, and renderer.
 * - Loads a font and creates 3D text geometry.
 * - Adds the text mesh and a cube mesh to the scene.
 * - Animates the cube and text by rotating them.
 *
 * @requires three
 * @requires three/examples/jsm/loaders/FontLoader.js
 * @requires three/examples/jsm/geometries/TextGeometry.js
 */
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { MeshPhongMaterial } from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Camera position
camera.position.z = 10; // Increased distance

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 2;

scene.add(cube);

const loader = new FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const textGeometry = new TextGeometry("Hej from ThreeJS", {
      font: font,
      size: 0.5, // Reduced size
      height: 0.1, // Reduced depth
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    // Center the text
    textGeometry.center();

    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.x = -2;
    scene.add(textMesh);

    function animate() {
      requestAnimationFrame(animate);

      textMesh.rotation.x += 0.01;
      textMesh.rotation.y += 0.01;

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
    animate();
  }
);

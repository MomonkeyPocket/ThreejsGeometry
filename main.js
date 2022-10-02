import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//マテリアル
const material = new THREE.MeshNormalMaterial();
// material.wireframe = true; //枠が見えるようになる

//ジオメトリ
const boxGeometry = new THREE.BoxGeometry(1, 1, 1); //立方体
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 32); //球体
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100, Math.PI * 2); //円環
const planeGeometry = new THREE.PlaneGeometry(5, 5); //平面
const pyramidGeometry = new THREE.BufferGeometry();
const pyramidVertices = new Float32Array([
    -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0, -0.5, // First triangle in the base.
    -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0, 0.5,  // Second triangle in the base.
    -0.5, 0, 0.5, 0.5, 0, 0.5, 0, 0.5, 0,  // Front face.
    0.5, 0, 0.5, 0.5, 0, -0.5, 0, 0.5, 0,  // Right face.
    0.5, 0, -0.5, -0.5, 0, -0.5, 0, 0.5, 0,  // Back face.
    -0.5, 0, -0.5, -0.5, 0, 0.5, 0, 0.5, 0   // Left face.
]);
pyramidGeometry.setAttribute('position', new THREE.BufferAttribute(pyramidVertices, 3));

//メッシュ
const cube = new THREE.Mesh(boxGeometry, material); //立方体
const sphere = new THREE.Mesh(sphereGeometry, material); //球体
const torus = new THREE.Mesh(torusGeometry, material); //円環
const plane = new THREE.Mesh(planeGeometry, material); //平面
const pyramid = new THREE.Mesh(pyramidGeometry, material);

//ポジション
sphere.position.x = 1.5; //球体
torus.position.x = -1.5; //円環
plane.position.y = -0.5;//平面
plane.rotation.x = -Math.PI * 0.5;
pyramid.position.z = -1.5

//シーン
scene.add(cube, sphere, torus, plane, pyramid);

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);

    //オブジェクトの回転
    // sphere.rotation.x = elapsedTime;
    // plane.rotation.x = elapsedTime;
    // octahedron.rotation.x = elapsedTime;
    // torus.rotation.x = elapsedTime;

    // sphere.rotation.y = elapsedTime;
    // plane.rotation.y = elapsedTime;
    // octahedron.rotation.y = elapsedTime;

    // torus.rotation.y = elapsedTime;

    controls.update();

    //レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

animate();
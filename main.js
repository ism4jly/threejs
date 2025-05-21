import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(5, 5, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Melhor qualidade
document.body.appendChild(renderer.domElement);

// Base: plano de fundo (chão)
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Objeto 1: Caixa
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x4682B4 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-3, 1.2, 3); // translação
box.rotation.y = Math.PI / 4; // rotação
box.scale.set(1, 2, 1);       // escala em Y
scene.add(box);

// Objeto 2: Esfera
const sphereRadius = 0.75;
const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1.25, 3);
scene.add(sphere);

// Objeto 3: Cone
const coneGeometry = new THREE.ConeGeometry(0.7, 2, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(3, 1.5, 3);
cone.rotation.z = Math.PI / 8;
cone.scale.set(1, 0.5, 1);
scene.add(cone);

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Responsividade
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Parâmetros do movimento da esfera
const bounceHeight = 0.5;
const sphereBaseY = sphereRadius + bounceHeight; // 0.75 + 0.5 = 1.25

// Relógio para animação suave
const clock = new THREE.Clock();

// Animação
function animate() {
    requestAnimationFrame(animate);

    // Animações
    box.rotation.y += 0.01;
    cone.rotation.z += 0.02;
    sphere.position.y = sphereBaseY + Math.sin(clock.getElapsedTime() * 2) * bounceHeight;

    controls.update();
    renderer.render(scene, camera);
}

animate();

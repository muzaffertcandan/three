import './style.css'
import * as THREE from "three";
import gsap from 'gsap'
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//animations
//ekranın çalıştığı fps e göre tick rate i artıyor örnek bu pc de 60 masaustu 75hz o yuzden 75

//time
// let time = Date.now();



//clock
const clock = new THREE.Clock();

gsap.to(mesh.position, {duration: 1,delay:1, x:2})
gsap.to(mesh.position, {duration: 1,delay:2, x:0})

const tick = () => {
  // 2 zaman arasını almak
  //     const currentTime = Date.now()
  //     const deltaTime = currentTime - time
  //     time = currentTime
  //clock
//   const elapsedTime = clock.getElapsedTime();

  //     //update objects
  //   //  mesh.position.x -= 0.01
  //     mesh.rotation.y += 0.002 * deltaTime
  // * saniyede 1 tur attırır
  // mesh.rotation.y = elapsedTime * Math.PI *2
//   mesh.position.y = Math.sin(elapsedTime);
//   mesh.position.x = Math.cos(elapsedTime);
  // GET DELTA KULLANMA



  //renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

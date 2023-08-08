import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



// console.log(imageSource);
THREE.ColorManagement.enabled = false

/*
TEXTURES
*/
// const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = ()=>{
// texture.needsUpdate = true
// }

// image.src ='/textures/door/color.jpg'

const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(
    '/textures/minecraft.png',
    // ()=>{
    //     console.log("load");
    // },
    // ()=>{
    //     console.log("progress");
        
    // },
    // ()=>{
    //     console.log("error");
        
    // }
    )
//png kullanırken tinypng ile dosyayı küçültebiliriz 
// colorTexture.rotation =Math.PI * 0.5
// yakınlaşınca blurlaşıyor ve görsel textura oturmuyor ise nearest filter
// colorTexture.minFilter= THREE.NearestFilter
//her tarafı keskin minecraft bloğu gibi istiyorsak alttaki gibi
//nearest filterlar daha iyi performans verir
colorTexture.magFilter= THREE.NearestFilter
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
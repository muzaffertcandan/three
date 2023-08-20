import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')
const rick1ColorTexture = textureLoader.load('/textures/rick/rickand.png')

/*
PARTİCLES
*/
const particlesGeometry =  new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count *3)
const colors = new Float32Array(count *3)


for(let i= 0; i< count*3;i++){
    positions[i] = (Math.random() -0.5) *10
    colors[i] = Math.random()
}

// particlesGeometry.setAttribute(
//     'position',
//     new THREE.BufferAttribute(positions,3)
// )
particlesGeometry.setAttribute(
    'position',
    new THREE. BufferAttribute(positions,3)
)
particlesGeometry.setAttribute(
    'color',
    new THREE. BufferAttribute(colors,3)
)


//MATERİAL

const particlesMaterials = new THREE.PointsMaterial()
particlesMaterials.size = 0.1
//Parcacıklar uzaklaştığında küçülmesini sağlar performansı etkiler
particlesMaterials.sizeAttenuation = true
// particlesMaterials.color = new THREE.Color('#ff88cc')
particlesMaterials.transparent = true
particlesMaterials.alphaMap = particleTexture

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({
        map: rick1ColorTexture
    })    
)
// scene.add(cube)

//fixing alphas
// 1 - alpha test
// particlesMaterials.alphaTest = 0.001 

//2- depth test
// farklı cisimler konulduğunda gerçekliğini kaybeder hatalar oluşur
// particlesMaterials.depthTest = false

// 3-depth buffer
particlesMaterials.depthWrite = false
//blending (performansı etkiler) üst üste olan objelerin renklerini karıştırır ve ortaya tek renk çıkarır
particlesMaterials.blending = THREE.AdditiveBlending
//renk çoğaltmak için ekledik
particlesMaterials.vertexColors = true



//points
const particles = new THREE.Points(particlesGeometry,particlesMaterials)
scene.add(particles)



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
camera.position.z = 3
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

    //Update particles
    // particles.rotation.y = elapsedTime * 0.2
    // cube.rotation.y = -elapsedTime * 2
    for(let i = 0; i < count; i++){
        const i3 = i * 3
        const x =  particlesGeometry.attributes.position.array[i3]
        const y =  particlesGeometry.attributes.position.array[i3+1]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }

    particlesGeometry.attributes.position.needsUpdate = true
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
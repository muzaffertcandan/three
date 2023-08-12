import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'; 

THREE.ColorManagement.enabled = false
// console.log(GUI);

/*
Debug
*/
const gui = new GUI()



/*
Textures
*/
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader( )

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.mipmaps = false

const environmentTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/*
OBJECTS
*/
// const material = new THREE.MeshBasicMaterial()
// // material.map = doorColorTexture
// // material.color = new THREE.Color('red')
// // material.opacity= 0.5
// material.transparent = true
// // material.alphaMap = doorAlphaTexture

// const material = new  THREE.MeshNormalMaterial()

//matcapler etrafta çevre ve ışık olmadan farklı renkte ışık denememizi sağlar
// const material = new THREE.MeshMatcapMaterial()
//  material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()
//çok performanslıdır lambert material ancak material üstünde çizgiler oluşturur
// const material = new THREE.MeshLambertMaterial()
// ışığın reflectionı oluyor
// const material = new THREE.MeshPhongMaterial()
//parlatıyor, değer arttıkça daha kçük noktada daha net olur
// material.shininess = 100
//malzeme üstündeki parıltının rengini değiştiriyor
// material.specular = new THREE.Color(0xff0000)

// const material= new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

//daha gerçekçi ve rougness metalness taşıyor
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.45
material.metalness = 0.65
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
material.envMap = environmentTexture
//HDRI HEAVEN
gui
.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
gui.add(material, 'aoMapIntensity').min(0).max(100).step(0.001)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16,16),
    material
)
sphere.position.x = -1.5
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    material
)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,16,32),
    material
)
torus.position.x = 1.5
scene.add(sphere, plane,torus)


/**
 * LİGHTS
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) 
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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
camera.position.z = 2
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
 
    //update objects 
     sphere.rotation.y = 0.1 * elapsedTime
     plane.rotation.y = 0.1 * elapsedTime
     torus.rotation.y = 0.1 * elapsedTime
     sphere.rotation.x = 0.15 * elapsedTime
     plane.rotation.x = 0.15 * elapsedTime
     torus.rotation.x = 0.15 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
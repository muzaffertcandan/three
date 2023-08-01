import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)
group.position.y = 0.8
group.scale.y = 2
group.rotation.y = 0.1
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'cyan'})

)
group.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'grey'})
)
group.add(cube2)
cube2.position.x = -1.3


// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // in a example 1 is 1 meter for a house 
// // do this calculations before the get render
// // mesh.position.x = 0.4
// // mesh.position.y = -0.2
// // mesh.position.z = 1

// //mesh in pozisyonunu düzenleme
// mesh.position.set(0.7,-0.3,1)
// // mesh.scale.x = 1
// // mesh.scale.y = 1
// mesh.scale.set(2,0.5,0.6)


// //ROTATİON it uses euler
// // half rotation is near to 3.14 so we can use math.PI
// // we can change which order to execute
// mesh.rotation.reorder('YXZ') 

// //we can use querternion for make it easier to rotation

// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.1
// // mesh.rotation.y = 0.2

//making axes lines (axes helper)
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// scene.add(mesh)


// //this code gives us length to 0 point
// console.log(mesh.position.length());

// //this puts the mesh poziton to 1
// // mesh.position.normalize()


/**
 * Sizes
*/
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// camera.lookAt(new THREE.Vector3(3,0,0))
// camera.lookAt(mesh.position)

//this code gives us length camera to our mesh
// console.log("camera",mesh.position.distanceTo(camera.position));

/**
 * Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
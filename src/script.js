import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
// Debug
const gui = new dat.GUI()

const textureloader = new THREE.TextureLoader()
const normaltexture = textureloader.load('/textures/NormalMap.png')
    // Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x292929)
material.normalMap = normaltexture;
material.roughness = 0.2
material.metalness = 0.2


// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 5
scene.add(pointLight)
const pointlight2 = new THREE.PointLight(0xff0000, 0.6)
pointlight2.position.set(-2, 1, 1)
scene.add(pointlight2)
const pointlight4 = new THREE.PointLight(0xFFD700, 0.5)
pointlight4.position.set(1, -1, 3)
scene.add(pointlight4)
gui.add(pointlight4.position, 'x').min(-4).max(4).step(0.02)
gui.add(pointlight4.position, 'y').min(-4).max(4).step(0.02)
gui.add(pointlight2.position, 'x').min(-4).max(4).step(0.02)
gui.add(pointlight2.position, 'y').min(-4).max(4).step(0.02)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()
document.addEventListener('mousemove', onDocumentmove)
let targetX = 0
let targetY = 0
let pageX = 0
let pageY = 0
let windowX = window.innerWidth / 2
let windowY = window.innerHeight / 2

function onDocumentmove(event) {
    pageX = (event.clientX - windowX)
    pageY = (event.clientY - windowY)
}
const tick = () => {

    const elapsedTime = clock.getElapsedTime()
    targetX = pageX * 0.001
    targetY = pageY * 0.001
        // Update objects
    sphere.rotation.y = .5 * elapsedTime
        // Update Orbital Controls
        // controls.update()
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += .5 * (targetY - sphere.rotation.x)
        // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
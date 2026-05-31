import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from "gsap"

// import { bakedTexture, floorTexture } from "../functions/loadTextures.js"

let isMobile
let isDesktop

window.innerWidth < 1000 ? isMobile = true : isDesktop = true

console.log(isMobile, isDesktop)

/**
 * Base
 */
// // Debug
// const gui = new GUI({
//     width: 400
// })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedTexture = textureLoader.load("bakedVinyl_transparent1.png")
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace

const floorTexture = textureLoader.load("bakedFloor.png")
floorTexture.flipY = false
floorTexture.colorSpace = THREE.SRGBColorSpace


/**
 * Model
 */

const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture, transparent: true })
bakedMaterial.alphaTest = 0.001
bakedMaterial.depthWrite = true

const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture })

export let needleArm
export let vinylBase
export let vinyl

export let needleArmPlay
export let needleArmPause


export let vinylRotation
export let vinylRotationStart
export let vinylRotationStop

export let vinylBaseRotation
export let vinylBaseRotationStart
export let vinylBaseRotationStop

export let recordPlayer = gltfLoader.load(
    "bakedVinyl.glb", 
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = bakedMaterial
        })
        recordPlayer = gltf.scene
        vinylBase = recordPlayer.children[4]
        vinyl = recordPlayer.children[7]
        needleArm = recordPlayer.children[1]

        needleArmPlay = gsap.to(needleArm.rotation, { y: -Math.PI / 8, duration: 3, ease: "power2.inOut", paused: true })
        needleArmPause = gsap.to(needleArm.rotation, { y: Math.PI / 8, duration: 3, ease: "power2.inOut", paused: true })


        vinylBaseRotation = gsap.to(vinylBase.rotation, { y: "-=" + Math.PI * 2, duration: 1.8, ease: "none", repeat: -1 })
        vinylBaseRotation.timeScale(0)
        vinylBaseRotationStart = () => gsap.to(vinylBaseRotation, { timeScale: 1, duration: 0.6, ease: "power1.in", overwrite: true })
        vinylBaseRotationStop = () => gsap.to(vinylBaseRotation, { timeScale: 0, duration: 0.9, ease: "power2.out", overwrite: true })

        vinylRotation = gsap.to(vinyl.rotation, { y: "-=" + Math.PI * 2, duration: 1.8, ease: "none", repeat: -1 })
        vinylRotation.timeScale(0)
        vinylRotationStart = () => gsap.to(vinylRotation, { timeScale: 1, duration: 0.6, ease: "power1.in", overwrite: true })
        vinylRotationStop = () => gsap.to(vinylRotation, { timeScale: 0, duration: 0.9, ease: "power2.out", overwrite: true })

        // gltf.scene.position.x = -0.17
        // gltf.scene.position.y = 0
        // gltf.scene.position.z = -0.04

        gltf.scene.rotation.x = 0
        gltf.scene.rotation.y = isDesktop ? 0.19 : 0
        gltf.scene.rotation.z = 0

        scene.add(gltf.scene)
        console.log(gltf.scene)

        // gui.add(gltf.scene.position, "x").min(-1).max(1).step(0.01).name("recordPlayerPositionX")
        // gui.add(gltf.scene.position, "y").min(-1).max(1).step(0.01).name("recordPlayerPositionY")
        // gui.add(gltf.scene.position, "z").min(-1).max(1).step(0.001).name("recordPlayerPositionZ")

        // gui.add(gltf.scene.rotation, "x").min(-1).max(1).step(0.01).name("recordPlayerRotationX")
        // gui.add(gltf.scene.rotation, "y").min(-1).max(1).step(0.01).name("recordPlayerRotationY")
        // gui.add(gltf.scene.rotation, "z").min(-1).max(1).step(0.001).name("recordPlayerRotationZ")

        // recordPlayer.children[4].rotation.y += 1
    }
)

let floor = gltfLoader.load(
    "bakedFloor.glb",
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = floorMaterial
        })
        floor = gltf.scene

        // gltf.scene.position.x = -0.17
        // gltf.scene.position.y = 0
        // gltf.scene.position.z = -0.04

        gltf.scene.rotation.x = 0
        gltf.scene.rotation.y = isDesktop ? 0.19 : 0
        gltf.scene.rotation.z = 0

        scene.add(gltf.scene)

        // gui.add(gltf.scene.position, "x").min(-1).max(1).step(0.01).name("floorPositionX")
        // gui.add(gltf.scene.position, "y").min(-1).max(1).step(0.01).name("floorPositionY")
        // gui.add(gltf.scene.position, "z").min(-1).max(1).step(0.001).name("floorPositionZ")

        // gui.add(gltf.scene.rotation, "x").min(-1).max(1).step(0.01).name("floorRotationX")
        // gui.add(gltf.scene.rotation, "y").min(-1).max(1).step(0.01).name("floorRotationY")
        // gui.add(gltf.scene.rotation, "z").min(-1).max(1).step(0.001).name("floorRotationZ")
    }
)



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
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.x = isDesktop ? -0.08 : 0
camera.position.y = isDesktop ? 0.97 : 2
camera.position.z = isDesktop ? 0.372 : 1

camera.rotation.x = isDesktop ? -1.2 : 0
camera.rotation.y = isDesktop ? -0.10 : 0
camera.rotation.z = isDesktop ? -0.27 : 0

scene.add(camera)

// gui.add(camera.position, "x").min(-3).max(3).step(0.01).name("cameraPositionX")
// gui.add(camera.position, "y").min(-3).max(3).step(0.01).name("cameraPositionY")
// gui.add(camera.position, "z").min(-15).max(15).step(0.001).name("cameraPositionZ")
    
// Controls
const controls = new OrbitControls(camera, canvas)
controls.update()

function applyOffset() {
  const w = window.innerWidth
  const h = window.innerHeight
  isDesktop ? camera.setViewOffset(w, h, w * 0.2, 0, w, h) : camera.setViewOffset(w, h, 0, -h * 0.2, w, h) // 20% leftward shift on desktop, 25% downward shift on mobile
}

applyOffset()

controls.enableDamping = true
controls.dampingFactor = isDesktop ? 0.01 : 0.08
controls.rotateSpeed = isDesktop ? 0.3 : 0.6
controls.enableZoom = isDesktop ? true : true
controls.enablePan = isDesktop ? false : false

controls.maxPolarAngle = isDesktop ? Math.PI / 2.2 : Math.PI / 2.75 // how far you can look up
controls.minPolarAngle = isDesktop ? Math.PI / 55 : Math.PI / 55 // how far you can look down
controls.minAzimuthAngle = -Math.PI / 1.5
controls.maxAzimuthAngle =  Math.PI / 1.5  // ±45° sweep

controls.minDistance = isDesktop ? 0.7 : 1  // closest you can zoom in
controls.maxDistance = isDesktop ? 1.7 : 2.2  // farthest you can zoom out

// Return to position animation
const homePosition = camera.position.clone()
const homeTarget = controls.target.clone()

// debouncing start eventhandler
function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

const handleStart = debounce(() => {
        gsap.killTweensOf(camera.position)
        gsap.killTweensOf(controls.target) 
}, 2000);

const handleEnd = debounce(() => {
        gsap.killTweensOf(camera.position)
        gsap.killTweensOf(controls.target) 
        returnHome()
}, 2000);

controls.addEventListener("start", handleStart)
controls.addEventListener("end", handleEnd)

function returnHome() {
    gsap.to(camera.position, {
        x: homePosition.x, 
        y: homePosition.y, 
        z: homePosition.z, 
        duration: 2.5, 
        ease: "power2.inOut", 
        onUpdate: () => { controls.enabled = false },
        onComplete: () => { controls.enabled = true }
    })
    gsap.to(controls.target, {
        x: homeTarget.x, 
        y: homeTarget.y,
        z: homeTarget.z,
        duration: 2,
        ease: "power2.inOut", 
        onUpdate: () => { controls.enabled = false },
        onComplete: () => { controls.enabled = true }
    })
}


// const homePosition = camera.position.clone()
// const homeTarget = controls.target.clone()

// let idleTimer = null
// let returning = false
// const idleTime = 1500
// const returnSpeed = 0.005

// controls.addEventListener("start", () => {
//     returning = false
//     clearTimeout(idleTimer)
// })

// controls.addEventListener("end", ()=> {
//     idleTimer = setTimeout(() => {
//         returning = true
//     }, idleTime)
// })

// function animate() {
//     requestAnimationFrame(animate)

//     if(returning) {
//         // camera.position.lerp(homePosition, returnSpeed)
//         gsap.to(camera.position, { x: homePosition.x, y: homePosition.y, z: homePosition.z, duration: 2, ease: "power2.inOut" });


//         if (camera.position.distanceTo(homePosition) < 0.001) returning = false
//     }
    
//     controls.update()
// }

// animate()


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const delta = clock.getDelta()

    // recordPlayer ? recordPlayer.children[4].rotation.y -= delta * 3.49 : null
    // recordPlayer ? recordPlayer.children[7].rotation.y -= delta * 3.49 : null

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows, Instances, Instance, SpotLight, useDepthBuffer, Html } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import customPreset from '../assets/kloppenheim_02_puresky_1k.hdr'
import './scene.module.css'

let combinationSelector = -1
let nextColorScheme = -1

const colorCombinations = {
  //combination0: [//background, small spheres, context text,bubble and Name text]
  1: ['#537188', '#a28e61', '#E1D4BB', '#FFFFFF', '#b3b3b3'],
  2: ['#F6F1F1', '#8ca9b5', '#19A7CE', '#146C94', '#0e4b68'],
  3: ['#39B5E0', '#A31ACB', '#99488f', '#F5EA5A', '#aca53f'],
  4: ['#E5E3C9', '#B4CFB0', '#94B49F', '#789395', '#546768'],
}

let selectNextColor = () => {
  let min = 1, max = 4, rand = -1, flag=false;
  if(combinationSelector==rand) {
    rand = 1
  }
  while(rand==combinationSelector || rand==-1 || flag) {
    rand = Math.floor(Math.random() * (max - min + 1) + min)
  }
  nextColorScheme = rand
  return rand
}

combinationSelector = selectNextColor()

// React-spring animates native elements, in this case <mesh/> etc,
// but it can also handle 3rd–party objs, just wrap them in "a".
const AnimatedMaterial = a(MeshDistortMaterial)

const particles = Array.from({ length: 100 }, () => ({
  factor: THREE.MathUtils.randInt(20, 100),
  speed: THREE.MathUtils.randFloat(0.01, 1),
  xFactor: THREE.MathUtils.randFloatSpread(80),
  yFactor: THREE.MathUtils.randFloatSpread(40),
  zFactor: THREE.MathUtils.randFloatSpread(40)
}))

function Bubbles() {
  const ref = useRef()
  useFrame((state, delta) => void (ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, (-state.mouse.x * Math.PI) / 6, 2.75, delta)))
  return (
    <Instances limit={particles.length} ref={ref} castShadow receiveShadow position={[0, 10, 0]}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial roughness={0} color={colorCombinations[combinationSelector][1]} />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  )
}

function Bubble({ factor, speed, xFactor, yFactor, zFactor }) {
  const ref = useRef()
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2)
    ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5))
    ref.current.position.set(
      Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) + Math.cos(t * 2) / 10 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
    )
  })
  return <Instance ref={ref} />
}

function MovingSpot({ vec = new THREE.Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    light.current.target.updateMatrixWorld()
  })
  return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}

function FancySpotlight(props) {
  const depthBuffer = useDepthBuffer({ frames: 1 })
  if(props.mode) {
    return(
      <>
        <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[-3, 3.1, 0]} />
        <MovingSpot depthBuffer={depthBuffer} color="#b00c3f" position={[-2, 3.1, 0.5]} />
      </>
    )
  }
  else {
    return(
      <>
      </>
    )
  }
}


export default function Scene({ setBg, fill, setBackgroundC, colorSelection, setcolorSelection }) {
  const sphere = useRef()
  const light = useRef()
  const [mode, setMode] = useState(true)
  const [down, setDown] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hoverColor, sethoverColor] = useState('white')
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  useEffect(()=>{
    setcolorSelection(colorSelection)
  }, [])
  setcolorSelection(colorSelection)

  const updateMedia = () => {
    setWindowSize(window.innerWidth)
  }

  useEffect(()=>{
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })
  

  // Change cursor on hovered state
  useEffect(() => {
    let str = `url('data:image/svg+xml;base64,${btoa(
      '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="'+colorCombinations[combinationSelector][4]+'"/></svg>'
    )}'), auto`
    document.body.style.cursor = hovered
      ? 'none'
      : str
  }, [hovered])

  // Make the bubble float and follow the mouse
  // This is frame-based animation, useFrame subscribes the component to the render-loop
  useFrame((state) => {
    light.current.position.x = state.mouse.x * 20
    light.current.position.y = state.mouse.y * 20
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, hovered ? state.mouse.x / 2 : 0, 0.2)
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
        0.2
      )
    }
  })

  // Springs for color and overall looks, this is state-driven animation
  // React-spring is physics based and turns static props into animated values
  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: down ? 1.4 : hovered ? 1.1 : 1, // size of the bubble
      coat: mode && !hovered ? 10 : 10, // shine on the bubble
      ambient: mode && !hovered ? 0.8 : 0.25, // lightness of the bubble
      env: mode && !hovered ? 1.4 : 2.2, // light cast by the pointer?
      config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 5 }
    },
    [mode, hovered, down]
  )

  return (
    <>
      <PerspectiveCamera makeDefault position={windowSize > 600 ? [-3, 0, 4]: [0, -1, 5]} fov={75}>
        <a.ambientLight intensity={ambient} />
        <a.pointLight ref={light} position-z={-15} intensity={env} color="#F8C069" />
      </PerspectiveCamera>
      <Suspense fallback={null} >
        <a.mesh
          ref={sphere}
          scale={wobble}
          onPointerOver={() => {
            sethoverColor(colorCombinations[selectNextColor()][3]);
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
            sethoverColor(colorCombinations[combinationSelector][3]);
          }}
          onPointerDown={() => {
            setDown(true);
            sethoverColor(colorCombinations[nextColorScheme][3]);
            combinationSelector=nextColorScheme;
            setcolorSelection(combinationSelector);
          }}
          onPointerUp={() => {
            setDown(false)
            setBg({ background: !mode ? colorCombinations[nextColorScheme][0] : colorCombinations[combinationSelector][0], fill: !mode ? colorCombinations[nextColorScheme][0] : colorCombinations[combinationSelector][0] })
          }}>
          <sphereBufferGeometry args={[1, 64, 64]} />
          <AnimatedMaterial color={hoverColor} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0} metalness={0.1} />
        </a.mesh>
        <Environment files={customPreset} blur={0.9} />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={mode ? 0.8 : 0.4}
          width={15}
          height={15}
          blur={2.5}
          far={1.6}
        />
        <Bubbles />
        <ContactShadows position={[0, -30, 0]} opacity={0.6} scale={130} blur={1} far={40} />
        {/* <FancySpotlight mode={mode} /> */}
        <Html as='div' style={{top:"24vh"}}>
          <div className={'main-container'}>
              <div className='modus'>
                  MODUS OPERANDI 
                  <br />
                  SIMPLICITY IS ABOUT REMOVING THE OBVIOUS AND ADDING THE MEANINGFUL
              </div>
              <div className='myname' style={{color:colorCombinations[combinationSelector][3]}}>
                  Vedant Tilwani 
              </div>
              <div className={'developer'} style={{color:colorCombinations[combinationSelector][2]}}>
                  Creative Fullstack Developer
              </div>
          </div>
        </Html>
      </Suspense>
    </>
  )
}

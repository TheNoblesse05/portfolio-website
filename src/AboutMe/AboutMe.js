import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, TrackballControls, OrbitControls } from '@react-three/drei'
import Rive from '@rive-app/react-canvas';
import riveAnimation from '../assets/rive/metaverse_vr(2).riv'
import './aboutme.css'

function Word({ children, ...props }) {
    const color = new THREE.Color()
    const fontProps = { font: '/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
    const ref = useRef()
    // const [hovered, setHovered] = useState(false)
    // const over = (e) => (e.stopPropagation(), setHovered(true))
    // const out = () => setHovered(false)
    // Change the mouse cursor on hover
    // useEffect(() => {
    //   if (hovered) document.body.style.cursor = 'pointer'
    //   return () => (document.body.style.cursor = 'auto')
    // }, [hovered])
    // Tie component to the render-loop
    useFrame(({ camera }) => {
      // Make text face the camera
      ref.current.quaternion.copy(camera.quaternion)
      // Animate font color
    //   ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
    })
    return <Text ref={ref} {...props} {...fontProps} children={children} />
  }
  
  function Cloud({ count = 4, radius = 20 }) {
    // Create a count x count random words with spherical distribution
    const words = useMemo(() => {
      const temp = []
      const spherical = new THREE.Spherical()
      const phiSpan = Math.PI / (count + 1)
      const thetaSpan = (Math.PI * 2) / count
      const skills = [
        [],
        ['Angular','FastAPI','SQL'],
        ['React','Python','Flutter'],
        ['ThreeJS','BERT/GPT','Docker'],
      ]
      for (let i = 1; i < count + 1; i++)
        for (let j = 0; j < count; j++) temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), skills[i][j]])
      return temp
    }, [count, radius])
    return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
  }

function SetFog(backgroundColor) {
    if(backgroundColor.backgroundColor == '#f0f0f0')
        return(<fog attach="fog" args={['#202025', 80, 0]} />)
    if(backgroundColor.backgroundColor == '#202020')
        return(<fog attach="fog" args={['#202025', 0, 80]} />)
    return(<fog attach="fog" args={['#000000', 80, 0]} />)
}

const mystyle = {
    width: '100%',
    height: '100%',
    marginTop: '25vh',
    marginLeft: '10vw',
}

export default function AboutMe({backgroundC, colorSelection, colorCombinations}) {
    return(
        <div className='aboutme-main-container' style={{background: `${colorCombinations[colorSelection][2]}26`}}>
            <div className='aboutme-text'>
                <div className='aboutme-dets'>
                    <div className='aboutme-title' style={{color: colorCombinations[colorSelection][3]}}>
                        About Me
                    </div>
                    <div className='aboutme-desc'>
                        Hi! I'm Vedant Tilwani, a Fullstack Developer based in Bengaluru and I specialize in creating pixel-perfect interfaces that seamlessly blend aesthetics and functionality. I'm all about combining visual design with product thinking to bring meaningful experiences live.
                    </div>
                </div>
                <div className='aboutme-rive'>
                    <Rive src={riveAnimation} stateMachines='State Machine 1'/>
                </div>
            </div>
            <div className='skill-tree'>
                <Suspense fallback={null}>
                    <Canvas style={mystyle} className='canvas-style' dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                        <SetFog />
                        
                        <Cloud count={3} radius={10} />
                        
                        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI} minPolarAngle={0} />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    )
}
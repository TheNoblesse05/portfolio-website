import React, {useState, useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import Header from './Header/Header'
import Scene from './LandingScene/Scene'
import AboutMe from './AboutMe/AboutMe'
import Experience from './Experience/Experience'
import Loader from './Loader/Loader'

const colorCombinations = {
  //combination0: [//background, small spheres, context text,bubble and Name text]
  1: ['#537188', '#a28e61', '#E1D4BB', '#FFFFFF', '#b3b3b3'],
  2: ['#F6F1F1', '#8ca9b5', '#19A7CE', '#146C94', '#0e4b68'],
  3: ['#39B5E0', '#A31ACB', '#99488f', '#F5EA5A', '#aca53f'],
  4: ['#E5E3C9', '#B4CFB0', '#94B49F', '#789395', '#546768'],  
}

export default function App() {

  let selectNextColor = () => {
    let min = 1, max = 4, rand = -1, flag=true;
    while(rand==-1 || flag) {
      rand = Math.floor(Math.random() * (max - min + 1) + min)
      if(rand%2==0)
        flag = false
    }
    return rand
  }

  const [colorSelection, setcolorSelection] = useState(1)
  // This spring controls the background and the svg fill (text color)
  const [{ background, fill }, set] = useSpring({ background: colorCombinations[colorSelection][0], fill: colorCombinations[colorSelection][0] }, [])
  const [{ backgroundT, fillT }, setT] = useSpring({ background: 'transparent', fill: colorCombinations[colorSelection][0] }, [])
  const [backgroundC, setBackgroundC] = useState(background.animation.to)
  const [Loading, setLoading] = useState(false)

  

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, [])

  return (
    <>
      {
        Loading ?
          (
            <Loader colorCombinations={colorCombinations}/>
          )
        :
          (
            <div className='app-main-container' id="container">
              <Header backgroundC={background} colorSelection={colorSelection} colorCombinations={colorCombinations}/>
              <div className='pages-home'>
                <a.main style={{ background }}>
                  <Canvas className="canvas" dpr={[1, 2]}>
                    <Scene setBg={set} fill={fill} setBackgroundC={setBackgroundC} colorSelection={colorSelection} setcolorSelection={setcolorSelection} />
                  </Canvas>
                </a.main>
              </div>
              <div className='pages-filler'></div>
              <div className='pages'>
                <a.main style={{ background:'transparent' }}>
                  <AboutMe backgroundC={backgroundT} colorSelection={colorSelection} colorCombinations={colorCombinations} />
                </a.main>
              </div>
              <div className='pages'>
                <a.main style={{ background:'transparent' }}>
                  <Experience backgroundC={background} colorSelection={colorSelection} colorCombinations={colorCombinations} />
                </a.main>
              </div>
            </div>
          )
      }
    </>
  )
}

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF, OrbitControls,PerspectiveCamera, OrthographicCamera, smoothness } from "@react-three/drei";
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { useSpring, animated, config } from "@react-spring/three";
import logo from '../images/logo.svg';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html,
  body{
    margin: 0;
    padding: 0;
    position: relative;
    background: #000;
  }
  canvas{
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
`
const Main = styled.main`
  background: #000000;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100vw;
  height: 100vh;
`

const LogoImg = styled.img`
  width: 300px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 999;
  pointer-events: none;
`

function Steak(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/steak.glb')
  
  const myMesh = React.useRef();
  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a/4;
    myMesh.current.rotation.y = a/6;
    myMesh.current.rotation.z = -a/6;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.3, 0.39, 0.01]}>
        <group position={[0.3, -0.39, -0.01]}>
          <animated.mesh
            geometry={nodes['node-0'].geometry}
            material={materials.map_Ka}
            position={[0, 0.37, 0]}
            rotation={[0.18, 0.07, 0.98]}
            scale={scale}
            onClick={() => setActive(!active)}
            ref={myMesh}
          />
        </group>
      </group>
      <group position={[-6.95, 0.67, -2.94]} rotation={[1.59, -0.04, 1.99]} />
    </group>
  )
}

const IndexPage = () => {
  return (
    <>
    <GlobalStyle />
    <Main>
      <LogoImg src={logo}/>
      <Canvas gl={{ alpha: false }} shadows dpr={[1, 2]} >
        <color attach="background" args={['black']} />
        
        <ambientLight intensity={1.5} />
          <Suspense fallback={null}>
            <Steak/>
            <fog attach="fog" args={["black", 3, 5]} />
          </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
    </Main>
    </>
  )
}

export default IndexPage

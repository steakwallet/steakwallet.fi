/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera, OrthographicCamera } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/model.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 50]}>
        <mesh geometry={nodes.Plane.geometry} material={materials['default']} />
      </group>
      <OrthographicCamera makeDefault={false} far={50000} near={-50000} position={[0, 0, 1000]} rotation={[0, 0, 0]} />
      <PerspectiveCamera
        makeDefault={false}
        far={50000}
        near={50}
        fov={45}
        position={[0, 0, 1000]}
        rotation={[0, 0, 0]}>
        <directionalLight
          intensity={1.5}
          decay={2}
          position={[850000, 1300000, 1000000]}
          rotation={[-0.92, 0.48, -0.34]}
        />
      </PerspectiveCamera>
    </group>
  )
}

useGLTF.preload('/model.glb')
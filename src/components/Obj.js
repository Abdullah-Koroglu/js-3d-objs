import React, { useState,useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import { useFrame ,extend, useThree } from 'react-three-fiber';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {useSpring,a} from 'react-spring/three';

extend(OrbitControls);

const Controls = () => {
    const orbitRef= useRef();
    const {camera ,gl}=useThree();

    useFrame(()=>{
        orbitRef.current.update()
    });
    return(
        <orbitControls
        args={[camera, gl.domElement]}
        ref={orbitRef}
        />
    )
}

const Box = () => {
    const meshRef= useRef();
    const [hovered ,setHovered] = useState(false)
    const [active ,setActive] = useState(false)
    const props=useSpring({scale:active ? [1,1,1]:[1.5,1.5,1.5], color:hovered ? "hotpink" : "blue"}
 )
 useFrame( () => {
    meshRef.current.rotation.y += 0.01
    meshRef.current.rotation.z += 0.02
  })
        return(
            <a.mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={ () => setHovered(false)}
                onClick={() => setActive(!active)}
                scale={props.scale}>
             <boxBufferGeometry
                attach="geometry"
                args={[2,2,2]}
         />
            <a.meshBasicMaterial 
                attach="material" 
                color={props.color}/>
            </a.mesh>

)}


export default () => (<Canvas>
    <Controls/>
    <Box/>
</Canvas>)

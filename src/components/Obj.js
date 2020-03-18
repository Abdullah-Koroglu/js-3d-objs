import React, { useState,useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import { useFrame ,extend, useThree } from 'react-three-fiber';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {useSpring,a} from 'react-spring/three';

extend({OrbitControls});



const Controls = () => {
    const orbitRef= useRef();
    const {camera ,gl}=useThree();

    useFrame(state=>{
        orbitRef.current.update()
    });
    return(
        <orbitControls
        autoRotate
        args={[camera, gl.domElement]}
        ref={orbitRef}
        />
    )
}

const Plane = () => (
    <mesh position={[0,-1.5,0]}
    rotation={[-Math.PI/2,0,0]}>
    <meshPhysicalMaterial 
    attach="material" 
    color="black"/>
    <planeBufferGeometry
        attach="geometry"                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        args={[20,20]}
    />

    </mesh>
)

const Box = () => {
    const meshRef= useRef();
    const [hovered ,setHovered] = useState(false)
    const [active ,setActive] = useState(false)
    const props=useSpring({scale:active ? [1,1,1]:[1.5,1.5,1.5], color:hovered ? "hotpink" : "green"}
 )

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
            <ambientLight/>
            <spotLight position={[0,25,8]}/>
           
            <a.meshPhysicalMaterial 
                attach="material" 
                color={props.color}/>
            </a.mesh>

)}

// 
export default () => (
<div>
<Canvas camera={ {position :[0,0,5]}}>  
    <fog attach="fog" args={["white",3,8]} />
    <Plane/>
    <Controls/>
    <Box/>
</Canvas>
    </div>)

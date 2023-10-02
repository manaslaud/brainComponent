import React, { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

const textureloader= new THREE.TextureLoader();
  const texture= textureloader.load('sec4.png')


const MyComponent = () => {
  const ref= useRef();
  let time=0
console.log(ref)

  useFrame(({clock})=>{
    time=clock.getElapsedTime()
    
  })
  const CreateShaderMesh = (x,y,z) => {
   
    const GridShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0.1, 0.3, 0.9) },
        mouse_v: { value: new THREE.Vector3(0, 0, 0) },
        u_texture: { value: texture },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vertexNormal;
        
        void main() {
          vertexNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D u_texture;
        varying vec2 vUv;
        
        void main() {
          vec4 texColor = texture2D(u_texture, vUv);
          gl_FragColor = vec4(texColor.xyz, 1.0);
        }
      `,
    });
    
    extend({ GridShaderMaterial });
    return (
      <mesh key={Math.random()} position={[x,y,z]} ref={ref} >
        <boxGeometry args={[1, 1, 1]} />
       <meshMatcapMaterial matcap={texture}/>
      </mesh>
    );
  };
  let rows = 50; // Adjust the number of rows as needed

  const instances = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      instances.push(
        CreateShaderMesh(i-rows/2,-10 +Math.random(),j- rows/2) 
      );
    }
  }

  return <>{instances}</>;
};

export default MyComponent;

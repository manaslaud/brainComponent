import data from "./data.json";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { extend } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";

const path = data.economics[0].paths;
const clock = new THREE.Clock();
console.log(path)

function oneCurve(curve){
  const ColorShiftMaterial = shaderMaterial(
    {
      time: 0,
      color: new THREE.Color(0, 0.1, 0.7)
    },
    // vertex shader
    `
    varying vec2 vUv;
    void main() {
      vUv=uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
  }
    `,
    // fragment shader
    `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      float normalizedSin = 0.5 + 0.5 * sin(time);
    
      vec3 modifiedColor = color * normalizedSin;
    
      gl_FragColor = vec4(vUv.x*normalizedSin, vUv.y* normalizedSin,1.0, 1.0);   
    
    }
    `
  );
  
  const materialRef = useRef();
  useFrame(() => {
    let time = clock.getElapsedTime();
    materialRef.current.uniforms.time.value = time;
    // console.log(materialRef.current.uniforms.time.value)
  });
  
  extend({ ColorShiftMaterial });
  return (
    <mesh >
      <tubeGeometry args={[curve, 64, 0.001, 8, false]} wireframe={true}/>
      <colorShiftMaterial
        // side={THREE.DoubleSide}
        ref={materialRef}
      />
    </mesh>
  );
}

export default function Brain() {
  

 

  let curves = [];
  for (let k = 0; k < path.length; k++) {
    let tube = path[k];
    let points = [];
    for (let i = 0; i < tube.length ; i = i + 3) {
      points.push(new THREE.Vector3(tube[i], tube[i + 1], tube[i + 2]));
    }
    const curve = new THREE.CatmullRomCurve3(points);
   
    curves.push(curve);
  }
  console.log(curves)

  
  return (
    <>
    { curves.map((curve)=>{
      return (oneCurve(curve))
    })}
    </>
  );
}

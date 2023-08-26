import data from "./data.json"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"
const path= data.economics[0].paths
const ColorShiftMaterial = shaderMaterial(
    { time: 1, color: new THREE.Color(1.2, 0.0, 0.1) },
    // vertex shader
    `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    // fragment shader
    `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
      }
    `
  )
  extend({ ColorShiftMaterial })

export default function Brain(){
    useFrame(()=>{})
    let curves=[]
    for(let k=0;k<path.length;k++){
        let tube=path[k]
        let points=[]
    for(let i=0;i<=tube.length-1;i=i+3){
       points.push(new THREE.Vector3(tube[i],tube[i+1],tube[i+2]))
    }
    const curve= new THREE.CatmullRomCurve3(points)
    curves.push(curve)
    }

    return <>
         {curves.map((curve,index)=>{
                return(
                    <mesh key={index}>
                    <tubeGeometry args={[curve,64,.001,12,false]}/>
                    <colorShiftMaterial side={THREE.DoubleSide}/>
                </mesh>
                )

            })}
    </>
}
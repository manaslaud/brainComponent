import React, { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";


const createShaderMesh = (x,y,z) => {
  const GridShaderMaterial = shaderMaterial(
    {
      time: 0,
      color: new THREE.Color(0.1, 0.3, 0.9),
      mouse_v: new THREE.Vector3(0,0,0)
    },
    // vertex shader
    `
    uniform float time;
    varying vec2 vUv;
    varying float vProgress;
    uniform vec3 mouse_v;

    void main() {
      vUv=uv;
      vec3 p=position;
      float maxDist=0.07;
      float dist=length(mouse_v-p);
    
      if(dist<maxDist){
        vec3 distortion=0.5* normalize(mouse_v-p);
        distortion*= (1.-dist/maxDist);
        p-=distortion*0.03;
      }
      vProgress=smoothstep(-1.,1.,sin(vUv.x*8. + time*3.8));
      gl_Position=projectionMatrix *modelViewMatrix *vec4(p,1.0);

  }
    `,
    // fragment shader
    `
    float gamma = 2.1;
    uniform float time;
    varying float vProgress;
    uniform vec3 color;
    varying vec2 vUv;
    vec3 simpleReinhardToneMapping(vec3 color)
  {
	float exposure = 1.5;
	color *= exposure/(1. + color / exposure);
	color = pow(color, vec3(1. / gamma));
	return color;
  }
  vec3 whitePreservingLumaBasedReinhardToneMapping(vec3 color)
{
	float white = 2.;
	float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
	float toneMappedLuma = luma * (1. + luma / (white*white)) / (1. + luma);
	color *= toneMappedLuma / luma;
	color = pow(color, vec3(1. / gamma));
	return color;
}
vec3 filmicToneMapping(vec3 color)
{
	color = max(vec3(0.), color - vec3(0.004));
	color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);
	return color;
}
vec3 RomBinDaHouseToneMapping(vec3 color)
{
    color = exp( -1.0 / ( 2.72*color + 0.15 ) );
	color = pow(color, vec3(1. / gamma));
	return color;
}

    void main() {
      float normalSine= 0.5 + 0.5*sin(time);
      float hidecorners=smoothstep(1.,.9,vUv.x);
      float hidecorners1=smoothstep(0.,.9,vUv.x);
      //for neon effect change color1 green param
      vec3 color1 =vec3(.5,0.06,0.35);
      vec3 color2 =vec3(6.,0.1,0.03*normalSine);
      //white intensity controll using green param
      vec3 finalColor =mix(color1*0.35,color2,vProgress);
      vec3 finalColor1=whitePreservingLumaBasedReinhardToneMapping(finalColor);
      gl_FragColor.brga =vec4(finalColor1,hidecorners*hidecorners1) ;   
    
    }

    `
  );
  extend({ GridShaderMaterial });
  return (
    <mesh key={Math.random()} position={[x,y,z]}>
      <boxGeometry args={[1, 1, 1]} />
      <gridShaderMaterial />
    </mesh>
  );
};

const MyComponent = () => {
  let rows = 50; // Adjust the number of rows as needed

  const instances = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      instances.push(
        createShaderMesh(i-rows/2,-10 +Math.random(),j- rows/2) // Call the function to create a single shader custom mesh
      );
    }
  }

  return <>{instances}</>;
};

export default MyComponent;

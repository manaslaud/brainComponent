import React, { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { shaderMaterial } from "@react-three/drei";

const textureloader= new THREE.TextureLoader();
  const texture= textureloader.load('sec4.png')


const Abstract = () => {
const ref= useRef();
let time=0;
console.log(ref)
useFrame(({clock})=>{
    time=clock.getElapsedTime()
    ref.current.material.uniforms.time.value=time;
  })

  
  const GridShaderMaterial = new THREE.ShaderMaterial({
    
    side:THREE.DoubleSide,
    uniforms: {
        time:{value:0}
    },
    vertexShader: `
    varying vec3 vPosition;
    varying vec3 vPattern;
    varying vec3 vNormal;
    varying vec2 vUv;
    
    uniform float time;
    
    #define PI 3.14159265358979
    #define MOD3 vec3(.1031,.11369,.13787)
    
    vec3 hash33(vec3 p3) {
        p3 = fract(p3 * MOD3);
        p3 += dot(p3, p3.yxz+19.19);
        return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
    }
    
    // ? Perlin noise
    float pnoise(vec3 p) {
        vec3 pi = floor(p);
        vec3 pf = p - pi;
        vec3 w = pf * pf * (3. - 2.0 * pf);
        return 	mix(
                    mix(
                        mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                            dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                               w.x),
                        mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                            dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                               w.x),
                        w.z),
                    mix(
                        mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                            dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                               w.x),
                           mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                            dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                               w.x),
                        w.z),
                    w.y);
    }
    
    void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normal;
        float noiseMultiplier= clamp((abs(vUv.x-0.5)-0.3+ sin(time))*3.0, 0.0,1.0);
        vPattern=vec3(noiseMultiplier);
        float noise= pnoise(vPosition*5.0)*noiseMultiplier;
        float displacement =noiseMultiplier*noise;
        vec3 newPosition = vPosition + vNormal * displacement; 
    
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
    `,
    fragmentShader: `

    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPattern;
    uniform float time;
    
    #define PI 3.14159265358979
    #define MOD3 vec3(.1031,.11369,.13787)
    
    vec3 hash33(vec3 p3) {
        p3 = fract(p3 * MOD3);
        p3 += dot(p3, p3.yxz+19.19);
        return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
    }
    
    // ? Perlin noise
    float pnoise(vec3 p) {
        vec3 pi = floor(p);
        vec3 pf = p - pi;
        vec3 w = pf * pf * (3. - 2.0 * pf);
        return 	mix(
                    mix(
                        mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                            dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                               w.x),
                        mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                            dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                               w.x),
                        w.z),
                    mix(
                        mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                            dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                               w.x),
                           mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                            dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                               w.x),
                        w.z),
                    w.y);
    }
    void main() {
        float noise=pnoise(vec3(vPosition.z*50.0));
        vec3 purpleColor=vec3(0.498,0.2039,0.8314)/vec3(0.4941,0.4941,0.051);
        vec3 color=vec3(noise)*purpleColor;
     
        gl_FragColor = vec4(vec3(color) , 1.0);
    }
    `,
  });

  return <mesh material={GridShaderMaterial} ref={ref}>
    <torusGeometry args={[1,0.3,1000,1000]}/>
  </mesh>;
};

export default Abstract;

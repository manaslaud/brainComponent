import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import * as THREE from 'three';
const MyComponent = () => {
    const meshRef = useRef();
  
    let rows=100
    let count =rows*rows
    const instanceMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial(),count
    );
    
    const dummy = new THREE.Object3D()
    let index=0;
    for(let i=0;i<rows;i++){
       for(let j=0;j<rows;j++){
       
       dummy.position.set(i- (rows/2),-10+Math.random(),j- (rows/2)-1)
       dummy.updateMatrix()
       instanceMesh.setMatrixAt(index++,dummy.matrix)
       }
    }
    instanceMesh.instanceMatrix.needsUpdate =true;
  
    return (
      <mesh ref={meshRef}>
       
        <primitive object={instanceMesh} />
      </mesh>
    );
  };
  
  export default MyComponent
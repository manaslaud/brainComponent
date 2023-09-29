import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Scene from "./Scene"



export default function App (){
   let frustumsize =4
   const aspect = window.innerWidth / window.innerHeight;

   const cameraProps = {
    left: -aspect*frustumsize/2,
    right: aspect*frustumsize/2,
    top: 2,
    bottom: -2,
    near: -1000,
    far: 1000,
  };

    return(
        <div className="w-full h-screen bg-black">
            <Canvas  orthographic  camera={{position:[8,12,16] ,cameraProps, zoom:120}} style={{background:'black'}}>
            <ambientLight itensity={0.5} />
      <pointLight position={[10, 10, 10]} />
            <OrbitControls/>
            <>
            <Scene/>
            </>
            
        </Canvas>
        </div>
        
        
    )
}
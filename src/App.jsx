import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Abstract from "./Abstract"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Bloom,  EffectComposer  } from '@react-three/postprocessing'
import { SMAA, FXAA } from "@react-three/postprocessing";
import Particle from "./Particle"


export default function App (){

    function AdaptivePixelRatio() {
        const current = useThree((state) => state.performance.current)
        const setPixelRatio = useThree((state) => state.setDpr)
        useEffect(() => {
          setPixelRatio(window.devicePixelRatio * current)
        }, [current])
        return null
    }      
   let frustumsize =4
   const aspect = window.innerWidth / window.innerHeight;

   const cameraProps = {
    left: -aspect*frustumsize/2,
    right: aspect*frustumsize/2,
    top: 2,
    bottom: -2,
    near: 0.1,
    far: 1000,
  };

    return(
        <div className="w-full h-screen bg-black relative">
         
            <h1 className=' top-[50%] text-white text-6xl absolute bg-red-200'>Click to change </h1>
          <Particle/>
        </div>
        
        
    )
}
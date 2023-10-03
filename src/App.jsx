import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Abstract from "./Abstract"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Bloom,  EffectComposer  } from '@react-three/postprocessing'
import { SMAA, FXAA } from "@react-three/postprocessing";



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
        <div className="w-full h-screen bg-black">
            <Canvas gl={{antialiasing:true}}  camera={{position:[8,12,16] ,near:0.1, far:1000, zoom:10}}  >
            <OrbitControls/>
        <Abstract/>
        <EffectComposer>
        <FXAA
            consoleWarn={false} // Set this to true if you want to see warnings in the console
            edgeThreshold={0.125} // Adjust the edge threshold as needed
            edgeThresholdMin={0.04} // Adjust the minimum edge threshold as needed
          />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.2} height={700} />
       
      </EffectComposer>
<AdaptivePixelRatio/>
        </Canvas>
        </div>
        
        
    )
}
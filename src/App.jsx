import data from "./data.json"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Brain from "./Brain"




export default function App (){
   
    return(
        <div className="w-full h-screen bg-black">
            <Canvas camera={{position:[.2,.04,0.2],near:0.0001}}>
            <ambientLight/>
            <OrbitControls/>
            <>
            <Brain/>
            </>
            
        </Canvas>
        </div>
        
        
    )
}
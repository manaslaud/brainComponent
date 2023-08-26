import data from "./data.json"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Brain from "./Brain"




export default function App (){
   
    return(
        <div className="w-full h-screen">
            <Canvas camera={{position:[.3,.3,.3]}}>
            <ambientLight/>
            <OrbitControls/>
            <>
            <Brain/>
            </>
            
        </Canvas>
        </div>
        
        
    )
}
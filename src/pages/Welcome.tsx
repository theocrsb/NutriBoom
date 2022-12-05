import SuscribeButton from "../components/SuscribeButton";
import ConnexionButton from "../components/ConnexionButton";
import "./Welcome.css"

const Welcome = ()=>{
    return(
        <div>  
          <div className = "saladePicture">
            {/* image avec salade */}
          </div>

          <div>
     <SuscribeButton/>
     <ConnexionButton/>
     </div>
     
      </div>
    )
}
export default Welcome;
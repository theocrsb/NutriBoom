import AlimentAddButton from "../components/AlimentAddButton";
import "./Add.css"

const AddLunch =()=>{

    //  PROPS----------------------------------------
     const lunchFunction=(e:React.FormEvent)=>{
 console.log("props dans le breakfast",e)
     }
//  PROPS----------------------------------------

    return(
      <div>
            <div className="list">
            <li className ="listeRecherche">
                <span className="text"> Déjeuner</span>      
            </li>
            <span className ="buttonValidate"><AlimentAddButton/></span>
            </div>
        </div>
    )
}
export default AddLunch
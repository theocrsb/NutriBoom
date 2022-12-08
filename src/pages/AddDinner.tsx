import AlimentAddButton from "../components/AlimentAddButton";
import "./Add.css"

const AddDinner=()=>{

//  PROPS----------------------------------------
     const dinnerFunction=(e:React.FormEvent)=>{
 console.log("props dans le diner")
     }
//  PROPS----------------------------------------
 
    return(
      <div>
            <div className="list">
            <li className ="listeRecherche">
                <span className="text"> Diner</span>      
            </li>
            <span className ="buttonValidate"><AlimentAddButton/></span>
            </div>
        </div>
    )
}
export default AddDinner;
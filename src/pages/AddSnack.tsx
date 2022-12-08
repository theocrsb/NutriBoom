import AlimentAddButton from "../components/AlimentAddButton";
import "./Add.css"

const AddSnack=()=>{

    //  PROPS----------------------------------------
     const snackFunction=(e:React.FormEvent)=>{
 console.log("props dans la collation",e)
     }
//  PROPS----------------------------------------

    return(
     <div>
            <div className="list">
            <li className ="listeRecherche">
                <span className="text"> Collation</span>      
            </li>
            <span className ="buttonValidate"><AlimentAddButton/></span>
            </div>
        </div>
    )
}
export default AddSnack;
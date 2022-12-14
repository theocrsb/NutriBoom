import AlimentAddButton from "../components/AlimentAddButton";
import "./Add.css"
import SearchBar from "../components/SearchBar";
import {useState} from "react";

const AddDinner=()=>{
 const [alimentInput,setAlimentInput] = useState<string>()

 //  ------------------------PROPS----------------//
     const dinnerSubmitFunction=(e:React.FormEvent)=>{
     console.log("props dans le diner")
     }

         const searchBarFunction=(e: string)=>{
        console.log("props passé dans le parent",e)
        setAlimentInput(e)
        console.log("props passé dans le parent et le state",e)
     }
//   ---------------------PROPS-------------------//
 
 
    return(
      <div>
           <div className="searchbarPosition">
             <SearchBar searchProps={searchBarFunction}/>
             </div>
             <div className="list">
             <li className ="listeRecherche">
                 <span className="text"> add Dîner</span>
                 <div className = "formulaire">
                 <form className="form" onSubmit={dinnerSubmitFunction}>
                 <label htmlFor="quantity" className="htmlForm-label"/>
                 <input className="quantity" type="text" id="quantity" placeholder="quantité en gr" />
                  <span className ="buttonValidate"><AlimentAddButton/></span>
                  </form>     
                  </div> 
            </li>
            </div>
        </div>
    )
}
export default AddDinner;
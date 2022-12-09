import "./Add.css"
import AlimentAddButton from "../components/AlimentAddButton";
import SearchBar from "../components/SearchBar";
import {useState} from "react";

const AddBreakfast = ()=>{

    const [alimentInput,setAlimentInput] = useState<string>()

      const breakfastSubmitFunction=(e:React.FormEvent)=>{
      e.preventDefault();
      console.log("props dans le breakfast")
    }

    const searchBarFunction=(e: string)=>{
        console.log("props passé dans le parent",e)
        setAlimentInput(e)
        console.log("props passé dans le parent et le state",e)
     }
     return(
        <div>
            <div className="searchbarPosition">
             <SearchBar searchProps={searchBarFunction}/>
             </div>
             <div className="list">
             <li className ="listeRecherche">
                 <span className="text"> Petit-déjeuner</span>
                 <div className = "formulaire">
                 <form className="form" onSubmit={breakfastSubmitFunction}>
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
export default AddBreakfast;

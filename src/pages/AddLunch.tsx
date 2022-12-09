import AlimentAddButton from "../components/AlimentAddButton";
import "./Add.css"
import SearchBar from "../components/SearchBar";
import {useState} from "react"

const AddLunch =()=>{

    const [alimentInput,setAlimentInput] = useState<string>()
    //  -------------------PROPS---------------------//
     const lunchSubmitFunction=(e:React.FormEvent)=>{
     console.log("props dans le breakfast",e)
     }

        const searchBarFunction=(e: string)=>{
        console.log("props passé dans le parent",e)
        setAlimentInput(e)
        console.log("props passé dans le parent et le state",e)
    }
// ---------------------- PROPS--------------------//

    return(
      <div>
        <div className="searchbarPosition">
             <SearchBar searchProps={searchBarFunction}/>
             </div>
            <div className="list">
            <li className ="listeRecherche">
                <span className="text"> Déjeuner</span>
                <div className = "formulaire">
                <form className="form" onSubmit={lunchSubmitFunction}>
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
export default AddLunch
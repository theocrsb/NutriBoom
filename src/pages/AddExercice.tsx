import AlimentAddButton from "../components/AlimentAddButton";
import "./Add.css"
import SearchBar from "../components/SearchBar";
import {useState} from "react"

const AddExercice = ()=>{
 const [exerciceInput,setExerciceInput] = useState<string>()


    //  -------------------PROPS---------------------//
     const exerciceSubmitFunction=(e:React.FormEvent)=>{
 console.log("props dans les exercices",e)
     }

      const searchBarFunction=(e: string)=>{
        console.log("props passé dans le parent",e)
        setExerciceInput(e)
        console.log("props passé dans le parent et le state",e)
      }
//  --------------------PROPS--------------------//
    return(
          <div>
           <div className="searchbarPosition">
             <SearchBar searchProps={searchBarFunction}/>
             </div>
             <div className="list">
             <li className ="listeRecherche">
                 <span className="text"> Exercice</span>
                 <div className = "formulaire">
                 <form className="form" onSubmit={exerciceSubmitFunction}>
                 <label htmlFor="quantity" className="htmlForm-label"/>
                 <input className="quantity" type="number" id="quantity" placeholder="temps en min" />
                  <span className ="buttonValidate"><AlimentAddButton/></span>
                  </form>     
                  </div> 
            </li>
            </div>
        </div>
    )
}
export default AddExercice;
import AlimentAddButton from "../components/AlimentAddButton";
import "./Add.css"
import SearchBar from "../components/SearchBar";
import React, {useState, useEffect} from "react"
import axios from "axios";

export interface Activity{
id: number,
name: string,
conso_cal_h: number
}
const AddExercice = ()=>{
 const [exerciceInput,setExerciceInput] = useState<string>()
 const [listExercices, setListExercices]=useState<Activity[]>([])
 const[listTriee, setListTriee]=useState<Activity[]>([])
 const [quantity, setQuantity]= useState<string>()


    //  -------------------PROPS---------------------//
     const exerciceSubmitFunction=(e:React.FormEvent)=>{
 console.log("props dans les exercices",e)
 
     }

    //  En cours de finalisation
      const searchBarFunction=(e: string)=>{
        console.log("props passé dans le parent",e)
        setExerciceInput(e)
        console.log("props passé dans le parent et le state",e)
         if(!e){
            setListTriee([])
        }else{
        let listExo = listExercices.filter((exo)=>exo.name.includes(e))
        setListTriee(listExo)}     
        }
      
//  --------------------PROPS--------------------//

useEffect(()=>{
    axios.get(`http://localhost:8080/api/activity`)
    .then((response)=>{
        console.log(response.data)
        setListExercices(response.data)
    }).catch((error)=>{
    console.log("something went wrong",error)
});
}, []);

const quantityFunction =(e:React.ChangeEvent<HTMLInputElement>)=>{
console.log("quantity", e.currentTarget.value)
}

    return(
          <div>
           <div className="searchbarPosition">
             <SearchBar searchProps={searchBarFunction}/>
             </div>
             <div className="list">
                 {listTriee.map((exo:Activity) =>(
             <li className ="listeRecherche">
                 <span className="text"> {exo.name}</span>
                
                 <div className = "formulaire">
                 <form className="form" onSubmit={exerciceSubmitFunction}>
                 <label htmlFor="quantity" className="htmlForm-label"/>
                 <input className="quantity" type="number" id="quantity" placeholder="temps en min" onChange={quantityFunction} />
                  <span className ="buttonValidate"><AlimentAddButton/></span>
                  </form>     
                  </div> 
            </li>
             ))}
            </div>
           
        </div>
    )
}
export default AddExercice;
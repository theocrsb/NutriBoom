import "./Add.css"
import AlimentAddButton from "../components/AlimentAddButton";
import React from "react";

const AddBreakfast = ()=>{

    const breakfastFunction=(e:React.FormEvent)=>{
        e.preventDefault();
 console.log("props dans le breakfast")
    }
    return(
        <div>
            <div className="list">
            <li className ="listeRecherche">
                <span className="text"> Petit-déjeuner</span>
                <div className = "formulaire">
                <form className="form" onSubmit={breakfastFunction}>
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

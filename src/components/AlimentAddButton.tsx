import "./PlusAddButton.css"
export interface clickProps{
onClickProps : (value:boolean)=>void
}

const AlimentAddButton =()=>{

    return(
        <div  className="divAddButton">
<button  className="addButton"><span className="croix">+</span> </button>
        </div>
    )
}

export default AlimentAddButton;
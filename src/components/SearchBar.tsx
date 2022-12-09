export interface searchBarProps{
   searchProps : (value:string)=> void;
}

const SearchBar=(props : searchBarProps)=>{
    const searchFunction=(e:React.ChangeEvent<HTMLInputElement>)=>{
console.log("recherche searchBar",e.currentTarget.value)
props.searchProps(e.currentTarget.value)
console.log("value dans la props", props.searchProps)
    }
    return(
        <div>
            <input type="text" onChange={searchFunction} placeholder="   recherche ton aliment" />
        </div>
    )
}

export default SearchBar;
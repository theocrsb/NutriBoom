import "./SearchBar.css";

export interface searchBarProps {
  searchProps: (value: string) => void;
}

const SearchBar = (props: searchBarProps) => {
  const searchFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("recherche searchBar", e.currentTarget.value);
    props.searchProps(e.currentTarget.value);
    console.log("value dans la props", props.searchProps);
  };
  return (
    <div>
      <input
        className="form-control text-center searchbar"
        type="text"
        onChange={searchFunction}
        placeholder=" Fais ta recherche ici"
      />
    </div>
  );
};

export default SearchBar;

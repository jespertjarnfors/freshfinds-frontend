
const SearchBar = ({ value, onChange }) => {
    return (
        <>
      <input
        type="text"
        placeholder="Search produce..."
        value={value}
        onChange={onChange}
        className="p-2 mt-1 border ml-4 md:ml-0 rounded-xl shadow w-3/5 md:w-max lg:w-1/5 mb-2"
        style={{ backgroundColor: "#FFF9EB" }}
      />
      </>
    );
  };
  
  export default SearchBar;
  
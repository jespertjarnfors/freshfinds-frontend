
const SearchBar = ({ value, onChange }) => {
    return (
        <>
      <input
        type="text"
        placeholder="Search produce..."
        value={value}
        onChange={onChange}
        className="p-2 mt-1 border rounded-xl shadow w-full md:w-1/4 lg:w-1/5 mb-2"
        style={{ backgroundColor: "#FFF9EB" }}
      />
      </>
    );
  };
  
  export default SearchBar;
  
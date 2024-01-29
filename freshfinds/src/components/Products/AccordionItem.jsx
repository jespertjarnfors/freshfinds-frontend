const AccordionItem = ({ title, items, isOpen, setIsOpen }) => {

  // SVG component for the down arrow icon
  const DownArrowSVG = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  );

  // Event handler for mouse over action
  const handleMouseOver = (e) => {
    if (!isOpen) e.currentTarget.style.backgroundColor = "#FFF9EB";
  };

  // Event handler for mouse out action
  const handleMouseOut = (e) => {
    if (!isOpen) e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="flex justify-between items-center text-lg xl:text-base 2xl:text-lg font-semibold py-2 px-2 w-full text-left rounded-lg"
        style={{
          backgroundColor: isOpen ? "#FFEDC2" : "transparent",
          transition: "background-color 0.2s ease-in-out",
        }}
      >
        {title}
        <DownArrowSVG />
      </button>
      {isOpen && (
        <div className="rounded-b-lg">
          {items.map(({ name, icon, onClick }, index) => (
            <div
              key={index}
              onClick={onClick}
              className="flex items-center py-1 pl-2 mb-1 rounded text-gray-700 xl:text-sm 2xl:text-base font-medium cursor-pointer"
              style={{ backgroundColor: "#FFF9EB" }}
            >
              <img src={icon} alt={name} className="w-4 h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 mr-2" />
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;

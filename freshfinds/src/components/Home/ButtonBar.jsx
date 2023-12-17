const ButtonBar = () => {
  return (
    <div className=" space-x-4 flex justify-center">
      <button
        className="text-white px-4 py-2 flex-auto text-center rounded-md"
        style={{
          backgroundColor: "#3D3D3D",
        }}
      >
        Sign Up
      </button>
      <button
        className="text-white px-6 py-2 flex-auto text-center rounded-md"
        style={{
          backgroundColor: "#FF542F",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default ButtonBar;

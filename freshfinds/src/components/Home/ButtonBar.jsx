import "./ButtonBar.css"

const ButtonBar = () => {
  return (
    <div className="space-x-6 flex">
      <button
        className="btn"
      >
        Sign Up
      </button>
      <button
        className="btn"
      >
        Login
      </button>
    </div>
  );
};

export default ButtonBar;

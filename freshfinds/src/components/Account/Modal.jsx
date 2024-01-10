
const Modal = ({ isOpen, closeModal, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="w-1/4 p-8 rounded-2xl shadow-xl" style={{ backgroundColor: "#FFF9EB" }}>
        <h3 className="text-gray-700 font-medium mb-4">{title}</h3>
        <div className="p-4">
          {children}
        </div>
        {/* <div className="flex justify-center space-x-10 pt-4">
          <button onClick={closeModal} className="btn px-10">Exit</button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;

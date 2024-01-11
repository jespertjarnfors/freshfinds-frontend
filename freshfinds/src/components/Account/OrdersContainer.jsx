
const OrdersContainer = () => {
    return (
        <div className="flex flex-row w-4/5 mr-10 p-10 rounded-xl shadow-lg justify-between custom-scrollbar" style={{ backgroundColor: "#FFEDC2", height: "85vh" }}>
          <div className="w-3/5">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Order History</h1>
          </div>
          <div className="w-2/5">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Reviews</h1>
          </div>
          {/* Here, you can add different sections of the account page */}
          {/* Example: Profile Info, Order History, Settings, etc. */}
        </div>
    );
  };
  
  export default OrdersContainer;
  
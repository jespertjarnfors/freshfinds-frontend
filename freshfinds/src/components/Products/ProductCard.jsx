const ProductCard = ({ product }) => {
    return (
      <div className="w-3/4 sm:w-1/2 md:w-52 md:mx-0 mx-auto rounded-xl overflow-hidden shadow-xl m-2" style={{
        backgroundColor: '#FFF9EB',
        alignSelf: 'start'
      }}>
        <div className="px-4 pt-2 pb-1 flex justify-between items-center">
          <div className="font-semibold text-md">{product.seller}</div>
          <img src={product.icon} alt="category icon" className="h-10 w-10" />
        </div>
        <img className="w-full h-32 object-cover" src={product.image} alt={product.name} />
        <div className="px-4 py-2">
          <div className="font-semibold text-md mb-1 text-gray-800"
          style={{
              fontFamily: 'Satoshi, sans-serif'
          }}
          >{product.name}</div>
          <p className="text-gray-700 text-sm">
            Category: <span className="font-semibold">{product.category}</span>
          </p>
        </div>
        <div className="px-4 py-1">
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
            ${product.price}/kg
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
            {product.quantity} kg
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
            {product.deliveryMethod}
          </span>
        </div>
        <div className="px-4 pt-2 pb-1">
          <div className="flex items-center mb-2">
            <label htmlFor="quantity" className="mr-1 font-semibold text-sm">Quantity (in kgs):</label>
            <input
              id="quantity"
              className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-12 mr-3"
              type="number"
              min="1"
              max={product.quantity}
            />
          </div>
          <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-2 rounded text-sm w-full mb-1">
            Add to Cart
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
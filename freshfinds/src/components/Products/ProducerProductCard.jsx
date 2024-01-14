import { useState } from "react";
import { useProductsUpdated } from "../../contexts/ProductsUpdatedContext";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import starIcon from "../../assets/icons/star.svg";

const ProducerProductCard = ({ product, productId }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { setProductsUpdated } = useProductsUpdated();


  const openEditModal = () => {
    console.log("Opening Edit Modal");
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    // Delay resetting productsUpdated so that the context can register the change
    setTimeout(() => setProductsUpdated(false), 500);
  };

  const openDeleteModal = () => {
    console.log("Opening Delete Modal");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    // Same goes here
    setTimeout(() => setProductsUpdated(false), 500);
  };

  return (
    <div
      className="w-3/4 sm:w-1/2 md:w-64 mx-3 rounded-xl shadow-xl m-4"
      style={{ backgroundColor: "#FFF9EB", alignSelf: "start" }}
    >
      <div className="px-4 pt-2 pb-1 flex justify-between items-center">
        <div className="font-semibold text-md flex items-center">
          {product.seller}
          <img src={starIcon} alt="Star Icon" className="ml-1 h-5 w-5" />
          <span className="ml-1">{product.rating}</span>
        </div>
        <img src={product.icon} alt="category icon" className="h-8 w-8" />
      </div>
      <img
        className="w-full h-32 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="px-4 py-2">
        <div
          className="font-semibold text-md mb-1 text-gray-800 flex justify-between items-center"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {product.name}{" "}
          <span className="bg-green-50 rounded-md p-1 text-gray-700 text-sm mt-1 font-semibold inline-block">
            ${product.price}/kg
          </span>
        </div>
        <p className="text-gray-700 text-sm">
          Category: <span className="font-semibold">{product.category}</span>
        </p>
      </div>
      <div className="px-4 py-1">
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
          {product.quantity} kg
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
          {product.deliveryMethod}
        </span>
      </div>
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center mb-2">
          <button
            onClick={openEditModal}
            className="bg-gray-700 hover:bg-gray-000 text-white font-bold py-1 px-4 rounded text-sm mr-2"
          >
            Edit
          </button>
          <button
            onClick={openDeleteModal}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        productId={productId}
        productData={product}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        productId={productId}
      />
    </div>
  );
};

export default ProducerProductCard;

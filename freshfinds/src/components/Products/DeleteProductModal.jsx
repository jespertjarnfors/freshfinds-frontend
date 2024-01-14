/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useProductsUpdated } from "../../contexts/ProductsUpdatedContext";
import Modal from "../Modal";

const DeleteProductModal = ({ isOpen, closeModal, productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setProductsUpdated } = useProductsUpdated();

  const handleDeleteProduct = async () => {
    setIsLoading(true);

    try {
      // Make the DELETE request to remove the product
      const response = await fetch(
        `http://localhost:3000/api/products/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Product deleted successfully");
        setProductsUpdated(true);
        closeModal();
      } else {
        console.error("Failed to delete product. Please try again.");
        console.log("Response Status:", response.status);
        console.log("Response Body:", await response.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Delete Product">
      <p className="text-lg font-semibold text-red-600">
        Are you sure you want to delete this product? This action can't be undone.
      </p>

      {/* Buttons */}
      <div className="mt-9 flex flex-row justify-center space-x-4">
        {/* Delete Product Button */}
        <button
          type="button"
          onClick={handleDeleteProduct}
          className={`btn-2 px-8 py-4 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Deleting Product..." : "Confirm"}
        </button>

        {/* Close button */}
        <button type="button" className="btn px-12" onClick={closeModal}>
          Exit
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;

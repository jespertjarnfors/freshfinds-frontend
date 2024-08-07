import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useProductsUpdated } from "../../contexts/ProductsUpdatedContext";
import LoadingAnimation from "./LoadingAnimation";
import ProductCard from "./ProductCard";
import ProducerProductCard from "./ProducerProductCard";
import SearchBar from "./SearchBar";
import LeftNav from "./LeftNav";
import "./ProductContainer.css";
import beefIcon from "../../assets/icons/beef.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import eggIcon from "../../assets/icons/egg.svg";
import fruitIcon from "../../assets/icons/fruit.svg";
import porkIcon from "../../assets/icons/pork.svg";
import vegetablesIcon from "../../assets/icons/vegetables.svg";

// Mapping category names to corresponding icon images
const categoryIcons = {
  Fruit: fruitIcon,
  Vegetables: vegetablesIcon,
  Eggs: eggIcon,
  Beef: beefIcon,
  Chicken: chickenIcon,
  Pork: porkIcon,
};

const ProductContainer = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState("25km");
  const [showMyProducts, setShowMyProducts] = useState(false);
  const { productsUpdated, setProductsUpdated } = useProductsUpdated();
  const [showLeftNav, setShowLeftNav] = useState(true);
  const [resetSelections, setResetSelections] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  // Creates a dictionary to store seller ratings
  const sellerRatings = new Map();

  // Function to fetch ratings for all sellers and store them in the dictionary
  const fetchSellerRatings = async (sellers) => {
    for (const seller of sellers) {
      if (!sellerRatings.has(seller.userId)) {
        try {
          const response = await fetch(
            `https://freshfinds-backend.vercel.app/api/users/${seller.userId}/average-rating`
          );
          if (response.ok) {
            const data = await response.json();
            sellerRatings.set(seller.userId, data.averageRating); // The API response contains the average rating
          } else {
            console.error("Error fetching seller rating:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching seller rating:", error);
        }
      }
    }
  };

  // Fetch products data from the API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before starting the fetch
        // Check if latitude and longitude are defined
        if (user && user.latitude && user.longitude) {
          // Convert selectedDistance to a number (e.g., "25km" becomes 25)
          const distanceInKm = parseInt(selectedDistance.replace("km", ""));

          const response = await fetch(
            `https://freshfinds-backend.vercel.app/api/products/distance?lat=${user.latitude}&lng=${user.longitude}&distance=${distanceInKm}`
          );

          if (response.ok) {
            const jsonResponse = await response.json();

            await fetchSellerRatings(jsonResponse.data);

            // Transforming the API response to a suitable format for rendering
            const transformedProducts = jsonResponse.data.map((product) => ({
              key: product._id,
              name: product.productName,
              seller: product.username,
              sellerId: product.userId,
              icon: categoryIcons[product.category],
              rating: sellerRatings.get(product.userId) || "4.2", // Use the calculated rating or a placeholder
              image: product.image,
              price: product.price,
              quantity: product.quantity,
              deliveryMethod: product.deliveryMethod,
              category: product.category,
            }));
            setProducts(transformedProducts);
          } else {
            console.error(
              "Error fetching products by distance:",
              response.statusText
            );
          }
        } else {
          console.log(
            "Latitude or longitude undefined. Skipping fetchProducts."
          );
        }
      } catch (error) {
        console.error("Error fetching products by distance:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    /* Call fetchProducts initially and whenever user's location changes, selectedDistance changes,
     or when productsUpdated is set to true */
    fetchProducts();
  }, [selectedDistance, user?.latitude, user?.longitude, productsUpdated]);

  // Handling search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Function to reset highlighted items in Mobile Menu/LeftNav
  const handleReset = () => {
    // Toggle the reset state to trigger the reset functionality
    setResetSelections((prevState) => !prevState);
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setSelectedDeliveryMethod(null);
    setSearchTerm("");
    handleReset();
  };

  // Filtering products based on search term, category, rating, and delivery method
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = searchTerm
      ? product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.seller.toLowerCase().includes(searchTerm)
      : true;

    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    const matchesRating = selectedRating
      ? selectedRating === "Any" ||
        parseFloat(product.rating) >= parseInt(selectedRating.charAt(0))
      : true;

    const matchesDeliveryMethod = selectedDeliveryMethod
      ? product.deliveryMethod === selectedDeliveryMethod
      : true;

    // Check if showMyProducts is true and user is a producer, then filter by seller
    if (showMyProducts && user?.isProducer === "true") {
      return (
        matchesSearchTerm &&
        matchesCategory &&
        matchesRating &&
        matchesDeliveryMethod &&
        product.seller === user.username
      );
    }

    return (
      matchesSearchTerm &&
      matchesCategory &&
      matchesRating &&
      matchesDeliveryMethod
    );
  });

  return (
    <div className="flex">
      <div className="relative md:hidden">
        {/* Filter Button */}
        <button
          className={`absolute top-1/2 z-10 px-2 py-5 border border-gray-300 rounded-r-3xl font-bold text-gray-900 shadow-xl ${
            showLeftNav ? "rounded-b-none" : ""
          }`}
          style={{ backgroundColor: "#FFF9EB" }}
          onClick={() => setShowLeftNav(!showLeftNav)}
        >
          Filter
        </button>
      </div>
      <LeftNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedDeliveryMethod={selectedDeliveryMethod}
        setSelectedDeliveryMethod={setSelectedDeliveryMethod}
        selectedDistance={selectedDistance}
        setSelectedDistance={setSelectedDistance}
        showLeftNav={showLeftNav}
        toggleLeftNav={() => setShowLeftNav(!showLeftNav)}
        resetSelections={resetSelections}
        setResetSelections={setResetSelections}
      />
      <div
        className="flex flex-col w-max md:w-4/5 mr-5 xl:mr-10 ml-5 md:ml-2 xl:ml-5 p-5 xl:p-10 rounded-xl shadow-lg overflow-auto custom-scrollbar"
        style={{ backgroundColor: "#FFEDC2", height: "85vh" }}
      >
        <div className="flex justify-start flex-col-reverse md:flex-row items-center mb-2 md:mb-4">
          <div className="flex flex-row">
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
            <button
              onClick={clearFilters}
              className="text-sm md:text-medium font-semibold underline text-gray-600 ml-2 md:ml-4"
            >
              Clear Filter
            </button>
            {selectedCategory && (
              <div className="bg-gray-200 px-2 py-1 ml-2 rounded-lg hidden lg:block">
                {selectedCategory}
              </div>
            )}
            {selectedRating && (
              <div className="bg-gray-200 px-2 py-1 ml-2 rounded-lg hidden lg:block">
                Rating: {selectedRating}
              </div>
            )}
            {selectedDeliveryMethod && (
              <div className="bg-gray-200 px-2 py-1 ml-2 rounded-lg hidden lg:block">
                Delivery: {selectedDeliveryMethod}
              </div>
            )}
          </div>

          {/* "All Products / My Products toggle buttons (Conditionally rendered for producers) */}
          {user?.isProducer === "true" && (
            <div
              className="ml-auto sm:ml-0 md:ml-9 xl:ml-auto mr-auto md:mr-2 mb-5 md:mb-0 2xl:mr-8 3xl:mr-12 flex items-center shadow-lg rounded-2xl font-semibold text-gray-700"
              style={{ backgroundColor: "#FFF9EB" }}
            >
              <button
                className={`btn-toggle-switch py-2 px-6 md:px-4 rounded-2xl md:text-xs lg:text-base ${
                  showMyProducts ? "text-gray-400" : "border-gray-300 border-2"
                }`}
                style={{
                  backgroundColor: showMyProducts ? "#FFF9EB" : "#FFE7AD",
                }}
                onClick={() => setShowMyProducts(false)}
              >
                All Products
              </button>
              <button
                className={`btn-toggle-switch px-4 md:px-3 py-2 rounded-2xl md:text-xs lg:text-base ${
                  showMyProducts ? "border-gray-300 border-2" : "text-gray-400"
                }`}
                style={{
                  backgroundColor: showMyProducts ? "#FFE7AD" : "#FFF9EB",
                }}
                onClick={() => setShowMyProducts(true)}
              >
                My Products
              </button>
            </div>
          )}
        </div>
        {/* Main Product Container */}
        <div className="flex flex-row flex-wrap -mx-4 justify-center lg:justify-normal">
          
          {/* Show loading animation if products are not loaded */}
          {loading ? (
            <div className="mx-auto mt-24 md:mt-36 xl:mt-40">
            <p className="text-lg text-center font-semibold text-gray-600" style={{
            fontFamily: 'General Sans, sans-serif'
        }}>Finding Products...</p> <LoadingAnimation></LoadingAnimation>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.key}>
                {showMyProducts ? (
                  <ProducerProductCard
                    product={product}
                    productId={product.key}
                    productsUpdated={productsUpdated}
                    setProductsUpdated={setProductsUpdated}
                  />
                ) : (
                  <ProductCard product={product} productId={product.key} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;

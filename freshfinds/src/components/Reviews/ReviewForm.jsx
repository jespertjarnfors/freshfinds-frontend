import { useState, useEffect } from "react";

const ReviewForm = ({ orderId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [targetUsername, setTargetUsername] = useState(""); // Store the target user's username

  useEffect(() => {

    // Fetch the review data by orderId and userId
    const fetchReviewData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reviews/order/${orderId}`
        );
        const data = await response.json();
  
        if (data.result === 200) {
          // If a review exists, populate the form with its data
          const existingReview = data.data;
          setRating(existingReview.rating);
          setReviewText(existingReview.reviewText);
          setReviewData(existingReview);
  
          // Fetch the target user's username based on targetUserId
          if (existingReview.targetUserId) {
            fetchTargetUsername(existingReview.targetUserId);
          }
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Fetch the target user's username based on targetUserId
    const fetchTargetUsername = async (targetUserId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${targetUserId}`
        );
        const userData = await response.json();
  
        if (userData.result === 200) {
          setTargetUsername(userData.data.username);
        }
      } catch (error) {
        console.error("Error fetching target user's username:", error);
      }
    };
  
    fetchReviewData();
  }, [orderId]);  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (you can add more validation as needed)
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    // Create or update the review object
    const reviewObject = {
      rating: rating,
      reviewText: reviewText,
      status: "submitted", // Add the status field
    };

    setIsSubmitting(true);

    try {
      if (reviewData) {
        // If reviewData exists, update the review
        const response = await fetch(
          `http://localhost:3000/api/reviews/update/${reviewData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewObject),
          }
        );

        const data = await response.json();

        if (data.result === 200) {
          // Handle success (you can display a success message to the user)
          console.log("Review updated successfully");
          // Call the onSuccess callback to notify the parent component
          if (onSuccess) {
            onSuccess();
          }
        } else {
          console.error("Error updating review:", data.result);
        }
      } else {
        console.error("Review data is missing. Unable to update.");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-auto ml-4 p-6 shadow-xl bg-white border-2 border-gray-400 rounded-xl">
      <form onSubmit={handleSubmit}>
        {/* Display targetUsername in the form */}
        <p>Reviewing: {targetUsername}</p>

        {/* Rest of the component */}
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            disabled={isLoading} // Disable while loading
          >
            <option value="0">Select Rating</option>
            <option value="1"> 1 - Terrible</option>
            <option value="2"> 2 - Poor</option>
            <option value="3"> 3 - Average</option>
            <option value="4"> 4 - Good</option>
            <option value="5"> 5 - Excellent</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="reviewText"
            className="block text-sm font-medium text-gray-700"
          >
            Review Text
          </label>
          <textarea
            id="reviewText"
            name="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="mt-1 p-2 border rounded-md h-16 w-full"
            rows="4"
            disabled={isLoading} // Disable while loading
          ></textarea>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className={`btn px-4 py-2 ${
              isSubmitting || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting || isLoading}
          >
            {isLoading
              ? "Loading..."
              : isSubmitting
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;

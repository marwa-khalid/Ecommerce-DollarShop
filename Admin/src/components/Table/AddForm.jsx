import React, { useState } from "react";
import "./Modal.css";

const AddForm = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", document.getElementById("title").value);
      formData.append("price", parseFloat(document.getElementById("price").value));
      formData.append("description", document.getElementById("description").value);
      formData.append("category", selectedCategory);
      formData.append("quantity", quantity); 

      const fileInput = document.getElementById("fileInput");
      if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
      }

      formData.append("categories", selectedCategory);

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        onClose();
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title">Add Product</span>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-field">
            <label>Title</label>
            <input type="text" id="title" />
          </div>
          <div className="modal-field">
            <label>Price</label>
            <input type="number" id="price" />
          </div>
          <div className="modal-field">
            <label>Description</label>
            <textarea id="description"></textarea>
          </div>
          <div className="modal-field">
            <label>Quantity</label>
            <input type="number" value={quantity} onChange={handleQuantityChange} />
          </div>
          <div className="modal-field">
            <label>Select Category</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="cosmetics"
                  checked={selectedCategory === "cosmetics"}
                  onChange={handleCategoryChange}
                />
                Cosmetics
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="jewelry"
                  checked={selectedCategory === "jewelry"}
                  onChange={handleCategoryChange}
                />
                Jewelry
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="toys"
                  checked={selectedCategory === "toys"}
                  onChange={handleCategoryChange}
                />
                Toys
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="household"
                  checked={selectedCategory === "household"}
                  onChange={handleCategoryChange}
                />
                House Decor
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="wearables"
                  checked={selectedCategory === "wearables"}
                  onChange={handleCategoryChange}
                />
                Wearables
              </label>
            </div>
          </div>
          <div className="modal-field">
            <label>Choose File</label>
            <input type="file" id="fileInput" />
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;

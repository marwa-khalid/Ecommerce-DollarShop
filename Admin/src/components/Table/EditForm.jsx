import React, { useState ,useEffect} from 'react';
import axios from "axios";
import "./Modal.css";

const EditProductModal = ({ onClose, productId }) => {
  const [productTitle, setProductTitle] = useState(' '); 
  const [productPrice, setProductPrice] = useState(0); 
  const [productDescription, setProductDescription] = useState(' ');
  const [productImage, setProductImage] = useState(' ');
  const [productQuantity, setProductQuantity] = useState(0);
  const [productCategory, setProductCategory] = useState(' '); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        const product = response.data;

        setProductTitle(product.title);
        setProductPrice(product.price);
        setProductDescription(product.description);
        setProductImage(product.image);
        setProductQuantity(product.quantity);
        setProductCategory(product.category);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId]);
  
  const handleEditProduct = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', productTitle);
    formData.append('price', productPrice);
    formData.append('description', productDescription);
    formData.append('quantity', productQuantity);
    formData.append('category', productCategory);
  
    if (productImage instanceof File) {
      formData.append('image', productImage);
    }
    const data = {
      title: productTitle,
      price: productPrice,
      description: productDescription,
      image: productImage,
      quantity: productQuantity,
      category: productCategory, 
     
    };

    console.log(data)
    axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then((response) => {
      window.alert(response.data.message);

        onClose();
    })
    .catch((error) => {
      window.alert(error);
    });
  }

  return (
    <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <span className="modal-title">Edit Product</span>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
      </div>
      <div className="modal-body">
        <div className="modal-field">
            <label>Product Title</label>
            <input
              type="text"
              placeholder="Enter product Title"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Product Price</label>
            <input
              type="number"
              placeholder="Enter product price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Product Description</label>
            <input
              type="text"
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Product Image</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile">
                  {productImage ? (
                    <>
                      Selected file:
                      <img
                        src={`http://localhost:5000/${productImage}`}
                        alt="Selected Image"
                        style={{ maxWidth: '50px', maxHeight: '50px' }}
                      />
                    </>
                  ) : (
                    'Choose file'
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="modal-field">
            <label>Product Quantity</label>
            <input
              type="number"
              placeholder="Enter product quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Product Category</label>
            <div className="radio-group">
            <label className="radio-label">
                <input
                  type="radio"
                  value="cosmetics"
                  checked={productCategory === "cosmetics"}
                  onChange={(e) => setProductCategory(e.target.value)}
                />
                Cosmetics
            </label>
            <label className="radio-label">
                <input
                  type="radio"
                  value="jewelry"
                  checked={productCategory === "jewelry"}
                  onChange={(e) => setProductCategory(e.target.value)}
                />
                Jewelry
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="toys"
                  checked={productCategory === "toys"}
                  onChange={(e) => setProductCategory(e.target.value)}
                />
                Toys
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="household"
                  checked={productCategory === "household"}
                  onChange={(e) => setProductCategory(e.target.value)}
                />
                House Decor
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="wearables"
                  checked={productCategory === "wearables"}
                  onChange={(e) => setProductCategory(e.target.value)}
                />
                Wearables
              </label>
            </div>
          </div>
         
        </div>
      <div className="modal-actions">
        <button variant="secondary" onClick={onClose}>
          Close
        </button>
        <button variant="primary" onClick={handleEditProduct}>
          Update
        </button>
      </div>
    </div>
  </div>
  );
};

export default EditProductModal;
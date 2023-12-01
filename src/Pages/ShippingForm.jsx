import React from "react";
import { useSelector } from "react-redux";
import "../css/ShippingForm.css"; // Import your CSS file
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const ShippingForm = () => {

  const citiesInPakistan = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Gujranwala",
    "Sialkot"
  ];
  
  const provincesInPakistan = [
    "Punjab",
    "Sindh",
    "Balochistan",
    "KPK",
    "AJK",
  ];
  
  const navigate=useNavigate();

  const cart = useSelector((state) => state.cart);
  const [totalBill, setTotalBill] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  
  useEffect(() => {
    const calculateTotalBill = () => {
      let total = 0;
      cart.cartItems.forEach((item) => {
        total += item.price * item.cartQuantity;      
      });
      setTotalBill(total);
      if(total>1000){
        setShippingAmount(0);
      }
      else setShippingAmount(200);
    };

    calculateTotalBill();
  }, [cart]);

  const handleSubmit = () => {
    const ad = `${address}, ${city}, ${state}`;
    navigate(`/cart/ShippingForm/Payment/${ad}`);
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (

    <div className="shipping-container">
      <div className="shipping-card">
        <h2>Shipping Details</h2>
        <form className="shipping-form">
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="hamzarana@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="123 Main St Iqbal Town"
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <div>
          <select id="city" name="city" value={city} 
            onChange={(e) => setCity(e.target.value)} required>
            <option value="" disabled selected>
              Select a city
            </option>
            {citiesInPakistan.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="state">State/Province</label>
          <select id="state" name="state" value={state} 
            onChange={(e) => setState(e.target.value)} required>
            <option value="" disabled selected>
              Select a state/province
            </option>
            {provincesInPakistan.map((province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="zip">ZIP Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder="54800"
            required
            pattern="[0-9]{5}"
          />
        </div>

        <div className="float-right">
          <button className="btn-danger" onClick={handleCancel} type="submit">Cancel</button>
          <button className="btn btn-primary" variant="contained" onClick={handleSubmit} type="submit">Continue to Payment</button>
        </div>

        </form>
      </div>
      <div className="order-summary-card">
  <h2>Order Summary</h2>
  <table>
    <tbody>
      {cart.cartItems.map((item, index) => (
        <tr className="table-row-space" key={index}>
          <td className="px-2">{index + 1}.</td>
          <td className="px-2 position-relative">
            <img
              src={`http://localhost:5000/${item.image}`}
              alt="Product"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="quantity-circle">{item.cartQuantity}</div>
          </td>
          <td className="px-2">{item.title}</td>
          <td className="px-2">Rs {(item.price * item.cartQuantity).toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="discount-section">
    <input type="text" placeholder="Enter discount code" />
    <button>Apply</button>
  </div>
  <div className="subtotal-section">
    <div className="section-label">Subtotal:</div>
    <div className="section-amount">Rs {totalBill.toFixed(2)}</div>
  </div>
  <div className="shipping-section">
    <div className="section-label">Shipping:</div>
    <div className="section-amount">Rs {shippingAmount.toFixed(2)}</div>
  </div>
  <div className="total-section">
  <div className="section-label">Total Bill:</div>
    <div className="section-amount">Rs {(totalBill + shippingAmount).toFixed(2) }</div>
  </div>
</div>

    </div>
  );
};

export default ShippingForm;

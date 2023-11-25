import React from "react";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { useState } from "react";
import { useSelector } from "react-redux";

const OrderScreen = () => {

  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));
  const email = user.email;
  console.log(user)

useEffect(() => {
  if(email){
  axios.get(`http://localhost:5000/api/orders?email=${email}`)
    .then(response => {
      setOrders(response.data);
      
    })
    .catch(error => {
    
    });
  }
}, []);

const columns = [
  {
    name: "rowNumber",
    label: "Order",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <span>{tableMeta.rowIndex + 1}</span>
      ),
    },
  },
  
    {
      name: "products",
      label: "Products",
      options: {
        customBodyRender: (products) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {products.map((product, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.title}
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '20px',
                      height: '20px',
                      background: '#3b3e41',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: "10px",
                      color: '#fff',
                    }}
                    className="p-2">
                    {product.quantity}
                  </div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  {product.title}
                </div>
              </div>
            ))}
          </div>
        ),
      },
    },    
  {
    name: "totalPrice",
    label: "Total Price",
  },
  {
    name: "status",
    label: "Status",
  },
  {
    name: "paymentMethod",
    label: "Payment Method",
  },
  {
    name: "createdAt",
    label: "Order Date",
    options: {
      filter: true,
      sort: true,
    },
  },
];

const options = {
  filter: true,
  search: true,
  selectableRows: "none",
  responsive: "standard",
};

return (
  <div style={{ marginTop: '50px' }}>
    <MUIDataTable 
      title="Orders"
      data={orders}
      columns={columns}
      options={options}
    />
    {/* Additional rendering and buttons */}
  </div>
);

}

export default OrderScreen;

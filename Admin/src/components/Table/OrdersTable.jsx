import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

useEffect(() => {
  axios.get(`http://localhost:5000/api/orders/all`)
    .then(response => {
      setOrders(response.data); 
    })
    .catch(error => {
      window.alert(error);
    });
}, [orders]);

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
    name: "email",
    label: "User Email",

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
    label: "Price",
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
    name: "address",
    label: "Address",
  },
  {
    name: "createdAt",
    label: "Placement",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        const date = new Date(value);
  
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
        return formattedDate;
      },
    },
  },  
];

const options = {
  filter: true,
  responsive: "vertical",
  rowsPerPage: 10,
  selectableRows: 'none',
  rowsPerPageOptions: [10, 25, 50],
};

return (
  <div>
    <MUIDataTable 
      title="Orders"
      data={orders}
      columns={columns}
      options={options}
    />
  </div>
);

}

export default OrdersTable;

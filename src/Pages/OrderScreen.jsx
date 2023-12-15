import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Modal from "@mui/material/Modal";
import '../css/editstatus.css';
import ProductReviews from '../Components/ProductReviews';
import EditIcon from "@mui/icons-material/Edit";

const OrderScreen = () => {

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  const email = user.email;

  useEffect(() => {
    fetchOrders();
  }, [orders]);

  const fetchOrders = () => {
    if(email){
    axios.get(`http://localhost:5000/api/orders?email=${email}`)
      .then(response => {
        setOrders(response.data);
        
      })
      .catch(error => {
      
      });
    }
  }

  const makeStyle = (status) => {
    if (status === "received") {
      return {
        color: "green",
      };
    } else if (status === "cancelled") {
      return {
        color: "red",
      };
    } else if (status === "processing") {
      return {
        color: "orange",
      };
    } else if (status === "dispatched") {
      return {
        color: "blue", 
      };
    } else {
      return {
        color: 'black',
      };
    }
  };

  const handleOrderStatus = (status) => {
    const orderId = selectedOrderId;
    axios.put(`http://localhost:5000/api/orders/${orderId}`, { status }, {
      headers: {
        'Content-Type': 'application/json', 
      },
    })
    .then((response)=>{
        fetchOrders();
      window.alert("updated")
    }).catch((error) =>{

    });
    console.log("Updated order status for:", selectedOrderId);
    // Clear the selected order
    setSelectedOrderId(null);
  };

  const handleAddReview = (productId) => {
    setSelectedProductId(productId);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const columns = [
    {
      name: "_id",
      label: "Id",
      options: {
        display: false
      }
    },
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
      options: {
        customBodyRender: (value, tableMeta) => {
          const orderId = orders[tableMeta.rowIndex]._id
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="status" style={makeStyle(value)}>
                {value}
              </span>

              
              {value === "processing" && (
                <>
                  <EditIcon
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => setSelectedOrderId(orderId)}
                  />
                  {/* Modal */}
                  <Modal open={selectedOrderId === orderId}>
                    <div className="modalEx">
                      <div className="modalContentIn">
                        <p>Do you want to cancel this order?</p>
                        <div className="modalActions">
                          <button className="yes" onClick={() => handleOrderStatus("cancelled")}>Yes</button>
                          <button className="no" onClick={() => setSelectedOrderId(null)}>No</button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </>
              )}

              {value === "dispatched" && (
                <>
                  <EditIcon
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => setSelectedOrderId(orderId)}
                  />
                  {/* Modal */}
                  <Modal open={selectedOrderId === orderId}>
                    <div className="modalEx">
                      <div className="modalContentIn">
                        <p>Have you received this order?</p>
                        <div className="modalActions">
                          <button className="yes" onClick={() => handleOrderStatus("received")}>Yes</button>
                          <button className="no" onClick={() => setSelectedOrderId(null)}>No</button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "paymentMethod",
      label: "Payment",
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
    {
      name: "addReview",
      label: "Add Review",
      options: {
        customBodyRender: (value, tableMeta) => {
          const products = tableMeta.rowData[2]; 
          const status = tableMeta.rowData[4]; 
  
          const productIds = products.map((product) => product.productId);
          if (status === "received") {
            return (
              <div>
                {productIds.length === 1 ? (
                <button
                  style={{ backgroundColor: "#fff", color: "green", fontWeight: "normal" }}
                  onClick={() => handleAddReview(productIds[0])}
                >
                  Rate Product
                </button>
              ) : (
                productIds.map((productId, index) => (
                  <button
                    key={index}
                    style={{ backgroundColor: "#fff", color: "green", fontWeight: "normal" }}
                    onClick={() => handleAddReview(productId)}
                  >
                    Rate Product {index + 1}
                  </button>
                ))
              )}
              </div>
            );
          } else {
            return null;
          }
        },
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
      {isReviewModalOpen && selectedProductId && (
    <Modal open={isReviewModalOpen} onClose={closeReviewModal}>
      <ProductReviews
        productId={selectedProductId}
        onReviewSubmit={() => {
          fetchOrders();
        }}
        onClose={closeReviewModal}
      />
    </Modal>
  )}
    </div>
  );

}

export default OrderScreen;

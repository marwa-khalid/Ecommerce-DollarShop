import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line, Bar} from 'react-chartjs-2';
import 'chart.js/auto';

const MainDash = () => {
  const [orders, setOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [overallSales, setOverallSales] = useState(0);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [dailyCancelledOrders, setDailyCancelledOrders] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    fetchOrderDetails();
  });
  
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders/all");
      const filteredOrders = response.data.filter(order => {
        return (
          order.status !== "cancelled"
        );
      });

      console.log( response.data.reduce((total, item) => total + item.totalPrice, 0))
      setOrders(filteredOrders);
      const filteredCancelledOrders = response.data.filter(order => {
        return (
          order.status === "cancelled"
        );
      });
      setCancelledOrders(filteredCancelledOrders);
      setOverallSales(
        filteredOrders.reduce((total, item) => total + item.totalPrice, 0)
      );

      const dailyOrders = filteredOrders.filter(order => order.createdAt.split('T')[0] === currentDate);
      setDailyOrders(dailyOrders);
      const dailyCancelledOrders = filteredCancelledOrders.filter(order => order.createdAt.split('T')[0] === currentDate);
      setDailyCancelledOrders(dailyCancelledOrders);

    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };  


  const dailyTotalAmount = dailyOrders.reduce((total, order) => total + order.totalPrice, 0);


  return (
    <Container fluid>
      <Row>
        <h2 className="my-4">Overall Analytics</h2>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Overall Sales</Card.Title>
              <Card.Text>
                {overallSales}
              </Card.Text>
              <Line
                data={{
                  labels: orders.map(order => new Date(order.createdAt).toLocaleDateString('en-US')),
                  datasets: [{
                    label: 'Overall Sales',
                    data: orders.map(order => order.totalPrice),
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    lineTension: 0.1,
                  }],
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Overall Orders</Card.Title>
              <Card.Text>
                {orders.length + cancelledOrders.length}
              </Card.Text>
              <Bar
                data={{
                  labels: ['Orders'],
                  datasets: [{
                    label: 'Overall Orders',
                    data: [orders.length],
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                  },
                  {
                    label: 'Cancelled Orders',
                    data: [cancelledOrders.length],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                  },
                ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <h2 className="my-4">Daily Analytics</h2>
       
         <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Daily Sales</Card.Title>
              <Card.Text>
                {dailyTotalAmount}
                <Line
                  data={{
                    labels: dailyOrders.map(order => new Date(order.createdAt).toLocaleDateString('en-US')),
                    datasets: [{
                      label: 'Daily Sales',
                      data: dailyOrders.map(order => order.totalPrice),
                      fill: false,
                      backgroundColor:'rgba(75,192,192,1)',
                      borderColor: 'rgba(75,192,192,1)',
                      lineTension: 0.1,
                    }],
                  }}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Daily Orders</Card.Title>
              <Card.Text>
                {dailyOrders.length + dailyCancelledOrders.length}
                <Bar
                data={{
                  labels: ['Orders'],
                  datasets: [{
                    label: 'Overall Orders',
                    data: [dailyOrders.length],
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                  },
                  {
                    label: 'Cancelled Orders',
                    data: [dailyCancelledOrders.length],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                  },
                ],
                }}
              />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row> 
    </Container>
  );
};

export default MainDash;

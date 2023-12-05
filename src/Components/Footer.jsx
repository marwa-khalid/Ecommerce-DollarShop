import React from 'react';
import "../css/footer.css"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-dark">
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <li><Link to="/product">Product Browsing</Link></li>
                  <li><Link to="/Franchise">Franchising</Link></li>
                  <li><Link to="./Contact">24/7 Customer Service</Link></li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <li>Company</li>
                  <li>Team</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div className="col-md-6 item text">
                <h3>DollarWala</h3>
                <p> We have a wide range of more than 1500 products of all the above categories, and the unique thing is that all the above items are only for 1$. We feel satisfied when customers curiously ask, "Is this product really for 1$ Only?</p>
              </div>
            </div>
            <p className="copyright">DollarWala © 2023</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;

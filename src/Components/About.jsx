import React from 'react';
import image1 from "../images/image1.jpeg";
import image2 from "../images/image2.jpeg";
import image3 from "../images/image3.jpg";
import '../css/About.css';

const About = () => {
  return (
    <div className="mt-5 mb-5">
      <div className='container'>
        
        <div className='row'>
          <div className='col-md-6'>
            <h1 className='me-2'>About Us</h1>
            <p>We deal in Cosmetics, Jewelry, Crockery, Mobile accessories, Men accessories, Decoration, Birthday Items, Toys, Kitchen Items, Household products, Perfumes, Birthday Items, Stylish Stationery, Sunglasses, Keychains, Ladies undergarments & much more. We have a wide range of more than 1500 products of all the above categories, and the unique thing is that all the above items are only for 1$. We feel satisfied when customers curiously ask, "Is this product really for 1$ Only?"</p>
          </div>
          <div className='col-md-6'   >
            <div className="row">
              <div className="col" style={{ display: 'flex' }}>
                <div className="img-container" style={{ height: '100%', width:'100%', display: 'flex', flexDirection: 'column' }}>
                  <img src={image1} alt="Image 1" className="img-fluid" style={{ flex: '2' }} />
                </div>
              </div>
              <div className="col">
                <img src={image2} alt="Image 2" className="img-fluid" />
                <img src={image3} alt="Image 3" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

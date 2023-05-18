import React from "react";

import background from "../images/bg1.jpg";

const Banner = () => {
  return (
    <div className="hero">
      <div className="card bg-dark text-white border-0">
        <img src={background} className="card-img" alt="background" height="550px" />
        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <div className="container ms-1 mt-0">
          <h5 className="card-title display-3 fw-bolder mb-0">Everything for 1$</h5>
          <p className="card-text lead fs-2">
            Shop Now
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import StarRating from '../Components/StarRating';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]); 
  const numberOfReviews = reviews.length;
  const [averageRating, setAverageRating] = useState(0); 

  const scrollToDivRef = React.useRef(null);

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleScrollToDiv = () => {
    if (scrollToDivRef.current) {
      scrollToDivRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();

    const getReviews = async () => {
      
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`);
      const reviewData = await response.json();
      setReviews(reviewData);
      if (reviewData.length > 0) {
        const totalRating = reviewData.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviewData.length;
        setAverageRating(averageRating);
      } else {
        setAverageRating(0);
      }
    };
    getReviews();

  }, [id]);

  const Loading = ()=>{
    return(
        <>
        <div className="col-md-6">
          <Skeleton height={400}/>
        </div>
        <div className="col-md-6" style={{lineHeight:2}}>
        <Skeleton height={50} width={300}/>
        <Skeleton height={75}/>
        <Skeleton height={25} width={150}/>
        <Skeleton height={50}/>
        <Skeleton height={150}/>
        <Skeleton height={50} width={100}/>
        <Skeleton height={50} width={100} style={{marginLeft:6}}/>

        </div>
        </>
    )
   };

   const ShowProduct = () =>{
    return(
    <>
      <div className="col-md-6">
      <img
        src={`http://localhost:5000/${product?.image}`}
        alt={product?.title}
        height="400px"
        width="400px"
      />
          </div>
          <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">
          {product?.category}
          </h4>
          <h1 className="display-5">{product?.title}</h1>
          <p className="lead fw-bold">
           {averageRating.toFixed(1)} out of ({numberOfReviews}) 
            <a href="#" style={{textDecoration:"none"}} onClick={handleScrollToDiv}>
               { } Reviews
            </a>
          </p>
          <h3 className="display-8 fw-bold my-4">
          Rs {product?.price}
          </h3>
          <p className="lead">{product?.description}</p>
          <button className="btn btn-outline-dark px-4 py-2" onClick={ ()=> handleAddToCart(product)} >Add to Cart</button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2" >Go to Cart</NavLink>
          
          </div>
        </>
    )};

  return (
    <div className="container py-5">
      <div>
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>

      <div ref={scrollToDivRef}>
        <div className="container">
          <h5 className='row'>Product Reviews</h5>
          {reviews && reviews.length > 0 ? (
            <div className="row">
              {reviews.map((review) => (
                <div className="col-md-4 p-2" key={review._id}>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">{review.reviewText}</h5>
                      <StarRating rating={review.rating} />
                      <p className="card-text">{review.customerName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            ) : (
           <p>No reviews available for this product.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;


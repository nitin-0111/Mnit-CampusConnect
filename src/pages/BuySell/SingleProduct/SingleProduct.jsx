import React, { useEffect, useState } from 'react';
import './SingleProduct.css';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../env';
import axios from 'axios';

const SingleProduct = () => {
  const { productId } = useParams();
const [product, setProduct] = useState(null);
const [selectedImage, setSelectedImage] = useState(null);
const [userId, setUserId] = useState(null);
const [user, setUser] = useState(null); // Initialize with null
useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res1 = await axios.get(BASE_URL + `/Product/getProduct/${productId}`);
      const fetchedProduct = res1.data; // Store fetched product data in a variable
      setProduct(fetchedProduct);
      setSelectedImage(fetchedProduct.images[0]);
      setUserId(fetchedProduct.userId); // Use fetchedProduct.userId directly
      console.log("product", fetchedProduct);
      console.log("userId", fetchedProduct.userId); // Log fetchedProduct.userId

      if (fetchedProduct.userId) {
        const res2 = await axios.get(BASE_URL + `/auth/myInfo/${fetchedProduct.userId}`);
        setUser(res2.data);
        console.log("userinfo", res2.data);
      }
    } catch (error) {
      // Handle error
    }
  };

  fetchProduct();
}, [productId]); // Add productId as a dependency to trigger useEffect when it changes


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  return (
    <>
      {product ?
        <div id="singleProduct" style={{
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}>
          <section id="prodetails" className="section-p1">
            <div className="single-pro-image">
              <img src={selectedImage} width="100%" id="MainImg" alt="Product_Image" />
              <div className="small-img-group">
                {product.images.map((index) => (
                  <div className="small-img-col" key={index} onClick={() => handleImageClick(index)}>
                    <img
                      src={index}
                      width="100%"
                      className="small-img"
                      alt="Not uploaded by onwer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="single-pro-details">
              <h2>{product.title}</h2>
              <h2>₹ {product.price}</h2>
              <hr />
              <h2>Contact Details</h2>
               {user?<> <span> {user?.Mobile}</span>
               <span> {user?.Email}</span>
               </>:null}
              <hr />
              <h2>Product Details:</h2>
              <p>
                {product.description}
              </p>
            </div>

          </section>
        </div> :
        <>
          <h2> Loading..</h2>
        </>
      }
    </>

  );
};

export default SingleProduct;

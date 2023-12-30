import React, { useEffect, useState } from 'react';
import './SingleProduct.css';
import { useParams } from 'react-router-dom';
import customFetch from '../../../utils/axios';
import { showErrorToast } from '../../Auth/Warning/ErrorToast';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  const [user, setUser] = useState(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const [openDialog, setOpenDialog] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res1 = await customFetch.get(`/Product/getProduct/${productId}`);
        const fetchedProduct = res1.data; // Store fetched product data in a variable
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]);
        setUser(fetchedProduct.ownerInfo);
        console.log("product", fetchedProduct);
      } catch (error) {
        // Handle the error if needed
        showErrorToast("Error in Fetching this Product")
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleInterestClick = async () => {

    //TODO: backend Beat version send Email to owner
    setOpenDialog(true)
   }

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
              <h2>Product Details:</h2>
              <p>
                {product.description}
              </p>
              <hr />
              {user && <>
                <Button variant="contained" color="primary" onClick={handleInterestClick}>
                  Interested in Buy
                </Button>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>Contact Information</DialogTitle>
                  <DialogContent>
                    <Typography>Email: {user?.Email}</Typography>
                    <Typography>Mobile: {user?.Mobile}</Typography>
                  </DialogContent>
                </Dialog>
              </>}
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

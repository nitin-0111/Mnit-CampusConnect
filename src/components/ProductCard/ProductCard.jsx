import React, { useEffect, useState } from 'react';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';


import { useSelector } from 'react-redux';
import customFetch from '../../utils/axios';


const ZoomOnHover = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  '&:hover img': {
    transform: 'scale(1.2)',
    transition: 'transform 0.3s ease-in-out',
    width: '110%',
    minHeight:'350px',
    height: '110%',
    cursor: 'pointer',
  },
}));

export default function ProductCard({ product }) {
  const { isLoading, user } = useSelector((store) => store.auth);
 const userId=user.userId;
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(product.likes.includes(userId));
    setLikeCount(product.likes.length);
  }, [userId, product.likes])

  const handleLikeClick = async() => {
    try {
       await customFetch.patch(`/Product/like/${product._id}`, { userId: userId });
    } catch (err) {
        
    }
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };


  return (
    <Card sx={{ maxWidth: 350, minWidth: 350, bgcolor: "#fff", border: 1, borderColor: "gray", boxShadow:" 0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <ZoomOnHover>
        <CardMedia
          component="img"
          src={product.images[0]}
          alt=""
          sx={{
            height:'300px',
            width:'350px',
            textAlign: 'center',
            margin: 'auto',
          }}
          onClick={() => window.location.href = `/singleProduct/${product._id}`}
        />
      </ZoomOnHover>
      <CardHeader title={product.title} style={{ cursor: 'pointer' }}  onClick={() => window.location.href = `/singleProduct/${product._id}`}/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
       { product.description.length>125?`${product.description.slice(0, 125)} ...`:`${product.description}`}
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <IconButton onClick={handleLikeClick} color={isLiked ? 'primary' : 'default'}>
          {isLiked ? <Favorite /> : <FavoriteBorder />}
          {likeCount>0 && likeCount}
        </IconButton>
        <Typography variant="h5" color="text.secondary">
          Price: ₹{parseInt(product.price)}
        </Typography>
      </CardActions>
    </Card>
  );
}
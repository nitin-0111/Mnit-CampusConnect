import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../../assets/img/error.png';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='full-page'>
      <img src={NotFoundImage} alt='not found' />
      <h3>Ohh! Page Not Found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to='/'>back home</Link>
    </div>
  );
};

export default NotFound;

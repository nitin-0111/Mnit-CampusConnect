import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {  useLocation, Link } from 'react-router-dom';
import Spinner from "./Warning/Spinner";
import Success from './Warning/Success';
import Error from './Warning/Error';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../env';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const VerifyEmail = () => { 
 
   const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const {isLoading} = useSelector(
    (state) => state.auth
  )
  const query=useQuery();
   
  const verifyToken=async()=>{
    setLoading(true);
    try{
        const { data } = await axios.post(BASE_URL+'/auth/verify-email', {
            verificationToken: query.get('token'),
            email: query.get('email'),
          });
          toast.success("Verified Email Please Login", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    } catch(error){
      setError(true);
        const {msg}=error.response.data || 'There was an error';
        toast.error(msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    }
    setLoading(false);
  }

  useEffect(()=>{
    if (!isLoading) {
      verifyToken();
    }

  },[]);
  if (loading) {
    return (
      <Spinner/>
    );
  }

  if (error) {
    return (
      <Error/>
    );
  }
  return (
   <Success/>
  )
}


export default VerifyEmail
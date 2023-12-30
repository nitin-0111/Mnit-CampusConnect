import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import Spinner from "./Warning/Spinner";
import Success from './Warning/Success';
// import Error from './Warning/Error';
// import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../env';
import { customToast } from '../../components/Toaster/CustomToast';
import customFetch from '../../utils/axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {

  //  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const query = useQuery();
  const verifyToken = async () => {
    setLoading(true);
    try {
      const { data } = await customFetch.post('/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });

      customToast("success", { msg: "Verified Email Please Login", time: 3000 });
    } catch (error) {

      customToast("success", { msg: "Verified Email Please Login", time: 3000 });
    }
    setLoading(false);
  }


  useEffect(() => {
    verifyToken();
  }, []);

  return (
    loading ? <Spinner /> : <Success />
  );

}


export default VerifyEmail
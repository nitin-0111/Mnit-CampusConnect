import React, { useEffect, useState } from 'react'
import Filter from '../Filter/Filter.jsx'
import Products from '../Products/Products'
import { Box, Stack } from '@mui/material'

import customFetch from '../../../utils/axios.js'
// import axios from 'axios'

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await customFetch.get(  '/Product/allProducts', {
          params: {
            categories: categories,
            sortBy: sortBy,
          },
        });
        setProductsData(response.data.products);
      } catch (error) {

      }
    }
    fetchProducts();
  }, [categories, sortBy])
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <Box>
      <Stack direction="row" justifyContent={'space-betweeen'}>
        <Box sx={{ position: 'sticky', top: '0' }}>
          <Filter categories={categories} setCategories={setCategories} sortBy={sortBy} setSortBy={setSortBy} />
        </Box>
        <Box sx={{ maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}>
          <Products productsData={productsData} />
        </Box>
      </Stack>
    </Box>
  )
}

export default Home

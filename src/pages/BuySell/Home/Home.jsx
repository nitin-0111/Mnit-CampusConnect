import React, { useEffect, useState } from 'react'
import Filter from '../Filter/Filter.jsx'
import Products from '../Products/Products'
import { Box, Drawer, IconButton, Stack, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import customFetch from '../../../utils/axios.js'
// import axios from 'axios'

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [productsData, setProductsData] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:650px)');
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await customFetch.get('/Product/allProducts', {
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
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent={'space-betweeen'}>
        {isSmallScreen && (<IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon
            style={{
              position: "fixed",
              top: 70,
              left: 15,
              zIndex: 1000,
              color:'white',
              backgroundColor:'black',
              borderRadius:'25%',
            }} />
        </IconButton>)}
        {isSmallScreen ? (
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <Filter categories={categories} setCategories={setCategories} sortBy={sortBy} setSortBy={setSortBy} />
          </Drawer>
        ) : (
          <Box sx={{ position: 'sticky', top: '0', flex: '1', minWidth: 'calc(270px)' }}>
            <Filter categories={categories} setCategories={setCategories} sortBy={sortBy} setSortBy={setSortBy} />
          </Box>
        )}
        <Box sx={{ maxHeight: 'calc(100vh - 70px)', overflowY: 'auto', flex: '5' }}>
          <Products productsData={productsData} />
        </Box>
      </Stack>
    </Box>
  )
}

export default Home

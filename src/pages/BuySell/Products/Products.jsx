import React from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
const Products = ({ productsData }) => {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("/addProduct");
  };
  return (
    <Box
      flex={4}
      borderTop={9}
      borderRight={9}
      borderLeft={9}
      borderColor="lightgrey"
    >
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        padding={2}
        justifyContent="space-evenly"
      >
        {productsData.slice(0, 50).map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </Box>
      <Tooltip title="Add Product">
        <Fab color="primary" style={{ position: "fixed", bottom: 16, right: 35 }} onClick={handleAddProduct}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default Products;

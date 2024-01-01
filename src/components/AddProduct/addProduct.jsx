import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

import { Avatar, Button, Paper } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import Autocomplete from "@mui/material/Autocomplete";

import Dropzone from "./DropZone";
import ProductDescription from "./Description";

import { useSelector } from "react-redux";
import customFetch from "../../utils/axios";

function AddProduct() {
  const { isLoading, user } = useSelector((store) => store.auth);
  const userId = user.userId;
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({});
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
    category: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';
    if (name === 'price') {
      const priceValue = parseFloat(value);
      if (isNaN(priceValue) || priceValue < 50 || priceValue > 15000) {
        errorMessage = 'Price must be between 50 and 15000';
      }
      setError((prevError) => ({
        ...prevError,
        [name]: errorMessage
      }));
    }
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    })
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productData.price < 50) {
      alert("Enter a valid price between 50 to 15000!");
      return;
    }
    // console.log("ProductData: ", productData);
    // 1. upload img

    if (!files?.length) {
      alert("Add atleast one image");
      return;
    }
    setDisable(true);
    const uploadPromises = files?.map(async (file, index) => {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("name", (Date.now() + file.name + index));

      try {
        const response = await customFetch.post(
          "/Product/uploadImg",
          formData
        );
        // Assuming the backend returns an array of URL strings, push it to the results array
        return response.data.url;
      } catch (error) {
        console.log(error);
        // Handle error if needed, and return a placeholder or null URL
        return null;
      }
    });
    let results;
    try {
      results = await Promise.all(uploadPromises);
      // console.log("Uploaded URLs: ", results);
      // Do something with the array of URL strings returned by the backend
    } catch (error) {
      console.log("Error uploading files:", error);
      // Handle error if needed
    }

    // console.log("URLS", results);
    // 2. Product mongoDB

    const product = {
      title: productData.title,
      desc: productData.description,
      images: results,
      price: productData.price,
      category: productData.category,
      userId,
    };
    // console.log(product);
    try {
      await customFetch.post("/Product/addProduct", product);
      // tositfied...
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setDisable(false);
  };
  return (
    <Paper elevation={3} style={paperStyle}>
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <AddCircleOutlineOutlinedIcon />
        </Avatar>
        <h1 className="text-3xl font-bold m-5">Add Product</h1>
      </Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          type="text"
          placeholder="Title"
          style={TextFieldStyle}
          name="title"
          value={productData.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          style={TextFieldStyle}
          placeholder="Enter Price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          error={!!error.price}
          helperText={error.price || ''}
          required
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={itemlist}
          getOptionLabel={(option) => option.label || ''}
          renderInput={(params) => (
            <TextField
              // required
              {...params}
              fullWidth
              label="Category"
              placeholder="Enter Category"
              style={TextFieldStyle}
            />
          )}
          name="category"
          value={itemlist.find(
            (option) => option.label === productData.category) || null
          }
          onChange={(event, newValue) => {
            handleChange({
              target: {
                name: "category",
                value: newValue ? newValue.label : null,
              },
            });
          }}
        />
        <h1 className="title text-3xl text-blue-600  font-bold mt-5 ">
          Upload Images
        </h1>
        <Dropzone
          className="p-16 mt-10 border border-neutral-200"
          files={files}
          setFiles={setFiles}
          onChange={handleChange}
          value={productData.images}
          name="image"
        />
        <ProductDescription
          description={productData.description}
          setDescription={(newDescription) => setProductData({ ...productData, description: newDescription })}
        />
        <Button
          variant="contained"
          color="success"
          disabled={disable}
          type="submit"
          style={{ width: "50vh" }}
        >
          {!disable ? "Add Product" : <CircularProgress color="inherit"  size={24}/>}
        </Button>

      </form>
      <p>**Once this product is sold out please about it to us at <b>campusconnect.social@gmail.com</b> so that we could remove it from here.</p>
    </Paper>
  );
}

const itemlist = [
  { label: "Books" },
  { label: "Cooler" },
  { label: "Cycle" },
  { label: "Electronics/Gadgets" },
  { label: "Tools" },
  { label: "Other" },
];

const paperStyle = { padding: "30px 20px", width: "90%", margin: "20px auto", border: "5px solid #3498db" };
const avatarStyle = { backgroundColor: "#1bbd7e" };
const TextFieldStyle = { margin: 7 };
export default AddProduct;
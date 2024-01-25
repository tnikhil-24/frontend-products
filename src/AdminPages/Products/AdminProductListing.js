import React,{useEffect, useState} from "react";
import ProductCatList from "./ProductCatList";
import ProductPreviewCard from "./ProductPreviewCard";
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../Products/productSlice'
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

function AdminProductListing() {

const dispatch=useDispatch()
useEffect(()=>{
  dispatch(fetchProducts());
},[dispatch])

const status =useSelector(state=>state.products.status)
const products=useSelector(state=> state.products.value)
const [productToEdit,setProductToEdit]=useState({});
  return (
    <div className="grid md:grid-cols-5 sm:grid-cols-1">
      <div className="md:col-span-1">
        <ProductCatList />
      </div>
      {status === 'loading' &&
              <div>Loading....</div>
  }
    {status === 'succeeded' &&
      <div className="md:col-span-4">
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-indigo-950 text-center">
              Products
            </h2>
          </div>
          

          <div className="flex flex-row-2">
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                freeSolo
                id="product-search"
                disableClearable
                options={products.map((option) => option.prodTle+"-"+option.brnd)}
                onChange={(e,value)=>{
                  var productSelected=products.filter((product)=>product.prodTle+"-"+product.brnd === value)
                  setProductToEdit(productSelected[0])
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search..."
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Stack>
            {Object.keys(productToEdit).length !=0 &&
            <Link
                    to="/edit-product"
                    state={productToEdit}
                    className=" inline items-center justify-center rounded-md bg-indigo-950 px-5 py-2 ml-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <EditIcon />
                  </Link>}
          </div>
        </div>
        <ProductPreviewCard/>

      </div>
}  
    </div>
  );
}

export default AdminProductListing;

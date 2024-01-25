import React, { useEffect, useState } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import WcIcon from "@mui/icons-material/Wc";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import options from "../Resources/Sizes.json";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { indigo } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getTokenFromCookies } from "../AdminPages/cookieUtils";
function EditProduct() {
  const navigate = useNavigate();
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const location = useLocation();
  const product = location.state;
  console.log(product);
  const [price, setPrice] = useState(product.cst);
  const [discount, setDiscount] = useState(product.discnt);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(new Map());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [response, setResponse] = useState();

  useEffect(() => {
    console.log(typeof product.qnty);
    const resultMap = new Map(Object.entries(product.qnty));
    Object.keys(resultMap).forEach((key) => {
      resultMap[key] = 0;
    });
    setQuantity(resultMap);
  }, []);
  const handleQuantityChange = (key, newValue) => {
    quantity.set(key, newValue);
    setQuantity(quantity);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (size !== "")
      setQuantity((prevQuantity) => new Map(prevQuantity.set(size, 0)));
    setSize(""); // Clear the size state after adding
    console.log(quantity);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let formData = new FormData();
      let prod = {
        cst: price,
        qnty: Array.from(quantity),
        discnt: discount,
        prdCat: product.prdCat,
        prdId: product.prdId,
      };
      console.log(prod);
      formData.append("product", JSON.stringify(prod));
      const jwt = getTokenFromCookies();
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      const request = await axios.post(
        "https://localhost:9000/api/product/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setResponse(await request.data);
      navigate("/products");
    } catch (error) {
      console.log(error);
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setResponse(error.message);
    }
  };

  return (
    <div className="flex sm:flex-row flex-col">
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto my-4 lg:py-0 rounded-lg ">
        <form onSubmit={handleSubmit}>
          <div class="space-y-10">
            <div class="border-gray-900/10 pb-12">
              <h2 class="text-center font-bold leading-7 text-2xl text-indigo-950">
                Add Stock
              </h2>
              <p class="mt-1 text-sm leading-6 text-gray-600 text-center">
                Additional stock can be added and selling price of the product
                can be changed.
              </p>
            </div>
          </div>
          <div class="mt-4 py-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t">
            <div className="sm:col-span-3">
              <label
                for="size"
                class="block text-sm font-medium leading-6 text-indigo-950"
              >
                Size
              </label>
              <Autocomplete
                id="grouped-demo"
                options={options}
                groupBy={(option) => option.group}
                getOptionLabel={(option) => option.title}
                onChange={(e, v) => setSize(v ? v.title : "")}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            class="rounded-md bg-indigo-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-950"
          >
            Add Size
          </button>

          <div class="mt-4 py-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t">
            {Array.from(quantity).map(([key, value]) => (
              <div className="sm:col-span-3">
                <div class="relative mt-2 rounded-md shadow-sm">
                  <label
                    for="price"
                    class="block text-sm font-medium leading-6 text-indigo-950"
                  >
                    {key}
                  </label>
                  <input
                    type="text"
                    name="price"
                    onChange={(e) => {
                      e.preventDefault();
                      handleQuantityChange(key, e.target.value);
                    }}
                    class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-indigo-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            ))}
          </div>
          <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b pb-4">
            <div className="sm:col-span-3">
              <label
                for="price"
                class="block text-sm font-medium leading-6 text-indigo-950"
              >
                Price (M.R.P)
              </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="text"
                  name="price"
                  placeholder={product.cst}
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-indigo-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                for="price"
                class="block text-sm font-medium leading-6 text-indigo-950"
              >
                Discount (On M.R.P)
              </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-gray-500 sm:text-sm">%</span>
                </div>
                <input
                  type="text"
                  name="price"
                  placeholder={product.discnt}
                  onChange={(e) => setDiscount(e.target.value)}
                  id="price"
                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-indigo-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div class="mt-6 flex items-center justify-end gap-x-6 mb-6">
            <button
              type="button"
              class="text-sm font-semibold leading-6 text-indigo-950"
            >
              Cancel
            </button>
            <button
              class="rounded-md bg-indigo-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-950"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap py-12 sm:py-16 sm:w-1/3">
        <div class="container mx-auto px-4">
          <div class="max-w-xl overflow-hidden rounded-lg ">
            <img
              class="h-40 overflow-hidden rounded-xl"
              src={product.img}
              alt="Product Image"
            />
          </div>
          <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 class="sm: text-2xl font-bold text-indigo-950 sm:text-3xl">
              {product.prodTle}
            </h1>
            <div class="flex items-end">
              <span class="text-3xl font-bold text-slate-900">
                ₹{parseInt(price * (1 - discount / 100))}
              </span>
              {discount != 0 && (
                <div>
                  <span class="text-sm text-slate-900 line-through">
                    ₹{price}
                  </span>
                  <span class="m-2 rounded-full bg-indigo-950 px-2 text-center text-sm font-medium text-white">
                    {discount}% OFF
                  </span>
                </div>
              )}
            </div>
            <p class="sm: text-md font-semibold text-indigo-950 sm:text-md py-4 border-t">
              Size
            </p>
            <div className="flex flex-row space-x-2 flex-wrap ">
              {Array.from(quantity).map(([key, value]) => (
                <button
                  type="button"
                  key={key}
                  class="text-indigo-950 focus:bg-indio-950 bg-white border border-gray-300 focus:outline-none hover:bg-purple-100 focus:ring-4 focus:ring-indigo-950 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                >
                  {key}
                </button>
              ))}
            </div>
            <div class="flex flex-col items-center justify-between space-y-4 border-b py-4 sm:flex-row sm:space-y-0">
              <button
                type="button"
                class="inline-flex  justify-evenly rounded-md border-2 border-transparent bg-indigo-950 bg-none px-12 py-3 text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                <AddShoppingCartIcon />
                <p>Add To Cart</p>
              </button>
            </div>
            <ul class="mt-4 pb-4 space-y-2 border-b">
              <li class="flex items-center text-left text-sm font-medium text-gray-600">
                {product.gndr == "Male" ? (
                  <MaleIcon sx={{ color: indigo[900] }} />
                ) : product.gndr == "Female" ? (
                  <FemaleIcon sx={{ color: indigo[900] }} />
                ) : (
                  <WcIcon sx={{ color: indigo[900] }} />
                )}
                <p className="pl-4">{product.gndr}</p>
              </li>
            </ul>
          </div>
          <div class="lg:col-span-3">
            <div class="mt-2 flow-root sm:mt-4">
              <h1 class="text-xl font-bold text-indigo-950">Description</h1>
              <p class="mt-4">{product.desc}</p>
            </div>
          </div>
          <ul class="mt-4 pt-4 pb-4 space-y-2 border-t">
            <li class="flex items-center text-left text-sm font-medium text-gray-600">
              <LocalShippingIcon sx={{ color: indigo[900] }} />
              <p className="pl-4">Shipping in India</p>
            </li>
          </ul>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <div>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {response}
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
}

export default EditProduct;

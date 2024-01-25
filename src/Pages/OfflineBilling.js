import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getTokenFromCookies } from "../AdminPages/cookieUtils";
function OfflineBilling() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  let [type, setType] = useState();
  let [prod, setProd] = useState(null);
  let [product, setProduct] = useState();
  let [quantity, setQuantity] = useState(1);
  let [size, setSize] = useState();
  let [totalPrice, setTotalPrice] = useState(0);
  let [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [response, setResponse] = useState();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const productsToSelect = useSelector((state) => state.products.value);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(size);
    if (product.qnty.get(size) >= quantity) {
      setProducts((prev) => [
        ...prev,
        {
          prdId: product.prdId,
          price: parseInt(product.cst * (1 - product.discnt / 100)),
          quantity: quantity,
          size: size,
          img: product.img,
        },
      ]);
      setTotalPrice(
        totalPrice +
          parseInt(product.cst * (1 - product.discnt / 100)) * quantity
      );
      console.log(totalPrice);
    }
    setQuantity(1);
    setProduct(null);
    console.log(products);
  }; //adding product to checklist

  const handleDec = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(--quantity);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProduct({ ...prod, qnty: new Map(Object.entries(prod.qnty)) });
  }; //selecting and save the product

  const handleRemove = (x) => {
    setProducts((y) => y.filter((z) => z.prdId !== x.prdId));
    setTotalPrice(totalPrice - x.price * x.quantity);
  };

  const handleInc = () => {
    //write logic for checking quantity
    setQuantity(++quantity);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      let order = { cst: totalPrice, products: products };
      console.log(order);
      formData.append("order", JSON.stringify(order));
      const jwt = getTokenFromCookies();
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      const request = await axios.post(
        "https://localhost:9000/api/offlineorders/place",
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
      window.location.reload();
    } catch (error) {
      console.log(error);
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setResponse(error.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-full bg-white">
      <div className="flex flex-col pl-4 pt-6">
        <div class="rounded-lg shadow-xl p-4 border-gray-900/10">
          <h2 class="text-base font-semibold leading-7 text-gray-900 ">
            Offline Billing
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Select the product, it's size and quantity
          </p>
          <form className="py-6" onSubmit={handleSave}>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="product-search"
                disableClearable
                options={productsToSelect.map(
                  (option) => option.prodTle + "-" + option.brnd
                )}
                onChange={(e, value) => {
                  var productSelected = productsToSelect.filter(
                    (product) => product.prodTle + "-" + product.brnd === value
                  );
                  setProd(productSelected[0]);
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
            <div class="mt-6 flex items-center justify-end gap-x-6 mb-6">
              <button
                type="submit"
                class="rounded-md bg-indigo-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-950"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        {product != null && (
          <div className="rounded-lg shadow-xl mt-4 p-4 border-gray-900/10">
            <div className="flex items-end justify-between pt-4">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.img}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pb-8">
                {parseInt(product.cst * (1 - product.discnt / 100))}
              </div>
            </div>

            <div className="flex flex-1 flex-col pt-4 space-y-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>{product.prodTle}</h3>
                <div class="sm:order-1">
                  <div class="mx-auto flex h-8 items-stretch text-gray-600">
                    <button
                      onClick={handleDec}
                      class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                    >
                      -
                    </button>
                    <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                      {quantity}
                    </div>
                    <button
                      onClick={handleInc}
                      class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm ">
                <div class="mt-2">
                  <select
                    id="country"
                    onChange={(e) => setSize(e.target.value)}
                    name="country"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Select Size</option>
                    {Array.from(product.qnty).map(([key, value]) => (
                      <option key={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div className="flex p-1">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="font-medium text-indigo-950 hover:text-indigo-800"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-4 py-6 sm:px-6">
        <div className="flex-1 h-full flex-col overflow-y-auto bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <p className="text-lg font-medium text-gray-900">Product List</p>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((x) => {
                    const pro = x;
                    return (
                      <li key={pro.prdId} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={pro.img}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-end text-base font-medium text-gray-900">
                              <p className="ml-4">
                                {pro.price} x {pro.quantity}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {pro.size}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {pro.quantity}</p>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => handleRemove(pro)}
                                className="font-medium text-indigo-950 hover:text-black"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>{totalPrice}</p>
            </div>
            <div className="mt-6">
              <a
                onClick={handleCheckout}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-950 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black"
              >
                Checkout
              </a>
            </div>
          </div>
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

export default OfflineBilling;

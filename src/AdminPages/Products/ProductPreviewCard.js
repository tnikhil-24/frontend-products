import React from "react";
import { useSelector } from "react-redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from "react-router-dom";
function ProductPreviewCard() {
  const products = useSelector((state) => state.products.value);
  const category = useSelector((state) => state.category.value);
  var filteredProducts = products;
  if (category != "") {
    filteredProducts = products.filter(
      (product) => product.prdCat2 === category
    );
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="mt-0 grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.prdId} className="group relative">
              <div className="relative m-2 mt-2 flex w-72 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                  <img
                    src={product.img}
                    alt="Product Image"
                    className="object-cover relative mx-auto mt-3 flex h-40 overflow-hidden rounded-xl"
                  />
                  {product.discnt > 0 && (
                    <span className="absolute top-2 left-4 m-2 rounded-full bg-indigo-950 px-2 text-center text-sm font-medium text-white">
                      {product.discnt}%
                    </span>
                  )}
              
                <div className="mt-4 px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900 h-6">
                      {product.prodTle + "-" + product.brnd}
                    </h5>
                  </a>
                  <div className="mt-2 mb-3 flex items-center justify-between">
                    <p>
                      <span className="text-xl font-bold text-slate-900">
                        Rs.{(product.cst * (100 - product.discnt)) / 100}
                      </span>
                      {product.discnt > 0 && (
                        <span className="text-sm text-slate-900 line-through mx-1">
                          {product.cst}
                        </span>
                      )}
                    </p>
                  </div>
                  <Link
                    to="/edit-product"
                    state={product}
                    className="flex items-center justify-center rounded-md bg-indigo-950 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <AddBoxIcon className="mr-2"/>
                    Add Stock
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPreviewCard;

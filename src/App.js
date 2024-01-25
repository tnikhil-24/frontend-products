import "./App.css";
import AddProduct from "./Pages/AddProduct";
import AdminNavBar from "./AdminPages/AdminNavBar";
import { Routes, Route, Router } from "react-router-dom";
import AdminProductListing from "./AdminPages/Products/AdminProductListing";
import OnlineOrders from "./AdminPages/OnlineOrders";
import AdminLogin from "./Pages/AdminLogin";
import EditProduct from "./Pages/EditProduct";
import OfflineOrdersOverview from "./Pages/OfflineOrdersOverview";
import { getTokenFromCookies } from "./AdminPages/cookieUtils";

function App() {
  return (
    <div>
      {getTokenFromCookies() === null && <AdminLogin />}
      {getTokenFromCookies() != null && (
        <div>
          <AdminNavBar />
          <Routes>
            <Route path="/admin/products" element={<AdminProductListing />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/online-orders" element={<OnlineOrders />} />
            <Route path="/admin" element={<OfflineOrdersOverview />} />
            <Route path="/admin/edit-product" element={<EditProduct />} />
          </Routes>
        </div>
      )}

    </div>
  );
}

export default App;
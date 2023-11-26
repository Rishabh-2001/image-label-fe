// import './App.css';
import HomePage from "./Layout/HomePage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./route/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalLayout from "./Layout/GlobalLayout";
import Home from "./components/Home";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";


import Dashboard from "./components/Dashboard";


import AdminProtectedRoute from "./route/AdminProtectedRoute";

import AddImages from "./pages/AddImages";
import CustomerDashboard from "./components/Customer/CustomerDashboard";


function App() {
  return (
    <div className="App w-[100%] box-content">
      <ToastContainer />
      <Routes>
        {/* <Route element={<GlobalLayout />}> */}
          {/* BEFORE AUTH LAYOUT  */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* AFTER AUTH LAYOUT  */}
          <Route
            path="admin"
            element={
              <AdminProtectedRoute>
                <HomePage />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route exact path="add" element={<AddImages />} />
          
           
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="vendor"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<CustomerDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;

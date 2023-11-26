import { useLocation, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem('currentUser');
  const userData = JSON.parse(user);
  const pathSegments = location.pathname.split('/');
  console.log("ADM CHE", user);

   
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user && userData) {
    if (userData.userType === "CUSTOMER" && pathSegments[1] === "admin") {
      toast.error("You dont have permission as Admin")
      return <Navigate to="/vendor" />;
    }

    if (userData.userType === "ADMIN" && pathSegments[1] === "vendor") {
      return <Navigate to="/admin" />;
    }
  }

  return children;
};

export default AdminProtectedRoute;

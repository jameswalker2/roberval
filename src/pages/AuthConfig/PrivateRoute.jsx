// PrivateRoute.jsx
import { useAuth } from "@/pages/AuthConfig/AuthContext.jsx";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const { user } = useAuth();

  return user ? element : <Navigate to="/login" replace={true} />;
}

export default PrivateRoute;

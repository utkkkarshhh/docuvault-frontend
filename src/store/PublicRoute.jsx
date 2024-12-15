import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => !!state.user.currentUser);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default PublicRoute;

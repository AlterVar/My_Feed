import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (token && location.pathname === "/auth") {
    return <Navigate to="/" replace />;
  }

  if (!token && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace state={{ from: location }} />;
	}
	return (
		<Outlet />
	)
};

export default ProtectedRoute;

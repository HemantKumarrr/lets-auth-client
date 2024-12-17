import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const authUser = useSelector((state) => state.user.uid);
  const isActiveUser = authUser || null;
  return isActiveUser ? <Outlet /> : <Navigate to="/" />;
};

export default Private;

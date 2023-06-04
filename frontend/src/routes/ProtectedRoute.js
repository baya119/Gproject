import { redirect } from "react-router-dom";
import {useContext} from "react";
import { UserContext } from "../App";

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(UserContext);
  return isAuthenticated ? <Component /> : redirect("/login");
};

export default ProtectedRoute;

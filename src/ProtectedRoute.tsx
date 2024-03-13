import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/supabse";

const PrivateRoute = ({ Component }: any) => {

  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;

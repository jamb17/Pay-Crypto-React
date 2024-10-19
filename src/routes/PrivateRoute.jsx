import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store";

function PrivateRoute () {
    const isAuth = useStore(state => state.isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/registration" />;
};

export default PrivateRoute;
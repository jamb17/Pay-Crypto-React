import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store";

function PublicRoute () {
    const isAuth = useStore(state => state.isAuth);
    return !isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
import Header from "./Header.jsx";
import { Link } from "react-router-dom";
import useStore from "../../../store.jsx";

function PersonalAccount() {
    
    return (
        <>
            <Header />
            <h1>Personal Account Mainpage {'{'}Coming up soon^^{'}'}</h1><br></br>
            <Link onClick={useStore(state => state.logout)} className="max-w-40 btn-primary">Log Out</Link>
        </>
    );
}

export default PersonalAccount;

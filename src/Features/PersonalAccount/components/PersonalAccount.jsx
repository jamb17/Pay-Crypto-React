import Header from "./Header.jsx";
import useStore from "../../../store.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import useError from '../../../hooks/useError.js';
import ActionSection from "./ActionSection.jsx";
import PopUp from "./PopUp.jsx";

function PersonalAccount() {
    const error = useError();

    const email = useStore(state => state.email);
    const setNickname = useStore(state => state.setNickname);
    const logout = useStore(state => state.logout);
    const $api = axios.create();

    const [openPopUp, setOpenPopUp] = useState(false);

    // $api.interceptors.response.use((config) => {
    //     return config;
    // }, async (err) => {
    //     const originalRequest = err.config;
    //     if (err.response.status === 401 && originalRequest && originalRequest._isRetry !== true) {
    //         originalRequest.isRetry = true;
    //         try {
    //             const response = await axios.post('http://localhost:5000/user/refresh', null, { withCredentials: true });
    //             localStorage.setItem('accessToken', response.data);
    //             originalRequest.headers['Authorization'] = response.data;
    //             return axios.request(originalRequest);
    //         } catch (error) {
    //             error(error)
    //             console.log(error);
    //         }
    //     }
    //     throw err;
    // });

    // useEffect(() => {
    //     try {
    //         $api.get('http://localhost:5000/user/getUserData',
    //             {
    //                 params: {
    //                     email: email
    //                 },
    //                 headers: {
    //                     "Authorization": localStorage.getItem('accessToken')
    //                 }
    //             }).then(res => {
    //                 setNickname(res.data.nickname)
    //             }).catch(e => {
    //                 if (e.response && e.response.status === 401) {
    //                     logout();
    //                 }
    //                 error("Network error")
    //                 console.log(e)
    //             })
    //     } catch (e) {
    //         error(e)
    //     }
    // }, [])

    return (<>
        {openPopUp && <PopUp setOpenPopUp={setOpenPopUp} />}
        <Header />
        {/* <h1 style={{color: theme && '#E0E0E0'}}>Personal Account Mainpage {'{'}Coming up soon^^{'}'}</h1><br></br>
        <Link onClick={useStore(state => state.logout)} className={`max-w-40 btn-primary ${theme && 'dark'}`}>Log Out</Link> */}
        <div className="flex gap-6">
            <ActionSection
                setOpenPopUp={setOpenPopUp}
                type="merchant"
            />
            <ActionSection
                setOpenPopUp={setOpenPopUp}
                type="donate"
            />
        </div>
    </>
    );
}

export default PersonalAccount;

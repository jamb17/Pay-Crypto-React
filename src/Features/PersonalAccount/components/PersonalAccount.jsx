import Header from "./Header.jsx";
import { Link } from "react-router-dom";
import useStore from "../../../store.jsx";
import { useEffect } from "react";
import axios from "axios";

function PersonalAccount() {

    const email = useStore(state => state.email);
    const setNickname = useStore(state => state.setNickname);
    const logout = useStore(state => state.logout);
    const $api = axios.create();

    $api.interceptors.response.use((config) => {
        return config;
    }, async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && originalRequest && originalRequest._isRetry !== true) {
            originalRequest.isRetry = true;
            try {
                const response = await axios.post('http://localhost:5000/user/refresh', null, { withCredentials: true });
                localStorage.setItem('accessToken', response.data);
                originalRequest.headers['Authorization'] = response.data;
                return axios.request(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }
        throw err;
    });

    useEffect(() => {
        $api.get('http://localhost:5000/user/getUserData',
            {
                params: {
                    email: email
                },
                headers: {
                    "Authorization": localStorage.getItem('accessToken')
                }
            }).then(res => {
                setNickname(res.data.nickname)
            }).catch(e => {
                if (e.response && e.response.status === 401) {
                    logout();
                }
                console.log(e)
            })
    }, [])

    return (<>
        <Header />
        <h1>Personal Account Mainpage {'{'}Coming up soon^^{'}'}</h1><br></br>
        <Link onClick={useStore(state => state.logout)} className="max-w-40 btn-primary">Log Out</Link>
    </>
    );
}

export default PersonalAccount;

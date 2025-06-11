import Header from "./Header.jsx";
import useStore from "../../../store.jsx";
import { useEffect, useState } from "react";
import useError from '@hooks/useError.js';
import ActionSection from "./ActionSection.jsx";
import PopUp from "./PopUp.jsx";
import $api from "@api/api.js";
import { useShallow } from "zustand/react/shallow";

function PersonalAccount() {
    const error = useError();

    const {email, setNickname, logout} = useStore(useShallow(state => ({
        email: state.email,
        setNickname: state.setNickname,
        logout: state.logout
    })));

    const [openPopUp, setOpenPopUp] = useState(false);

    const [file, setFile] = useState();

    useEffect(() => {
        try {
            $api.get('/getUserData',
                {
                    params: {
                        email: email
                    }
                }).then(res => {
                    console.log(res.data)
                    if (res.data.merchant) {
                        const byteArray = new Uint8Array(res.data.merchant.avatar.data);
                        const blob = new Blob([byteArray], {type: res.data.merchant.avatar.avatarContentType});
                        const url = URL.createObjectURL(blob);
                        setFile(url)
                    }
                    setNickname(res.data.nickname)
                }).catch(e => {
                    if (e.response && e.response.status === 401) {
                        logout();
                    }
                    error("Network error")
                    console.log(e)
                })
        } catch (e) {
            error(e)
        }
    }, [])

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
        <img className="w-10 h-10" src={file ? file : ''} alt="" />
    </>
    );
}

export default PersonalAccount;

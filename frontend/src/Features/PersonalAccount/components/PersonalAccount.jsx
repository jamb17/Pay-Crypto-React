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

    const [merchant, setMerchant] = useState({
        name: '',
        file: ''
    });

    useEffect(() => {
        try {
            $api.get('/getUserData',
                {
                    params: {
                        email: email
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.merchant && res.data.merchant.avatar) {
                        const byteArray = new Uint8Array(res.data.merchant.avatar.data);
                        const blob = new Blob([byteArray], {type: res.data.merchant.avatar.avatarContentType});
                        const url = URL.createObjectURL(blob);
                        setMerchant({
                            name: res.data.merchant.name,
                            file: url
                        })
                    } else if (res.data.merchant) {
                        setMerchant({
                            name: res.data.merchant.name,
                            file: ''
                        })
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
        <div className="flex flex-col gap-6 items-start md:flex-row">
            <ActionSection
                setOpenPopUp={setOpenPopUp}
                type={merchant.name !== '' ? "opened merchant" : "merchant"}
                merchant={merchant}
            />
            <ActionSection
                setOpenPopUp={setOpenPopUp}
                type="donate"
            />
        </div>
        {/* {merchant.name && <p>{merchant.name}</p>} */}
        {/* <img  src={merchant.file ? merchant.file : ''} alt="" /> */}
    </>
    );
}

export default PersonalAccount;

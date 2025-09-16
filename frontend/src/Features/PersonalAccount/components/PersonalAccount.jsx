import Header from "./Header.jsx";
import useStore from "../../../store.jsx";
import { useEffect, useRef, useState } from "react";
import useError from '@hooks/useError.js';
import ActionSection from "./ActionSection.jsx";
import PopUp from "./PopUp.jsx";
import $api from "@api/api.js";
import { useShallow } from "zustand/react/shallow";
import Loader from "@components/Loader.jsx";
import VariableProximity from '../../../reactbits/VariableProximity/VariableProximity.jsx'

function PersonalAccount() {
    const error = useError();

    const { email, setNickname, logout, setAvatar } = useStore(useShallow(state => ({
        email: state.email,
        setNickname: state.setNickname,
        logout: state.logout,
        setAvatar: state.setAvatar
    })));

    const [openPopUp, setOpenPopUp] = useState(false);
    const [popUpType, setPopUpType] = useState('');

    const [merchant, setMerchant] = useState([]);
    const [donate, setDonate] = useState([])

    const [loading, setLoading] = useState('pending')

    const containerRef = useRef(null)

    useEffect(() => {
        setLoading('pending')
        try {
            $api.get('/getUserData',
                {
                    params: {
                        email: email
                    }
                }).then(res => {
                    const merchantItems = (res.data.merchant || []).map(e => {
                        let file = ''
                        if (e.avatar !== '') {
                            const byteArray = new Uint8Array(e.avatar.data);
                            const blob = new Blob([byteArray], { type: e.avatar.avatarContentType });
                            file = URL.createObjectURL(blob);
                        }

                        return {
                            id: e.id,
                            name: e.name,
                            file: file
                        }
                    })

                    const donateItems = (res.data.donate || []).map(e => {
                        let file = ''
                        if (e.avatar !== '') {
                            const byteArray = new Uint8Array(e.avatar.data);
                            const blob = new Blob([byteArray], { type: e.avatar.avatarContentType });
                            file = URL.createObjectURL(blob);
                        }

                        return {
                            id: e.id,
                            name: e.name,
                            file: file
                        }
                    })

                    if (res.data.avatar) {
                        const byteArray = new Uint8Array(res.data.avatar.data);
                        const blob = new Blob([byteArray])
                        setAvatar(URL.createObjectURL(blob))
                    } else setAvatar('')

                    const uniqueMerchant = Array.from(new Map(merchantItems.map(e => [e.id, e])).values());
                    const uniqueDonate = Array.from(new Map(donateItems.map(e => [e.id, e])).values());

                    setMerchant(uniqueMerchant)
                    setDonate(uniqueDonate)
                    setNickname(res.data.nickname)
                    setLoading('loaded')
                }).catch(e => {
                    if (e.response && e.response.status === 401) {
                        logout();
                    }
                    error("Network error")
                    console.log(e)
                    setLoading('failed')
                })
        } catch (e) {
            error(e)
            setLoading('failed')
        }
    }, [])

    return (<>
        {openPopUp && <PopUp setOpenPopUp={setOpenPopUp} popUpType={popUpType} setMerchant={setMerchant} setDonate={setDonate} />}
        <Header />
        <div ref={containerRef} className="flex flex-1 min-h-fit flex-col gap-3 items-center w-full justify-start pt-[96px] pb-[76px] md:items-start md:max-h-min md:p-0 md:flex-row md:justify-center md:gap-6">
            {/* {loading === 'loaded' ? (<>
                <ActionSection
                    setOpenPopUp={setOpenPopUp}
                    setPopUpType={setPopUpType}
                    type={merchant.length !== 0 ? "opened merchant" : "merchant"}
                    merchant={merchant}
                />
                <ActionSection
                    setOpenPopUp={setOpenPopUp}
                    setPopUpType={setPopUpType}
                    type={donate.length !== 0 ? "opened donate" : "donate"}
                    donate={donate}
                />
            </>) : <>
                <Loader width="100%" maxWidth="456px" height="315px"/>
                <Loader width="100%" maxWidth="456px" height="315px"/>
            </>} */}
            {loading === 'loaded' ? (<>
                <ActionSection
                    setOpenPopUp={setOpenPopUp}
                    setPopUpType={setPopUpType}
                    type={merchant.length !== 0 ? "opened merchant" : "merchant"}
                    merchant={merchant}
                />
                <ActionSection
                    setOpenPopUp={setOpenPopUp}
                    setPopUpType={setPopUpType}
                    type={donate.length !== 0 ? "opened donate" : "donate"}
                    donate={donate}
                />
            </>) : null}
            {loading === 'pending' ? (<>
                <Loader width="100%" maxWidth="456px" height="315px"/>
                <Loader width="100%" maxWidth="456px" height="315px"/>
            </>) : null}
            {loading === 'failed' ? (<>
                <VariableProximity
                    label={'Error while fetching data. Please try reloading the page.'}
                    className={'variable-proximity-demo text-7xl text-center cursor-default'}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef}
                    radius={400}
                    falloff='linear'
                />
            </>) : null}
        </div>
    </>
    );
}

export default PersonalAccount;

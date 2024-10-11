import React, { useState } from "react";
import Header from "./Header.jsx";
import { create } from "zustand";
import { Link } from "react-router-dom";

export const useUserData = create(set => ({
    nickname: "",
    changeNickname: (userInput) => set({nickname: userInput})  
}));

function PersonalAccount() {
    // const userNickname = useUserData(state => state.nickname);
    const changeName = useUserData(state => state.changeNickname);
    const [value, setValue] = useState(" ");

    function handleClick() {
        changeName(value)
    };
    
    return (
        <>
            <Header />
            {/* <h1>Personal Account Mainpage {'{'}Coming up soon^^{'}'}</h1><br></br> */}
            <input onKeyDown={e => e.key === "Enter" && handleClick()} className="py-2 px-3 mb-10" key={1} id="name" value={value} onChange={e => setValue(e.target.value)} placeholder="Nickname"/>
            <button className="btn-primary" onClick={handleClick}>Enter nickname</button>
            <Link onClick={()=> {logOut()}} className="btn-primary">Log Out</Link>
        </>
    );
}

export default PersonalAccount;

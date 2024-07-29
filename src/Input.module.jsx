import React from "react";
import { useState } from "react";
import styles from './Input.module.css'

function Input(props) {
    const [type, setType] = useState(props.type)
    const [value, setValue] = useState('');

    const input = (<div className={styles.container}>
        <label>{props.label}</label>
        <input className="py-2 px-3" required name={props.id} id={props.id} type={type} value={value} onChange={props.id !== 'email' ? (e) => { props.matchChek(), setValue(e.target.value) } : (e) => {setValue(e.target.value) }}></input>
        {props.showIcon === "true" && <div onClick={() => setType(type === 'password' ? "text" : 'password')} className={type === "password" ? styles.icon : styles.icon_showed}></div>}
    </div>)
    const inputFailed = (
        <div className={styles.failed_input}>
            <label>{props.label}</label>
            <input required name={props.id} id={props.id} placeholder={props.showIcon === "true" ? "Enter your Password" : "Enter your Email"} className={`${styles.failed} py-2 px-3`} type={type} value={value} onChange={props.id !== 'email' ? (e) => { props.matchChek(), setValue(e.target.value) } : (e) => {setValue(e.target.value) }}></input>
            {props.showIcon === "true" && <div onClick={() => setType(type === 'password' ? "text" : 'password')} className={type === "password" ? styles.icon : styles.icon_showed}></div>}
            <p className={styles.error_message}>{props.showIcon === "true" ? "Password mismatch" : "Please enter a valid email address."}</p>
        </div>

    )

    return (
        <>
            {props.status === "true" ? input : inputFailed}
        </>
    )
}

export default Input;
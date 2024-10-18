import React from "react";
import { useState } from "react";
import styles from '../styles/css/Input.module.css'

function Input({id, showIcon, label, type, value, onChange, error, togglePasswordVisibility}) {

    return (
        <>
            <div className={styles.container}>
                <label htmlFor={id}>{label}</label>
                <input
                    className={`py-2 px-3 ${error && styles.failed}`}
                    required
                    name={id}
                    id={id}
                    placeholder={showIcon ? "Enter your Password" : "Enter your Email"}
                    type={type} 
                    value={value}
                    onChange={onChange}
                />
                {showIcon && (
                    <div 
                        onClick={togglePasswordVisibility} 
                        className={type === "password" ? styles.icon : styles.icon_showed}>
                    </div>
                )}
                {error && <p className={styles.error_message}>{error}</p>}
            </div>
        </>
    )
}   

export default Input;
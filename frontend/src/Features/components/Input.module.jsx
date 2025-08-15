import React, { useContext } from "react";
import styles from './styles/Input.module.sass';
import { ThemeContext } from "../../ThemeContext";
import errorIcon from '@assets/error-icon.svg';

function Input({id, showIcon, label, type, value, onChange, error, togglePasswordVisibility, placeholder}) {
    const {theme} = useContext(ThemeContext);

    return (
        <>
            <div className={theme ? styles.containerDark : styles.container}>
                <label htmlFor={id}>{label}</label>
                <input
                    className={`py-2 px-3 ${error && styles.failed}`}
                    required
                    name={id}
                    id={id}
                    placeholder={placeholder || 'Placeholder'}
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
                {error && 
                    <div className='flex items-start gap-0.5'>
                        <img src={errorIcon} />
                        <p className={styles.error_message}>{error}</p>
                    </div>
                }
            </div>
        </>
    )
}   

export default Input;
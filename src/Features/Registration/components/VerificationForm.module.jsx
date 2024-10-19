import { useEffect, useState } from "react"
import axios from "axios";
import styles from '../styles/css/Input.module.css'
import useStore from "../../../store";

export default function VerificationForm(email) {
    const [values, setValues] = useState(['', '', '', '', '', '']);
    const [disabled, setDisabled] = useState(false);

    const [errors, setErrors] = useState({
        invalidCode: false,
        codeExpired: false
    })

    const [checkErrors, setCheckErrors] = useState(false);

    useEffect(()=> {
        if (errors.codeExpired || errors.invalidCode) {
            setCheckErrors(true);
        } else setCheckErrors(false)
    }, [errors])

    const handleFocus = (e) => {
        const end = e.target.value.length;
        e.target.type = "text";
        e.target.setSelectionRange(end, end);
        e.target.type = "number";
    }

    window.addEventListener('paste', function (e) {
        e.preventDefault();
        let paste = (e.clipboardData || window.Clipboard).getData('text').split('');
        if (paste.length == 6) setValues(paste);
    });

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const fd = new FormData();
    //     fd.append('email', email.email)
    //     let code = '';
    //     for (let value of values) {
    //         code += value;
    //     }
    //     fd.append('code', code)
    //     const urlEncoded = new URLSearchParams(fd).toString();
    //     setDisabled(true)
    //     fetch('http://localhost:7000/checkVerification', {
    //         method: 'POST',
    //         body: urlEncoded,
    //         headers: {
    //             'Content-type': 'application/x-www-form-urlencoded',
    //         }
    //     }).then(res => { 
    //         if (res.ok) {
    //             return res.text() 
    //         }
    //         throw new Error('Something went wrong');
    //     }).then(res => {
    //         if (res == "true") {
    //             useStore(state => state.setAuth)
    //             window.location.reload();
    //         } else if (res === 'Invalid verification code') {
    //             throw new Error('Invalid verification code')
    //         } else if (res === 'Verification code has expired') {
    //             throw new Error('Verification code has expired') 
    //         }
    //     }).catch((error) => {
    //         alert('Something went wrong: ' + error.message)
    //     }).finally(() => {
    //         setDisabled(false)
    //     });
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('email', email.email)
        let code = '';
        for (let value of values) {
            code += value;
        }
        fd.append('code', code)
        const data = new URLSearchParams(fd);
        setDisabled(true);
        await axios.post('http://localhost:5000/user/completeRegistration', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            if (res.status === 200) {
                useStore(state => state.setAuth)
                window.localStorage.setItem('accessToken', res.data);
                window.location.reload();
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                if (error.response.data === 'Invalid verification code') {
                    setErrors((prev) => ({...prev, invalidCode: true}));
                } else if (error.response.data === 'Verification code has expired') {
                    setErrors({codeExpired: true, invalidCode: false});
                }
            } else alert('Something went wrong: ' + error.message);
        }).finally(() => {
            setDisabled(false)
        });
    };  

    function handleChange(e, index) {
        const inputValue = e.target.value;
        const newValues = [...values];

        if (inputValue.length > 1) {
            newValues[index] = inputValue.charAt(1);
        } else {
            newValues[index] = inputValue;
        }

        setValues(newValues);
    }

    useEffect(() => {
        const allFilled = values.every(value => value !== '');
        if (allFilled) {
            document.querySelector('button[type="submit"]').click();
        } else {
            let indexOfEmpty = -1;
            for (let i = 0; i < values.length; i++) {
                if (values[i] === '') {
                    indexOfEmpty = i;
                    break;
                }
            }
            document.querySelector(`input[id="${indexOfEmpty + 1}"]`).focus();
        }
    }, [values]);


    return <>
        <form id="verifyCodeForm" className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div className="flex w-full gap-2">
                {values.map((value, index) => (
                    <input
                        autoFocus={index === 0 ? true : false}
                        key={index}
                        id={index + 1}
                        type="number"
                        value={value}
                        onFocus={handleFocus}
                        onChange={(e) => handleChange(e, index)}
                        className={`lg:text-2xl md:text-xl text-lg 
                                    lg:py-5 lg:px-3 md:py-4 md:px-3 py-3 px-1 
                                    w-full text-center 
                                    ${checkErrors && styles.failed}`}
                        disabled={disabled}
                    />
                ))}
            </div>
            {checkErrors &&
                (<div className='flex items-start gap-0.5'>
                    <img src="/error-icon.svg" />
                    <p className={styles.error_message}>
                        {errors.invalidCode && "Invalid confirmation code. Please enter the correct 6-digit code that was sent to your email address."}
                        {errors.codeExpired && "Confirmation code has expired."}
                    </p>
                </div>)
            }
            <button type="submit" className="btn-primary" disabled={disabled}>Continue</button>
        </form>
    </>
}
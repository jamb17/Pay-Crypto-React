import { useState } from "react";
import Input from "@components/Input.module.jsx";
import styled from "styled-components";
import axios from "axios";
import styles from '../styles/Index.module.sass'
import { Link } from "react-router-dom";
import useError from "@hooks/useError";
import Loader from '@components/Loader.jsx'

const FormContainer = styled.form`
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%`
    ;

function Form({ setShowVerification, setEmail }) {

    const API_URL = import.meta.env.VITE_API_URL + '/user'

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passRepeat: ''
    })

    const [errors, setErrors] = useState({
        passwordMismatch: false,
        emailExists: false
    })

    const [type, setType] = useState('password');

    const togglePasswordVisibility = () => {
        setType(type === 'password' ? 'text' : 'password');
    };

    const [disabled, setDisabled] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const setError = useError();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passRepeat) {
            setErrors((prev) => ({ ...prev, passwordMismatch: true }));
            return;
        } else {
            setErrors((prev) => ({ ...prev, passwordMismatch: false }));
        }
        setDisabled(true);
        await axios.post(API_URL + '/registration',
            {
                email: formData.email,
                password: formData.password
            }).then(res => {
                if (res.status === 200) {
                    setShowVerification(true);
                    setEmail(formData.email);
                }
            }).catch((error) => {
                if (error.response) {
                    if (error.response.data === 'Account with this email is already exists') {
                        setErrors((prev) => ({ ...prev, emailExists: true }));
                    } else setError(error.message);
                } else setError(error.message);
            }).finally(() => {
                setDisabled(false);
            });
    };

    return (<>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <Input
                id="email"
                type="email"
                label="Email"
                showIcon={false}
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                error={errors.emailExists ? 'Account with this email is already exists' : ''} />
            <Input
                id="password"
                type={type}
                label="Password"
                showIcon={true}
                togglePasswordVisibility={togglePasswordVisibility}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange} />
            <Input
                id="passRepeat"
                type={type}
                label="Repeat password"
                showIcon={true}
                value={formData.passRepeat}
                placeholder="Repeat your password"
                onChange={handleChange}
                togglePasswordVisibility={togglePasswordVisibility}
                error={errors.passwordMismatch ? 'Password mismatch' : false} />
            {!disabled ?
                <button type="submit" className="btn-primary" disabled={disabled}>Continue</button> :
                <Loader
                    width={"100%"}
                    height={"44px"}
                    borderRadius={"8px"}
                    accentBg
                />}
            <Link to="/login" className={styles.link}>I have an account</Link>
        </form>
    </>)
};

export default Form;

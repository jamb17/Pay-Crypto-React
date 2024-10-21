import React, { useState } from "react";
import Input from "./Input.module";
import styled from "styled-components";
import axios from "axios";
import styles from '../styles/css/Index.module.css'
import { Link } from "react-router-dom";

const FormContainer = styled.form`
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%`
    ;

function Form({ setShowVerification, setEmail }) {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passRepeat) {
            setErrors((prev) => ({ ...prev, passwordMismatch: true }));
            return;
        } else {
            setErrors((prev) => ({ ...prev, passwordMismatch: false }));
        }
        setDisabled(true);
        await axios.post('http://localhost:5000/user/registration', 
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
                    } else alert('Something went wrong: ' + error.response)
                } else alert('Something went wrong: ' + error.message)
            }).finally(() => {
                setDisabled(false);
        });    
    };

    return (<>
        <FormContainer onSubmit={handleSubmit}>
            <Input
                id="email"
                type="email"
                label="Email"
                showIcon={false}
                value={formData.email}
                onChange={handleChange}
                error={errors.emailExists ? 'Account with this email is already exists' : ''} />
            <Input
                id="password"
                type={type}
                label="Password"
                showIcon={true}
                togglePasswordVisibility={togglePasswordVisibility}
                value={formData.password}
                onChange={handleChange} />
            <Input
                id="passRepeat"
                type={type}
                label="Repeat password"
                showIcon={true}
                value={formData.passRepeat}
                onChange={handleChange} 
                togglePasswordVisibility={togglePasswordVisibility}
                error={errors.passwordMismatch ? 'Password mismatch' : false}/>
            <button type="submit" className="btn-primary" disabled={disabled}>Continue</button>
            <Link to="/login" className={styles.link}>I have an account</Link>
        </FormContainer>
    </>)
};

export default Form;

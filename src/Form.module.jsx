import React, { useState } from "react";
import Input from "./Input.module";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.form`
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%`
    ;

const LogInLink = styled.a`
        color: #53B669;
        width: 100%;
        text-align: center;
        cursor: pointer;
    `;

function Form({ setShowVerification, setEmail }) {
    const [status1, SetStatus1] = useState('true')
    const [status2, SetStatus2] = useState('true')
    const [status3, SetStatus3] = useState('true')
    const [disabled, setDisabled] = useState(false);

    function matchChek() {
        let passRepeat = document.getElementById('passRepeat').value;
        let pass = document.getElementById('pass').value;
        if (passRepeat !== pass) {
            SetStatus3('false');
        } else (SetStatus3('true'));
    };

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const form = document.getElementById('regForm');
    //     const fd = new FormData(form);
    //     const urlEncoded = new URLSearchParams(fd).toString();
    //     $('button[type=submit]').css('opacity', '0.5');
    //     setDisabled(true);
    //     fetch('http://localhost:7000/', {
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
    //             setShowVerification(true);
    //             setEmail($('#email').val());
    //         } else if (res == "email exists") {
    //             throw new Error('Account with this email is already exists');
    //         }
    //     }).catch((error) => {
    //         alert('Something went wrong: ' + error.message)
    //     }).finally(() => {
    //         $('button[type=submit]').css('opacity', '1');
    //         setDisabled(false);
    //     });
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        setDisabled(true);
        const form = document.getElementById('regForm');
        const fd = new FormData(form);
        const data = new URLSearchParams(fd);
        data.delete('passRepeat');
        await axios.post('http://localhost:5000/user/create', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                if (res.status === 200) {
                    setShowVerification(true);
                    setEmail(document.getElementById('email').value);
                }
            }).catch((error) => {
                if (error.response) {
                    alert('Something went wrong: ' + error.response.data)
                } else alert('Something went wrong: ' + error.message)
            }).finally(() => {
                setDisabled(false);
        });    
    };

    return (
        <FormContainer id="regForm" onSubmit={status3 == 'true' ? handleSubmit : (e) => { e.preventDefault() }}>
            <Input
                id="email"
                status={status1}
                type="email"
                label="Email"
                showIcon="false" />
            <Input
                matchChek={matchChek}
                id="pass"
                status={status2}
                type="password"
                label="Password"
                showIcon="true" />
            <Input
                matchChek={matchChek}
                id="passRepeat"
                status={status3}
                type="password"
                label="Repeat password"
                showIcon="true" />
            <button type="submit" className="btn-primary" disabled={disabled}>Continue</button>
            <LogInLink>I have an account</LogInLink>
        </FormContainer>
    )
};

export default Form;

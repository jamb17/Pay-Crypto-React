import { Link } from "react-router-dom"
import Heading from '../components/Heading.jsx'
import styles from '../styles/Index.module.sass'
import { useRef, useState } from "react";
import TermsPrivacyLink from "../components/TermsPriacyLink.jsx";
import Input from "@components/Input.module.jsx";
import Logo from '../components/Logo.jsx'
import useGsapSlideDown from '@hooks/useGsapSlideDown.js'
import useGsapSlideUp from '@hooks/useGsapSlideUp.js'
import axios from "axios";
import useStore from "../../../store.jsx";
import useError from "@hooks/useError.js";
import Loader from '@components/Loader.jsx'

export default function Login() {

    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const termsAndPrivacyRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL + '/user'

    useGsapSlideDown(logoRef);
    useGsapSlideUp(containerRef);
    useGsapSlideUp(termsAndPrivacyRef, { y: 10 }, { delay: .5 })

    const login = useStore(state => state.login);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [errors, setErrors] = useState({
        noSuchUser: false,
        wrongPassword: false
    });

    const [disabled, setDisabled] = useState(false);

    const [type, setType] = useState('password');
    const togglePasswordVisibility = () => {
        setType(type === 'password' ? 'text' : 'password');
    };

    const setErrorMessage = useError();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        await axios.post(API_URL + '/login',
            {
                email: formData.email,
                password: formData.password
            },
            {
                withCredentials: true
            }).then(res => {
                if (res.status === 200) {
                    login(formData.email);
                    window.localStorage.setItem('accessToken', res.data);
                }
            }).catch((error) => {
                if (error.response) {
                    if (error.response.data === 'No user with this e-mail address was found') {
                        setErrors({ noSuchUser: true, wrongPassword: false });
                    } else if (error.response.data === 'Wrong password') {
                        setErrors({ noSuchUser: false, wrongPassword: true });
                    }
                } else setErrorMessage(error.message);
            }).finally(() => {
                setDisabled(false);
            })
    }

    return <>
        <Logo ref={logoRef} />
        <div ref={containerRef} className={styles.container}>
            <Heading variation="loginForm" />
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <Input 
                    id="email"
                    type="email"
                    label="Email"
                    showIcon={false}
                    value={formData.email}
                    placeholder="Enter your email"
                    error={errors.noSuchUser && 'No user with this e-mail address was found'}
                    onChange={handleChange} />
                <Input 
                    id="password"
                    type={type}
                    label="Password"
                    showIcon={true}
                    placeholder="Enter your password"
                    togglePasswordVisibility={togglePasswordVisibility}
                    error={errors.wrongPassword && 'Wrong password'}
                    value={formData.password}
                    onChange={handleChange} />
                {!disabled ? 
                    <button type="submit" className="btn-primary" disabled={disabled}>Continue</button> : 
                    <Loader 
                    width={"100%"}
                    height={"44px"}
                    borderRadius={"8px"}
                    accentBg
                />}
            </form>
            <Link className={styles.link} to="/registration">I don't have an account</Link>
        </div>
        <TermsPrivacyLink ref={termsAndPrivacyRef} />
    </>
}
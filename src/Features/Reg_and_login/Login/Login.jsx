import { Link } from "react-router-dom"
import Heading from '../Componets/Heading.jsx'
import styles from '../styles/css/Index.module.css'
import { useContext, useRef, useState } from "react";
import TermsPrivacyLink from "../Componets/TermsPriacyLink.jsx";
import Input from "../../components/Input.module.jsx";
import Logo from '../Componets/Logo.jsx'
import useGsapSlideDown from '../../../hooks/useGsapSlideDown.js'
import useGsapSlideUp from '../../../hooks/useGsapSlideUp.js'
import axios from "axios";
import useStore from "../../../store.jsx";
import useError from "../../../hooks/useError.js";
import { ThemeContext } from "../../../ThemeContext.jsx";

export default function Login() {

    const {theme} = useContext(ThemeContext);

    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const termsAndPrivacyRef = useRef(null);

    useGsapSlideDown(logoRef);
    useGsapSlideUp(containerRef);
    useGsapSlideUp(termsAndPrivacyRef, {y: 10}, {delay: .5})

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
        await axios.post('http://localhost:5000/user/login', 
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
                    window.location.reload();
                }
            }).catch((error) => {
                if (error.response) {
                    if (error.response.data === 'No user with this e-mail address was found') {
                        setErrors({noSuchUser: true, wrongPassword: false});
                    } else if (error.response.data === 'Wrong password') {
                        setErrors({noSuchUser: false, wrongPassword: true});
                    }
                } else setErrorMessage(error.message);
            }).finally(() => {
                setDisabled(false);
            })
        }

    return <>
        <Logo ref={logoRef} />
        <div ref={containerRef} className={theme ? styles.containerDark : styles.container}>
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
                <button type="submit" className={theme ? "btn-primary dark" : "btn-primary"} disabled={disabled}>Continue</button>
            </form>
            <Link className={theme ? styles.linkDark : styles.link} to="/registration">I don't have an account</Link>
        </div>
        <TermsPrivacyLink ref={termsAndPrivacyRef} />
    </>
}
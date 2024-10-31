import styles from '../styles/css/Index.module.css';


function Heading({variation}) {

    const emailForm = (
        <div className={styles.textHeading}>
            <h1>Create new account</h1>
            <p>Please fill in the form below to register on our website and gain access to additional features.</p>
        </div>);

    const codeForm = (
        <div className={styles.textHeading}>
            <h1>Email confirmation</h1>
            <p>To complete registration, enter the 6-digit code sent to your email to confirm your address.</p>
        </div>);

    const loginForm = (
        <div className={styles.textHeading}>
            <h1>Welcome back 👋</h1>
            <p>Fill in the fields to enter your personal account</p>
        </div>);

    if (variation === 'emailForm') {
        return emailForm;
    } else if (variation === 'codeForm') {
        return codeForm;
    } else if (variation === 'loginForm') return loginForm;

};

export default Heading;
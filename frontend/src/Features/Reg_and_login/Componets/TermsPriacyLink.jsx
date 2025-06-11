import { forwardRef, useContext } from 'react';
import styles from '../styles/css/Index.module.css'
import { ThemeContext } from '../../../ThemeContext';

const TermsPrivacyLink = forwardRef( function TermsPrivacyLink (props, ref) {
        const {theme} = useContext(ThemeContext);
    
        return (
            <div ref={ref} className={theme? styles.termsAndPrivacyDark : styles.termsAndPrivacy}>© 2024 Crypto Pay, Inc. By using this service, you are agreeing to the
                <span> terms of use</span> and
                <span> privacy policy.</span>
            </div>
        )
    }
) 

export default TermsPrivacyLink;
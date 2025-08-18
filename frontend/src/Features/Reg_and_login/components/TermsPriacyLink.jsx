import { forwardRef } from 'react';
import styles from '../styles/Index.module.sass'
import ThemeSwitcher from '@components/ThemeSwitcher.jsx'

const TermsPrivacyLink = forwardRef( function TermsPrivacyLink (props, ref) {    
        return (<footer ref={ref}>
            <div className={styles.termsAndPrivacy}>© 2025 Crypto Pay, Inc. By using this service, you are agreeing to the
                <span> terms of use</span> and
                <span> privacy policy.</span>
            </div>
            <ThemeSwitcher />
        </footer>)
    }
) 

export default TermsPrivacyLink;
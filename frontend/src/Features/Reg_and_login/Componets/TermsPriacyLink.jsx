import { forwardRef } from 'react';
import styles from '../styles/Index.module.sass'

const TermsPrivacyLink = forwardRef( function TermsPrivacyLink (props, ref) {    
        return (
            <div ref={ref} className={styles.termsAndPrivacy}>© 2024 Crypto Pay, Inc. By using this service, you are agreeing to the
                <span> terms of use</span> and
                <span> privacy policy.</span>
            </div>
        )
    }
) 

export default TermsPrivacyLink;
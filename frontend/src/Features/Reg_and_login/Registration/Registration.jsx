import { useContext, useRef, useState } from 'react'
import Form from './EmailForm.jsx'
import styles from "../styles/Index.module.sass"
import VerificationForm from './CodeForm.jsx';
import TermsPrivacyLink from '../Componets/TermsPriacyLink.jsx'
import Heading from '../Componets/Heading.jsx'
import Logo from '../Componets/Logo.jsx'
import useGsapSlideDown from '@hooks/useGsapSlideDown.js';
import useGsapSlideUp from '@hooks/useGsapSlideUp.js';
import { ThemeContext } from '../../../ThemeContext.jsx';

function Registration() { 
  const {theme} = useContext(ThemeContext);

  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');

  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const termsAndPrivacyRef = useRef(null)

  useGsapSlideDown(logoRef)
  useGsapSlideUp(containerRef)
  useGsapSlideUp(termsAndPrivacyRef, {y: 10}, {delay: .5})

  return (
    <>
      <Logo ref={logoRef} />
      <div ref={containerRef} className={styles.container}>
        <Heading variation={!showVerification ? 'emailForm' : 'codeForm'} />
        {!showVerification ? <Form setEmail={setEmail} setShowVerification={setShowVerification}></Form> : <VerificationForm email={email}/>}
      </div>
      <TermsPrivacyLink ref={termsAndPrivacyRef} />
    </>
  )
}

export default Registration

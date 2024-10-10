// import { useState } from 'react'
import { useRef, useState } from 'react'
import Form from './Form.module'
import styles from "./Registration.module.css"
import VerificationForm from './VerificationForm.module';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Registration() {
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');

  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const termsAndPrivacyRef = useRef(null)

  const createAccoutHeading = (<div className={styles.textHeading}>
    <h1>Create new account</h1>
    <p>Please fill in the form below to register on our website and gain access to additional features.</p>
  </div>)

  const emailConfirmationHeading = (<div className={styles.textHeading}>
    <h1>Email confirmation</h1>
    <p>To complete registration, enter the 6-digit code sent to your email to confirm your address.</p>
  </div>)

  const termsAndPrivacyInfo = (<div ref={termsAndPrivacyRef} className={styles.termsAndPrivacy}>© 2022 Crypto Pay, Inc. By using this service, you are agreeing to the
    <span> terms of use</span> and
    <span> privacy policy.</span>
  </div>)

  useGSAP(() => {

    gsap.set(containerRef.current, {
      y: 120,
      scale: 0.8,
      opacity: 0
    })

    gsap.to(containerRef.current, {
      y: 0,
      opacity: 1,
      ease: "elastic.out(1,0.9)",
      scale: 1,
      delay: .5,
      duration: 1
    })

    gsap.set(logoRef.current, {
      y: -120,
      opacity: 0,
      scale: 0.8
    })

    gsap.to(logoRef.current, {
      y: 0,
      opacity: 1,
      ease: "elastic.out(1,0.9)",
      delay: .5,
      scale: 1, 
      duration: 1
    })

    gsap.set(termsAndPrivacyRef.current, {
      opacity: 0,
      y: 10
    })

    gsap.to(termsAndPrivacyRef.current, {
      opacity: 1,
      y: 0,
      ease: "elastic.out(1,0.9)",
      delay: 1,
      duration: 1
    })

  })

  return (
    <>
      <div className={styles.top}>
        <img ref={logoRef} src="https://raw.githubusercontent.com/jamb17/pay-crypto/ea98f7c2b493ec3bf3ea7109c0ca2b96a1e78262/casty%20pay%20logo.svg" alt="" />
      </div>
      <div ref={containerRef} className={styles.container}>
        {!showVerification ? createAccoutHeading : emailConfirmationHeading}
        {!showVerification ? <Form setEmail={setEmail} setShowVerification={setShowVerification}></Form> : <VerificationForm email={email}/>}
      </div>
      {termsAndPrivacyInfo}
    </>
  )
}

export default Registration

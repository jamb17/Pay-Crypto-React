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
  })

  return (
    <>
      <div className={styles.top}>
        <img ref={logoRef} src="https://raw.githubusercontent.com/jamb17/pay-crypto/971b56703678ade8de4b90e70a0a07c298f7f2c2/pafas%20grey.svg" alt="" />
      </div>
      <div ref={containerRef} className={styles.container}>
      {!showVerification ? <Form setEmail={setEmail} setShowVerification={setShowVerification}></Form> : <VerificationForm email={email}/>}
      </div>
    </>
  )
}

export default Registration

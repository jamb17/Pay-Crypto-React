// import { useState } from 'react'
import { useState } from 'react'
import Form from './Form.module'
import styles from "./Registration.module.css"
import VerificationForm from './VerificationForm.module';

function Registration() {
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <>
      <div className={styles.top}>
        <img src="https://raw.githubusercontent.com/jamb17/pay-crypto/971b56703678ade8de4b90e70a0a07c298f7f2c2/pafas%20grey.svg" alt="" />
      </div>
      <div className={styles.container}>
      {!showVerification ? <Form setEmail={setEmail} setShowVerification={setShowVerification}></Form> : <VerificationForm email={email}/>}
      </div>
    </>
  )
}

export default Registration

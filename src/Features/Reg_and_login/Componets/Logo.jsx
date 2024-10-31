import { forwardRef } from 'react'
import styles from '../styles/css/Index.module.css'
import { Link } from 'react-router-dom'

const Logo = forwardRef(function Logo (props, ref) {
    return (
        <div className={styles.top}>
            <Link to='/login'>
                <img ref={ref} src="https://raw.githubusercontent.com/jamb17/pay-crypto/ea98f7c2b493ec3bf3ea7109c0ca2b96a1e78262/casty%20pay%20logo.svg" alt="" />
            </Link>
        </div>
    )
})

export default Logo;
import { forwardRef } from 'react'
import styles from '../styles/Index.module.sass'

const Logo = forwardRef(function Logo (props, ref) {

    return (
        <div className={styles.top}>
            <div ref={ref} className={styles.logo}></div>
        </div>
    )
})

export default Logo;
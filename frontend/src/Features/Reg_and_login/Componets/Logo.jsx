import { forwardRef, useContext } from 'react'
import styles from '../styles/Index.module.sass'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../ThemeContext'

const Logo = forwardRef(function Logo (props, ref) {

    return (
        <div className={styles.top}>
            <div className={styles.logo}></div>
        </div>
    )
})

export default Logo;
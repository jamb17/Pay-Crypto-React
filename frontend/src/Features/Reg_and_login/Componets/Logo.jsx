import { forwardRef, useContext } from 'react'
import styles from '../styles/Index.module.sass'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../ThemeContext'
import logoLight from "@assets/logoLight.svg"
import logoDark from '@assets/logoDark.svg'

const Logo = forwardRef(function Logo (props, ref) {

    const {theme} = useContext(ThemeContext);

    return (
        <div className={styles.top}>
            <Link to='/login'>
                <img ref={ref} src={theme ? logoDark : logoLight} alt="" />
            </Link>
        </div>
    )
})

export default Logo;
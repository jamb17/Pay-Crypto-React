import { forwardRef, useContext } from 'react'
import styles from '../styles/css/Index.module.css'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../ThemeContext'

const Logo = forwardRef(function Logo (props, ref) {

    const {theme} = useContext(ThemeContext);

    return (
        <div className={styles.top}>
            <Link to='/login'>
                <img ref={ref} src={theme ? '../../../src/assets/logoDark.svg' : '../../../src/assets/logoLight.svg'} alt="" />
            </Link>
        </div>
    )
})

export default Logo;
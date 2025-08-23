import { NavLink } from 'react-router-dom';
import styles from '../styles/header.module.sass'

export default function Navigation({mobile}) {

    return <>
        <nav className={mobile ? styles.navMobile : undefined}>
            <NavLink
                to='/'
                className={({isActive} ) => isActive ? styles.active : undefined} >
                <div className={styles.iconHome}></div>
                Home
            </NavLink>
            <NavLink
                to='/settings' 
                className={({isActive} ) => isActive ? styles.active : undefined} >
                <div className={styles.iconSettings}></div>
                Settings
            </NavLink>
            <NavLink
                to='/blog' 
                className={({isActive} ) => isActive ? styles.active : undefined} >
                <div className={styles.iconBlog}></div>
                Blog
            </NavLink>
        </nav>
    </>
};
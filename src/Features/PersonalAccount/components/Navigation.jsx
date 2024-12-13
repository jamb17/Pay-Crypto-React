import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../../ThemeContext';
import styles from '../styles/css/header.module.css'
import iconHome from '@assets/tabler-icon-home.svg';
import iconHomeLight from '@assets/tabler-icon-home-light.svg';
import iconSettings from '@assets/tabler-icon-settings.svg';
import iconSettingsLight from '@assets/tabler-icon-settings-light.svg';
import iconBook from '@assets/tabler-icon-book.svg';
import iconBookLight from '@assets/tabler-icon-book-light.svg';

export default function Navigation() {
    const { theme } = useContext(ThemeContext);

    return <>
        <nav>
            <NavLink
                to='/'
                className={({isActive} ) => isActive ? styles.active : undefined} >
                <img src={theme ? iconHomeLight : iconHome} />
                Home
            </NavLink>
            <NavLink
                to='/settings' 
                className={({isActive} ) => isActive ? styles.active : undefined} >
                <img src={theme ? iconSettingsLight : iconSettings} />
                Settings
            </NavLink>
            <NavLink
                to='/blog' 
                className={({isActive} ) => isActive ? styles.active : undefined} >
                <img src={theme ? iconBookLight : iconBook} />
                Blog
            </NavLink>
        </nav>
    </>
};
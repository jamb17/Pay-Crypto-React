import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../ThemeContext';
import styles from '../styles/css/header.module.css'

export default function Navigation() {
    const { theme } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState({
        home: false,
        settings: false,
        blog: false
    });

    useEffect(() => {
        const pathName = window.location.pathname.replace('/', '');
        setActiveTab(prev => ({...prev, [pathName || 'home']: true}));
    }, []);

    const handleChangeTab = (tab) => {
        setActiveTab({
            home: tab === 'home',
            settings: tab === 'settings',
            blog: tab === 'blog'
        });
    };

    return <>
        <nav>
            <Link
                to='/'
                onClick={e => handleChangeTab('home')}
                className={`${activeTab.home === true && styles.active}`}>
                <img src={theme ? "../../../src/assets/tabler-icon-home-light.svg" : "../../../src/assets/tabler-icon-home.svg"} />
                Home
            </Link>
            <Link
                to='/settings'
                onClick={e => handleChangeTab('settings')}
                className={`${activeTab.settings === true && styles.active}`}>
                <img src={theme ? "../../../src/assets/tabler-icon-settings-light.svg" : "../../../src/assets/tabler-icon-settings.svg"} />
                Settings
            </Link>
            <Link
                to='/blog'
                onClick={e => handleChangeTab('blog')}
                className={`${activeTab.blog === true && styles.active}`}>
                <img src={theme ? "../../../src/assets/tabler-icon-book-light.svg" : "../../../src/assets/tabler-icon-book.svg"} />
                Blog
            </Link>
        </nav>
    </>
};
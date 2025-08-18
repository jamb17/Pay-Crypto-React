import styles from './styles/ThemeSwitcher.module.sass'

const ThemeSwitcher = () => {

    const handleClick = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme')

        if (currentTheme === "dark") {
            document.documentElement.setAttribute('data-theme', 'light');
            window.localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            window.localStorage.setItem('theme', 'dark');
        }

    }

    return <div onClick={handleClick} className={styles.themeSwitcher}></div>
}

export default ThemeSwitcher
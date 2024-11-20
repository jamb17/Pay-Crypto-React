import { useContext } from "react";
import useStore from "../../../store";
import styles from "../styles/css/header.module.css"
import { ThemeContext } from "../../../ThemeContext";
import Navigation from "./Navigation";
import imagePlaceholder from '@assets/image-placeholder.png'
import logoDark from '@assets/logoDark.svg'
import logoGreen from '@assets/logo-green.svg'
import { Link } from "react-router-dom";

function Header() {
    const { theme } = useContext(ThemeContext);

    const nickname = useStore(state => state.nickname);

    return (
        <>
            <header className={`${theme && styles.dark}`}>
                <div className={styles.container}>
                    <Link to='/'>
                        <img
                            src={theme ? logoDark : logoGreen}
                            className={styles.logo}
                        />
                    </Link>
                    <Navigation></Navigation>
                    <div className={styles.info}>
                        <p className={styles.nickname}>{nickname || "nickname"}</p>
                        <div className={styles.dropdown}>
                            <img
                                src={imagePlaceholder}
                                className={styles.avatar}
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
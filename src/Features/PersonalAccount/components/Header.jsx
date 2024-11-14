import { useContext, useRef } from "react";
import useStore from "../../../store";
import styles from "../styles/css/header.module.css"
import { ThemeContext } from "../../../ThemeContext";
import Navigation from "./Navigation";

function Header () {
    const {theme} = useContext(ThemeContext);

    const nickname = useStore(state => state.nickname);

    return (
        <>
            <header className={`${theme && styles.dark}`}>
                <div className={styles.container}>
                    <img
                        src={theme ? '../../../src/assets/logoDark.svg' : "https://raw.githubusercontent.com/jamb17/pay-crypto/ea98f7c2b493ec3bf3ea7109c0ca2b96a1e78262/casty%20pay%20logo.svg"}
                        className={styles.logo}
                    />
                    <Navigation></Navigation>
                    <div className={styles.info}>
                        <p className={styles.nickname}>{nickname || "nickname"}</p>
                        <div className={styles.dropdown}>
                            <img
                                src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/%D0%B7%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.svg"
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
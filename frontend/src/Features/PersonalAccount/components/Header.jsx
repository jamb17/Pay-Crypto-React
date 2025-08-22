import useStore from "../../../store";
import styles from "../styles/header.module.sass"
import Navigation from "./Navigation";
import imagePlaceholder from '@assets/image-placeholder.png'
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import ThemeSwitcher from '@components/ThemeSwitcher.jsx'
import { useRef, useState } from "react";
import useGsapSlideDown from '@hooks/useGsapSlideDown.js'

function Header() {

    const nickname = useStore(useShallow(state => state.nickname));

    const [dropDownOpened, setDropDownOpened] = useState(false)

    const dropdownMenuRef = useRef(null)
    useGsapSlideDown(dropdownMenuRef, {y: -40, scale: 1}, {duration: .5}, dropDownOpened)

    const handleClick = () => {
        setDropDownOpened(prev => !prev)
    }

    const logout = useStore(state => state.logout)

    return (
        <>
            <header>
                <div className={styles.container}>
                    <Link to='/'>
                        <div className={styles.logo} />
                    </Link>
                    <Navigation></Navigation>
                    <div className={styles.info}>
                        <p className={styles.nickname}>{nickname || "nickname"}</p>
                        <div className={styles.dropdown}>
                            <img
                                src={imagePlaceholder}
                                className={styles.avatar}
                            />
                            <div onClick={handleClick} style={dropDownOpened ? {transform: 'rotate(180deg)'} : {}} className={styles.dropdownBtn}></div>
                            {dropDownOpened && <>
                                <div className={styles.dropdownMenu} ref={dropdownMenuRef}>
                                    <div className={styles.themeSwitcherContainer}>
                                        <p>Theme:</p>
                                        <ThemeSwitcher />
                                    </div>
                                    <button onClick={logout} className={styles.logout}>Logout</button>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </header>
            <Navigation mobile></Navigation>
        </>
    );
};

export default Header;
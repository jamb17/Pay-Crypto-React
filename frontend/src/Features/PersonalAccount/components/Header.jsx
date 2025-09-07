import useStore from "../../../store";
import styles from "../styles/header.module.sass"
import Navigation from "./Navigation";
import imagePlaceholder from '@assets/image-placeholder.png'
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import ThemeSwitcher from '@components/ThemeSwitcher.jsx'
import { useRef, useState, useEffect } from "react";
import useGsapSlideDown from '@hooks/useGsapSlideDown.js'
import Loader from '@components/Loader.jsx'

function Header() {

    const nickname = useStore(useShallow(state => state.nickname))
    const avatar = useStore(state => state.avatar)

    const [dropDownOpened, setDropDownOpened] = useState(false)

    const dropdownMenuRef = useRef(null)
    useGsapSlideDown(dropdownMenuRef, {y: -40, scale: 1}, {duration: .5}, dropDownOpened)

    const dropdownRef = useRef(null)

    const handleClick = () => {
        setDropDownOpened(prev => !prev)
    }

    const logout = useStore(state => state.logout)

    useEffect(() => {
        const onPointerDown = e => {
            if (dropdownRef.current && 
                !dropdownRef.current.contains(e.target) && 
                dropdownMenuRef.current && 
                !dropdownMenuRef.current.contains(e.target)) {
                setDropDownOpened(false)
            }
        }

        const handleKeyDown = e => {
            e.key === 'Escape' && setDropDownOpened(false)
        }

        document.addEventListener("mousedown", onPointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("mousedown", onPointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }

    }, [])

    return (
        <>
            <header>
                <div className={styles.container}>
                    <Link to='/'>
                        <div className={styles.logo} />
                    </Link>
                    <Navigation></Navigation>
                    <div className={styles.info}>
                        {nickname ? 
                            <p className={styles.nickname}>{nickname}</p> : 
                            <Loader width='121px' height="24px" borderRadius="6px" />
                        }
                        <div className={styles.dropdown}>
                            <img
                                src={avatar !== '' ? avatar : imagePlaceholder}
                                className={styles.avatar}
                            />
                            <div ref={dropdownRef} onClick={handleClick} style={dropDownOpened ? {transform: 'rotate(180deg)'} : {}} className={styles.dropdownBtn}></div>
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
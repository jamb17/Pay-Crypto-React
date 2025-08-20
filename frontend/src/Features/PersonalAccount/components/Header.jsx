import useStore from "../../../store";
import styles from "../styles/header.module.sass"
import Navigation from "./Navigation";
import imagePlaceholder from '@assets/image-placeholder.png'
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

function Header() {

    const nickname = useStore(useShallow(state => state.nickname));

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
                        </div>
                    </div>
                </div>
            </header>
            <Navigation mobile></Navigation>
        </>
    );
};

export default Header;
import { useContext, useRef } from 'react';
import styles from '../styles/css/popUp.module.css';
import { ThemeContext } from '../../../ThemeContext';
import useGsapSlideUp from '../../../hooks/useGsapSlideUp';

export default function PopUp({setOpenPopUp}) {
    const {theme} = useContext(ThemeContext);

    const contentRef = useRef(null);
    useGsapSlideUp(contentRef, {}, {duration: .6})

    return (
        <div className={theme ? styles.containerDark : styles.container}>
            <div ref={contentRef} className={styles.content}>
                <img 
                    onClick={() => setOpenPopUp(false)} 
                    className={styles.closeIcon} 
                    src={theme ? "../../../src/assets/icon-close-dark.svg" : "../../../src/assets/icon-close.svg"}/>
                <h2>Create merchant</h2>
                <form>
                    {/* <label htmlFor="name">Name merchant:</label>
                    <input type="text" id='name' placeholder='Enter name'/> */}
                    <button className={theme ? "btn-primary dark" : "btn-primary"}>Create</button>
                </form>
            </div>
        </div>)
};
import { useContext, useRef } from 'react';
import styles from '../styles/css/actionSection.module.css';
import { ThemeContext } from '../../../ThemeContext';
import useGsapSlideUp from '@hooks/useGsapSlideUp';
import merchantIcon from '@assets/merchant-icon.svg'
import donateIcon from '@assets/donate-icon.svg'
import bgVector from '@assets/bg-vector.svg'
import bgVectorLight from '@assets/bg-vector-light.svg'
import openedMerchantIcon from '@assets/openedMerchantIcon.svg'

export default function ActionSection({ type, setOpenPopUp }) {
    const { theme } = useContext(ThemeContext);

    const containerRef = useRef(null);
    useGsapSlideUp(containerRef, { scale: 1 }, { duration: .6 });

    const defaultSection = <div ref={containerRef} style={theme ? { borderTop: 'none' } : {}} className={type === 'merchant' ? styles.container : styles.containerDonate}>
        <div className={styles.content}>
            <div className={styles.text}>
                <h2>Let’s create your first {type === 'merchant' ? 'merchant' : 'donate'}!</h2>
                <p>Time to accept payments!</p>
            </div>
            <button onClick={() => setOpenPopUp(true)} className={styles.createBtn}>
                <div className={styles.plusIcon} />
                Create
            </button>
        </div>
        <img className={styles.illustration} src={type === 'merchant' ? merchantIcon : donateIcon} />
        <img className={styles.bgVector} src={type === 'merchant' ? bgVectorLight : bgVector} />
    </div>

    const openedSection = <div className={styles.containerOpened}>
        <div className={styles.content}>
            <div className={styles.text}>
                <h2>Your merchant accounts</h2>
                <p>Time to accept payments!</p>
            </div>
            <img src={openedMerchantIcon} />
        </div>
        <ul className={styles.accountsList}>
            <li className={styles.account}>
                <img src="" className={styles.avatar} />
                <div className={styles.info}>
                    <p>name</p>
                    <p>name</p>
                </div>
            </li>
        </ul>
        <div className={styles.btnContainer}>
                <button onClick={() => setOpenPopUp(true)} className={styles.createBtn}>
                    {/* <div className={styles.plusIcon} /> */}
                    Create new merchant account
                </button>
            </div>
    </div>

    return type.includes('opened') ? openedSection : defaultSection
};
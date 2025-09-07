import { useContext, useRef } from 'react';
import styles from '../styles/actionSection.module.sass';
import { ThemeContext } from '../../../ThemeContext';
import useGsapSlideUp from '@hooks/useGsapSlideUp';
import merchantIcon from '@assets/merchant-icon.svg'
import donateIcon from '@assets/donate-icon.svg'
import bgVector from '@assets/bg-vector.svg'
import bgVectorLight from '@assets/bg-vector-light.svg'
import openedMerchantIcon from '@assets/openedMerchantIcon.svg'
import openedDonateIcon from '@assets/openedDonateIcon.svg'

export default function ActionSection({ type, setOpenPopUp, setPopUpType, merchant = [], donate = [] }) {
    const { theme } = useContext(ThemeContext);  
      
    const containerRef = useRef(null);
    useGsapSlideUp(containerRef, { scale: 1 }, { duration: .6, delay: .3});

    const handleOpenPopUp = (popUpType) => {
        setOpenPopUp(true)
        setPopUpType(popUpType)
    }

    const defaultSection = <div ref={containerRef} style={theme ? { borderTop: 'none' } : {}} className={type.includes('merchant') ? styles.container : styles.containerDonate}>
        <div className={styles.content}>
            <div className={styles.text}>
                <h2>Let’s create your first {type.includes('merchant') ? 'merchant' : 'donate'}!</h2>
                <p>Time to accept payments!</p>
            </div>
            <button onClick={() => {type.includes('merchant') ? handleOpenPopUp('merchant') : handleOpenPopUp('donate')}} className={styles.createBtn}>
                <div className={styles.plusIcon} />
                Create
            </button>
        </div>
        <img className={styles.illustration} src={type.includes('merchant') ? merchantIcon : donateIcon} />
        <img className={styles.bgVector} src={type.includes('merchant') ? bgVectorLight : bgVector} />
    </div>

    const merchantList = merchant.map((merchant, index) => {
        return (<li className={styles.account} key={index}>
                {merchant.file !== '' ? <img src={merchant?.file} className={styles.avatar} /> : <div className={styles.avatar}>{merchant?.name[0]}</div>}
                <div className={styles.info}>
                    <p>{merchant?.name}</p>
                </div>
            </li>)
    })

    const donateList = donate.map((e, index) => {
        return (<li className={styles.account} key={index}>
                {e.file !== '' ? <img src={e?.file} className={styles.avatar} /> : <div className={styles.avatar}>{e?.name[0]}</div>}
                <div className={styles.info}>
                    <p>{e?.name}</p>
                </div>
            </li>)
    })

    const openedSection = <div ref={containerRef} className={type.includes('merchant') ? styles.containerOpened : styles.containerDonateOpened}>
        <div className={styles.content}>
            <div className={styles.text}>
                <h2>Your {type.includes('merchant') ? "merchant" : "donate"} accounts</h2>
                <p>Time to accept payments!</p>
            </div>
            <img src={type.includes('merchant') ? openedMerchantIcon : openedDonateIcon} />
        </div>
        <ul className={styles.accountsList}>
            {type.includes('merchant') ? merchantList : donateList}
        </ul>
        <div className={styles.btnContainer}>
                <button onClick={() => {type.includes('merchant') ? handleOpenPopUp('merchant') : handleOpenPopUp('donate')}} className={styles.createBtn}>
                    <div className={styles.plusIcon} />
                    Create new {type.includes('merchant') ? 'merchant' : 'donate'} account
                </button>
            </div>
    </div>
    return type.includes('opened') ? openedSection : defaultSection
};
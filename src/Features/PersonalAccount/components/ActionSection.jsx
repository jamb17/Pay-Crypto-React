import { useContext, useRef } from 'react';
import styles from '../styles/css/actionSection.module.css';
import { ThemeContext } from '../../../ThemeContext';
import useGsapSlideUp from '@hooks/useGsapSlideUp';
import merchantIcon from '@assets/merchant-icon.svg'
import donateIcon from '@assets/donate-icon.svg'
import bgVector from '@assets/bg-vector.svg'
import bgVectorLight from '@assets/bg-vector-light.svg'

export default function ActionSection ({type, setOpenPopUp}) {
    const {theme} = useContext(ThemeContext);

    const containerRef = useRef(null);
    useGsapSlideUp(containerRef, {scale: 1}, {duration: .6});

    return (<>
        <div ref={containerRef} style={theme ? {borderTop: 'none'} : {}} className={type === 'merchant' ? styles.container : styles.containerDonate}>
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
            <img className={styles.illustration} src={type === 'merchant' ? merchantIcon : donateIcon}/>
            <img className={styles.bgVector} src={type === 'merchant' ? bgVectorLight : bgVector}/>
        </div>
    </>)
};
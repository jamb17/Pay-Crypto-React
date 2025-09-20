import { useRef, useState } from 'react';
import styles from '../styles/actionSection.module.sass';
import useGsapSlideUp from '@hooks/useGsapSlideUp';
import merchantIcon from '@assets/merchant-icon.svg'
import donateIcon from '@assets/donate-icon.svg'
import bgVector from '@assets/bg-vector.svg'
import bgVectorLight from '@assets/bg-vector-light.svg'
import openedMerchantIcon from '@assets/openedMerchantIcon.svg'
import openedDonateIcon from '@assets/openedDonateIcon.svg'
import deleteIcon from '@assets/icon-delete.svg';
import $api from '@api/api';
import useError from '@hooks/useError.js'

export default function ActionSection({ type, setOpenPopUp, setPopUpType, setMerchant, merchant = [], setDonate, donate = [], setLoading }) {

    const API_URL = import.meta.env.VITE_API_URL + '/user'

    const containerRef = useRef(null);
    useGsapSlideUp(containerRef, { scale: 1 }, { duration: .6, delay: .3 });

    const handleOpenPopUp = (popUpType) => {
        setOpenPopUp(true)
        setPopUpType(popUpType)
    }

    const setError = useError()

    const handldeAccountDeletion = (accountType, accountName) => {
        const API_ENDPOINT = accountType === 'donate' ? API_URL + `/deleteDonateAccount/${accountName}` : API_URL + `/deleteMerchantAccount/${accountName}`

        setLoading('pending')

        $api.delete(API_ENDPOINT,
            { headers: { 'Content-Type': 'text/plain' } }
        ).then(res => {
            console.log(res)
            accountType === 'donate' ?
                setDonate(prev => prev.filter(item => item.name !== accountName)) : setMerchant(prev => prev.filter(item => item.name !== accountName))
            setError('Account deleted', true)
        }).catch(e => {
            console.log(e)
            setError(e.message)
        }).finally(() => setLoading('loaded'))
    }

    const defaultSection = <div ref={containerRef} className={type.includes('merchant') ? styles.container : styles.containerDonate}>
        <div className={styles.content}>
            <div className={styles.text}>
                <h2>Let’s create your first {type.includes('merchant') ? 'merchant' : 'donate'}!</h2>
                <p>Time to accept payments!</p>
            </div>
            <button onClick={() => { type.includes('merchant') ? handleOpenPopUp('merchant') : handleOpenPopUp('donate') }} className={styles.createBtn}>
                <div className={styles.plusIcon} />
                Create
            </button>
        </div>
        <img className={styles.illustration} src={type.includes('merchant') ? merchantIcon : donateIcon} />
        <img className={styles.bgVector} src={type.includes('merchant') ? bgVectorLight : bgVector} />
    </div>

    const merchantList = merchant.map((merchant, index) => {
        return (<li className={styles.account} key={index}>
            <div className='flex items-center gap-[12px]'>
                {merchant.file !== '' ? <img src={merchant?.file} className={styles.avatar} /> : <div className={styles.avatar}>{merchant?.name[0]}</div>}
                <div className={styles.info}>
                    <p>{merchant?.name}</p>
                </div>
            </div>
            <button onClick={() => handldeAccountDeletion('merchant', merchant.name)} className={styles.deleteBtn}>
                <img src={deleteIcon} />
            </button>
        </li>)
    })

    const donateList = donate.map((e, index) => {
        return (<li className={styles.account} key={index}>
            <div className='flex items-center gap-[12px]'>
                {e.file !== '' ? <img src={e?.file} className={styles.avatar} /> : <div className={styles.avatar}>{e?.name[0]}</div>}
                <div className={styles.info}>
                    <p>{e?.name}</p>
                </div>
            </div>
            <button onClick={() => handldeAccountDeletion('donate', e.name)} className={styles.deleteBtn}>
                <img src={deleteIcon} />
            </button>
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
            <button onClick={() => { type.includes('merchant') ? handleOpenPopUp('merchant') : handleOpenPopUp('donate') }} className={styles.createBtn}>
                <div className={styles.plusIcon} />
                Create new {type.includes('merchant') ? 'merchant' : 'donate'} account
            </button>
        </div>
    </div>
    return type.includes('opened') ? openedSection : defaultSection
};
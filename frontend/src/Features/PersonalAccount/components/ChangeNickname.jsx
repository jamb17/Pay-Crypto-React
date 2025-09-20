import { useState } from 'react'
import styles from '../styles/settings.module.sass'
import Loader from '@components/Loader.jsx'
import saveIcon from '@assets/save-icon.svg'
import Input from '@components/Input.module.jsx'
import $api from '@api/api.js'
import useStore from '../../../store.jsx'
import { useShallow } from 'zustand/react/shallow'
import useError from '@hooks/useError.js'
import { useRef } from 'react'
import useGsapSlideUp from '@hooks/useGsapSlideUp.js'

export const ChangeNickname = () => {

    const { email, setNickname } = useStore(useShallow(state => ({
        email: state.email,
        setNickname: state.setNickname
    })))

    const containerRef = useRef(null)
    useGsapSlideUp(containerRef, { scale: 1 }, { duration: .6, delay: .3 })

    const [dataIsFetching, setdataIsFetching] = useState(false)

    const [formData, setFormData] = useState('')

    const API_URL = import.meta.env.VITE_API_URL + '/user'

    const setError = useError()

    const handleChange = (e) => {
        setFormData(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setdataIsFetching(true)
        $api.patch(API_URL + '/changeNickname',
            {
                email: email,
                nickname: formData
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    setNickname(formData)
                    setFormData('')
                    setError('Nickname changed', true)
                }
            }).catch(e => {
                console.log(e)
                setError(e.message)
            }).finally(() => setdataIsFetching(false))
    }

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.heading}>Change Nickname</div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <Input
                    id="nickname"
                    type="text"
                    placeholder="Enter your new nickname"
                    value={formData}
                    onChange={handleChange}
                />
                {!dataIsFetching ?
                    <button className='btn-primary mt-[8px]' type='submit'>
                        <img src={saveIcon} />
                        Change nickname
                    </button> :
                    <Loader
                        width={"100%"}
                        height={"44px"}
                        borderRadius={"8px"}
                        marginTop={"8px"}
                        accentBg
                    />
                }
            </form>
        </div>)
}
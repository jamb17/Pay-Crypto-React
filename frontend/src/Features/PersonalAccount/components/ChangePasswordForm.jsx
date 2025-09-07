import styles from '../styles/settings.module.sass'
import Input from '@components/Input.module.jsx'
import saveIcon from '@assets/save-icon.svg'
import { useState, useRef } from 'react'
import $api from '@api/api.js'
import Loader from '@components/Loader.jsx'
import useStore from '../../../store.jsx'
import useError from '@hooks/useError.js'
import useGsapSlideUp from '@hooks/useGsapSlideUp.js'

export const ChangePasswordForm = () => {

    const API_URL = import.meta.env.VITE_API_URL + '/user'

    const email = useStore(state => state.email)

    const containerRef = useRef(null)
    useGsapSlideUp(containerRef, { scale: 1 }, { duration: .6, delay: .3 });


    const [formData, setFormData] = useState({
        oldPassword: {
            val: '',
            type: 'password'
        },
        newPassword: {
            val: '',
            type: 'password'
        },
        repeatPassword: {
            val: '',
            type: 'password'
        }
    })

    const togglePasswordVisibility = (e) => {
        const name = e.target.parentElement.querySelector("input").name
        if (formData[name].type === "password") {
            setFormData(prev => ({ ...prev, [name]: { ...prev[name], type: 'text' } }))
        } else setFormData(prev => ({ ...prev, [name]: { ...prev[name], type: 'password' } }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: { ...prev[name], val: value } }));
    }

    const [errors, setErrors] = useState({
        wrongPassword: false,
        passwordMissmatch: false
    })

    const [dataIsFetching, setdataIsFetching] = useState(false)

    const setError = useError()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.newPassword.val !== formData.repeatPassword.val) {
            setErrors({ wrongPassword: false, passwordMissmatch: true })
            return
        } else {
            setErrors({ wrongPassword: false, passwordMissmatch: false })
        }
        setdataIsFetching(true)
        await $api.patch(API_URL + "/changePassword",
            {
                email: email,
                oldPassword: formData.oldPassword.val,
                newPassword: formData.newPassword.val
            }).then(res => {
                console.log(res)
                setFormData({
                    oldPassword: {
                        val: '',
                        type: 'password'
                    },
                    newPassword: {
                        val: '',
                        type: 'password'
                    },
                    repeatPassword: {
                        val: '',
                        type: 'password'
                    }
                })
                setErrors({
                    wrongPassword: false,
                    passwordMissmatch: false
                })
                setError("Password changed", true)
            }).catch(e => {
                console.log(e.response.data)
                setError(e.response.data)
                if (e.response.data === "Wrong password") {
                    setErrors(prev => ({ ...prev, wrongPassword: true }))
                }
            }).finally(() => setdataIsFetching(false))
    }

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.heading}>Change Password</div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <Input
                    id="oldPassword"
                    type={formData.oldPassword.type}
                    value={formData.oldPassword.val}
                    showIcon={true}
                    label="Old password"
                    placeholder="Enter your password"
                    error={errors.wrongPassword ? "WrongPassword" : false}
                    togglePasswordVisibility={togglePasswordVisibility}
                    onChange={handleChange}
                />
                <Input
                    id="newPassword"
                    type={formData.newPassword.type}
                    value={formData.newPassword.val}
                    showIcon={true}
                    label="New password"
                    placeholder="Enter your new password"
                    togglePasswordVisibility={togglePasswordVisibility}
                    onChange={handleChange}
                />
                <Input
                    id="repeatPassword"
                    type={formData.repeatPassword.type}
                    value={formData.repeatPassword.val}
                    showIcon={true}
                    label="Repeat password"
                    placeholder="Repeat your new password"
                    error={errors.passwordMissmatch ? 'Password mismatch' : false}
                    togglePasswordVisibility={togglePasswordVisibility}
                    onChange={handleChange}
                />
                {!dataIsFetching ?
                    <button className='btn-primary mt-[8px]' type='submit'>
                        <img src={saveIcon} />
                        Change password
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
        </div>
    )
}
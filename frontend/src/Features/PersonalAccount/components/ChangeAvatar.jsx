import { useState, useRef } from 'react';
import styles from '../styles/settings.module.sass';
import imagePlaceholder from '@assets/image-placeholder.png';
import deleteIcon from '@assets/icon-delete.svg';
import Loader from '@components/Loader.jsx';
import saveIcon from '@assets/save-icon.svg';
import useStore from '../../../store';
import $api from '@api/api.js'
import useError from '@hooks/useError.js'
import { useShallow } from 'zustand/react/shallow';
import useGsapSlideDown from '@hooks/useGsapSlideDown.js'

export const ChangeAvatar = () => {

    const API_URL = import.meta.env.VITE_API_URL + '/user'

    const { email, avatar, setAvatar } = useStore(useShallow(state => ({
        email: state.email,
        avatar: state.avatar,
        setAvatar: state.setAvatar
    })));

    const containerRef = useRef(null) 
    useGsapSlideDown(containerRef, { scale: 1 }, { duration: .6, delay: .3});

    const [formData, setFormData] = useState('')

    const [loading, setLoading] = useState(false)

    const setError = useError()

    const fileInput = useRef(null);
    const handleClick = (e) => {
        e.preventDefault()
        fileInput.current.click();
    };

    const handleChange = (e) => {
        setFormData(e.target.files[0]);
    }

    const handleRemoveFile = (e) => {
        e.preventDefault();
        setFormData('');
        fileInput.current.value = null
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await $api.patch(API_URL + "/changeAvatar",
            {
                email: email,
                file: formData
            },
            { headers: { 'Content-Type': 'multipart/form-data' } }
        ).then(res => {
                setError("Avatar updated", true)
            }).catch(e => {
                setError(e.message)
                console.log(e)
            }).finally(() => setLoading(false))
    }

return (
    <div ref={containerRef} className={styles.container}>
        <div className={styles.heading}>Change Avatar</div>
        <form onSubmit={handleSubmit}>
            <input
                className='hidden'
                type="file"
                accept='image/png, image/jpg, .gif'
                ref={fileInput}
                onChange={handleChange}
            />
            <div className={styles.uploadContainer}>
                <img className={styles.imagePreview}
                    src={formData !== '' ? URL.createObjectURL(formData) : imagePlaceholder}
                />
                <div className={styles.uploadContent}>
                    <p className={styles.uploadLabel}>The recommended size for an avatar is 500x500 pixels. Formats - .JPG, .PNG or .GIF. The maximum file size is 3 MB.</p>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.uploadBtn} onClick={handleClick}>
                            <div className={styles.uploadIcon} />
                            {formData === '' ? <p>Upload avatar</p> : <p className={styles.avatarUploaded}>Change avatar</p>}
                        </button>
                        <button onClick={handleRemoveFile} className={formData === '' ? styles.deleteBtn : styles.deleteBtnActive}>
                            <img src={deleteIcon} />
                        </button>
                    </div>
                </div>
            </div>
            {!loading ?
                <button type="submit" className="btn-primary">
                    <img src={saveIcon} />
                    Change avatar
                </button> :
                <Loader
                    width={"100%"}
                    height={"44px"}
                    borderRadius={"8px"}
                    accentBg
                />}
        </form>
    </div>
)
}
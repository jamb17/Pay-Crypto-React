import { useEffect, useRef, useState } from 'react';
import styles from '../styles/popUp.module.sass';
import useGsapSlideUp from '@hooks/useGsapSlideUp';
import Input from '@components/Input.module.jsx';
import imagePlaceholder from '@assets/image-placeholder.png'
import deleteIcon from '@assets/icon-delete.svg';
import $api from '@api/api';
import useError from '@hooks/useError.js'
import useStore from '../../../store';
import Loader from '@components/Loader.jsx'

export default function PopUp({ setOpenPopUp, popUpType, setMerchant, setDonate }) {

    const [formData, setFormData] = useState({
        name: '',
        file: ''
    })

    const [loading, setLoading] = useState(false)

    const email = useStore(state => state.email);

    const fileInput = useRef(null);
    const handleClick = (e) => {
        e.preventDefault()
        fileInput.current.click();
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    }
    const handleRemoveFile = (e) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, file: '' }));
        fileInput.current.value = null
    }

    const apiEndpoint = popUpType === 'merchant' ? '/createMerchantAccount' : '/createDonateAccount'

    const setError = useError()

    const contentRef = useRef(null);
    useGsapSlideUp(contentRef, {}, { duration: .6 })

    useEffect(() => {
        const onPointerDown = e => {
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                setOpenPopUp(false)
            }
        }

        const handleKeyDown = e => {
            e.key === 'Escape' && setOpenPopUp(false)
        };

        document.addEventListener("mousedown", onPointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("mousedown", onPointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', email);
        if (formData.file) {
            form.append('file', formData.file);
        };

        $api.post(apiEndpoint, form).then(res => {
            if (res.status === 201) {
                if (formData.file !== '') {
                    formData.file = URL.createObjectURL(formData.file)
                }
                popUpType === 'merchant' ? setMerchant(prev => [...prev, { name: formData.name, file: formData.file }]) : setDonate(prev => [...prev, { name: formData.name, file: formData.file }])
                setOpenPopUp(false)
                setError('Account created', true)
            }
        }).catch(e => {
            console.log(e);
            if (e.response) {
                setError(e.response.data);
            } else setError(e.message)
            setLoading(false)
        })
    };

    return (
        <div className={styles.container}>
            <div ref={contentRef} className={styles.content}>
                <div
                    onClick={() => setOpenPopUp(false)}
                    className={styles.closeIcon} />
                <h2>Create {popUpType}</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="name"
                        value={formData.name}
                        placeholder='Enter name'
                        label={`Name ${popUpType}`}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        type='text'
                    />
                    <input
                        className={styles.realFileInput}
                        type="file"
                        accept='image/png, image/jpeg, .gif'
                        ref={fileInput}
                        onChange={handleChange}
                    />
                    <div className={styles.uploadContainer}>
                        <img className={styles.imagePreview}
                            src={formData.file !== '' ? URL.createObjectURL(formData.file) : imagePlaceholder}
                        />
                        <div className={styles.uploadContent}>
                            <p className={styles.uploadLabel}>The recommended size for an avatar is 500x500 pixels. Formats - .JPG, .PNG or .GIF. The maximum file size is 3 MB.</p>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.uploadBtn} onClick={handleClick}>
                                    <div className={styles.uploadIcon} />
                                    {formData.file === '' ? <p>Upload avatar</p> : <p className={styles.avatarUploaded}>Change avatar</p>}
                                </button>
                                <button onClick={handleRemoveFile} className={formData.file === '' ? styles.deleteBtn : styles.deleteBtnActive}>
                                    <img src={deleteIcon} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {!loading ?
                        <button type="submit" className="btn-primary">Create</button> :
                        <Loader
                            width={"100%"}
                            height={"44px"}
                            borderRadius={"8px"}
                            accentBg
                        />}
                </form>
            </div>
        </div>)
};
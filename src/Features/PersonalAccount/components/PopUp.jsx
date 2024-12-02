import { useContext, useRef, useState } from 'react';
import styles from '../styles/css/popUp.module.css';
import { ThemeContext } from '../../../ThemeContext';
import useGsapSlideUp from '@hooks/useGsapSlideUp';
import Input from '@components/Input.module.jsx';
import iconClose from '@assets/icon-close.svg'; 
import iconCloseDark from '@assets/icon-close-dark.svg'; 
import imagePlaceholder from '@assets/image-placeholder.png'
import uploadIconDark from '@assets/upload-icon-light.svg';
import uploadIcon from '@assets/upload-icon.svg';
import deleteIcon from '@assets/icon-delete.svg';
import $api from '@api/api';
import useError from '@hooks/useError.js'
import useStore from '../../../store';

export default function PopUp({ setOpenPopUp }) {
    const { theme } = useContext(ThemeContext);

    const [formData, setFormData] = useState({
        name: '',
        file: ''
    })

    const email = useStore(state => state.email);

    const fileInput = useRef(null);
    const handleClick = (e) => {
        e.preventDefault()
        fileInput.current.click();
    };

    const handleChange = (e) => {
        if (formData.file === '') {
            setFormData(prev => ({ ...prev, file: e.target.files[0] }));        
        }
    }

    const handleRemoveFile = (e) => {
        e.preventDefault();
        setFormData(prev => ({...prev, file: ''})); 
        fileInput.current.value = null
    }

    const setError = useError()

    const contentRef = useRef(null);
    useGsapSlideUp(contentRef, {}, { duration: .6 })

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', email);
        if (formData.file) {
            form.append('file', formData.file);
        };

        $api.post('/createMerchantAccount', form, { 
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);
            if (e.response) {
                setError(e.response.data);
            } else setError(e.message)
        })
    };

    return (
        <div className={theme ? styles.containerDark : styles.container}>
            <div ref={contentRef} className={styles.content}>
                <img
                    onClick={() => setOpenPopUp(false)}
                    className={styles.closeIcon}
                    src={theme ? iconCloseDark : iconClose} />
                <h2>Create merchant</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="name"
                        value={formData.name}
                        placeholder='Enter name'
                        label='Name merchant'
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        type='text'
                    />
                    <input
                        className={styles.realFileInput}
                        type="file"
                        accept='image/png, image/jpg, .gif'
                        ref={fileInput}
                        onChange={handleChange}
                    />
                    <div className={styles.uploadContainer}>
                        <img className={styles.imagePreview} 
                            src={formData.file !== '' ? URL.createObjectURL(formData.file) : imagePlaceholder} 
                        />
                        <div className={styles.uploadContent}>
                            <p className={styles.uploadLabel}>The recommended size for an avatar is 500x500 pixels. Formats - .JPG, .PNG or .GIF. The maximum file size is 2 MB.</p>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.uploadBtn} onClick={handleClick}>
                                    <img src={theme ? uploadIconDark : uploadIcon} />
                                    <p>Upload avatar</p>
                                </button>
                                <button onClick={handleRemoveFile} className={formData.file === '' ? styles.deleteBtn : styles.deleteBtnActive}>
                                    <img src={deleteIcon} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className={theme ? "btn-primary dark" : "btn-primary"}>Create</button>
                </form>
            </div>
        </div>)
};
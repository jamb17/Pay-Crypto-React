import { useContext, useRef, useState } from 'react';
import styles from '../styles/css/popUp.module.css';
import { ThemeContext } from '../../../ThemeContext';
import useGsapSlideUp from '../../../hooks/useGsapSlideUp';
import Input from '../../components/Input.module.jsx';

export default function PopUp({ setOpenPopUp }) {
    const { theme } = useContext(ThemeContext);

    const [formData, setFormData] = useState({
        name: '',
        file: ''
    })

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

    const contentRef = useRef(null);
    useGsapSlideUp(contentRef, {}, { duration: .6 })

    return (
        <div className={theme ? styles.containerDark : styles.container}>
            <div ref={contentRef} className={styles.content}>
                <img
                    onClick={() => setOpenPopUp(false)}
                    className={styles.closeIcon}
                    src={theme ? "../../../src/assets/icon-close-dark.svg" : "../../../src/assets/icon-close.svg"} />
                <h2>Create merchant</h2>
                <form>
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
                            src={formData.file !== '' ? URL.createObjectURL(formData.file) : "../../../src/assets/image-placeholder.png"} 
                        />
                        <div className={styles.uploadContent}>
                            <p className={styles.uploadLabel}>The recommended size for an avatar is 500x500 pixels. Formats - .JPG, .PNG or .GIF. The maximum file size is 2 MB.</p>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.uploadBtn} onClick={handleClick}>
                                    <img src={theme ? "../../../src/assets/upload-icon-light.svg" : "../../../src/assets/upload-icon.svg"} />
                                    <p>Upload avatar</p>
                                </button>
                                <button onClick={handleRemoveFile} className={formData.file === '' ? styles.deleteBtn : styles.deleteBtnActive}>
                                    <img src="../../../src/assets/icon-delete.svg" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className={theme ? "btn-primary dark" : "btn-primary"}>Create</button>
                </form>
            </div>
        </div>)
};
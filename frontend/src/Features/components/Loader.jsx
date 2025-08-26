import styles from "./styles/Loader.module.sass"

const Loader = (props) => {

    return <div
        style={props}
        className={props.accentBg ? styles.loaderAccentBg : styles.loader}>
    </div>
}

export default Loader
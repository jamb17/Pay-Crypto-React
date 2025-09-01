import { useContext } from "react";
import { ErrorContext } from "../ErrorContext";


const useError = () => {
    const {setErrorMessage, setIsAlert} = useContext(ErrorContext);

    const toggleAlert = (message, isAlert = false) => {
        setErrorMessage(message)
        isAlert ? setIsAlert(true) : setIsAlert(false)
    }

    return toggleAlert;
};

export default useError; 
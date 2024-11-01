import { useContext } from "react";
import { ErrorContext } from "../ErrorContext";


const useError = () => {
    const {setErrorMessage} = useContext(ErrorContext);
    return setErrorMessage;
};

export default useError; 
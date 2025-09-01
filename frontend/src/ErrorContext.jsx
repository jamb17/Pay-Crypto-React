import { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isAlert, setIsAlert] = useState(false)

    return (
        <ErrorContext.Provider value={{errorMessage, setErrorMessage, isAlert, setIsAlert}}>
            {children}
        </ErrorContext.Provider>
    );

};
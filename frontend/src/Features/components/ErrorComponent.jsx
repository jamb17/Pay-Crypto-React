import { useContext, useEffect, useRef } from "react";
import { ErrorContext } from "../../ErrorContext";
import useGsapSlideDown from "@hooks/useGsapSlideDown";

function ErrorComponent() {
    const {errorMessage, setErrorMessage} = useContext(ErrorContext);
    const errorRef = useRef(null);
    useGsapSlideDown(errorRef, {scale: 1}, {delay: 0, duration: 0.5}, errorMessage);

    useEffect(() => {
        let timer;
        if (errorMessage) {
            timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        };
        return () => clearTimeout(timer);
    }, [errorMessage, setErrorMessage]);

    return !errorMessage ? null : (<>
        <div ref={errorRef} className="absolute z-50 top-4 flex items-center justify-center p-3 bg-[--error-color] text-white rounded-lg"> 
            <p>{errorMessage}</p>
        </div>
    </>);

}

export default ErrorComponent;
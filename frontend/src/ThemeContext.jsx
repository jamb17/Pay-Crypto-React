import { createContext, useLayoutEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(false);
    // useLayoutEffect(() => {
    //     if (window.localStorage.getItem('theme') === 'dark') {
    //         setTheme(true);
    //     } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !window.localStorage.getItem('theme')) {
    //         setTheme(true);
    //         window.localStorage.setItem('theme', 'dark');
    //     }
    // }, []);   

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};
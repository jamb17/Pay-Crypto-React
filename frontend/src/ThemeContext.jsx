import { createContext, useLayoutEffect, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    
    // useEffect(() => {
    //     const savedTheme = localStorage.getItem('theme');
    //     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    //     const currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
    //     setTheme(currentTheme);

    //     const handleChange = (e) => {
    //         if (!localStorage.getItem('theme')) {
    //             const newTheme = e.matches ? 'dark' : 'light';
    //             document.documentElement.setAttribute('data-theme', newTheme);
    //             setTheme(newTheme);
    //         }
    //     };

    //     prefersDark.addEventListener('change', handleChange);

    //     return () => {
    //         prefersDark.removeEventListener('change', handleChange);
    //     };
    // }, []);


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};
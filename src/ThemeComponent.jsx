import { useContext, useEffect } from "react"
import { ThemeContext } from "./ThemeContext"

export default function ThemeComponent() {

  const { theme, setTheme } = useContext(ThemeContext);
  const lightThemeIconPath = '../../../src/assets/lightThemeIcon.svg';
  const darkThemeIconPath = '../../../src/assets/darkThemeIcon.svg';

  useEffect(() => {
    if (theme) {
      document.body.style.background = "radial-gradient(circle, #1E1E1E, #121212)"
    } else {
      document.body.style.background = "";
    }
  }, [theme]);

  const handleClick = () => {
    setTheme(!theme);
    if (theme) {
      window.localStorage.setItem('theme', 'light');
    } else window.localStorage.setItem('theme', 'dark');
  }

  return (<>
    <div 
      className={`rounded-full absolute bottom-12 right-12 w-10 h-10 cursor-pointer transition-all`} 
      style={{backgroundImage: `url(${theme ? lightThemeIconPath : darkThemeIconPath})`}}
      onClick={handleClick}
      ></div>
  </>)
};
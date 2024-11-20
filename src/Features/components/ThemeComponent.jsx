import { useContext, useEffect } from "react"
import { ThemeContext } from "../../ThemeContext"
import lightThemeIcon from '@assets/lightThemeIcon.svg'
import darkThemeIcon from '@assets/darkThemeIcon.svg'

export default function ThemeComponent() {

  const { theme, setTheme } = useContext(ThemeContext);
  
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
      style={{backgroundImage: `url(${theme ? lightThemeIcon : darkThemeIcon})`}}
      onClick={handleClick}
      ></div>
  </>)
};
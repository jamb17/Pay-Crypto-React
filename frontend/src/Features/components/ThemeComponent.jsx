import { useContext } from "react"
import { ThemeContext } from "../../ThemeContext"
import lightThemeIcon from '@assets/lightThemeIcon.svg'
import darkThemeIcon from '@assets/darkThemeIcon.svg'

export default function ThemeComponent() {

  const { theme, setTheme } = useContext(ThemeContext)

  const handleClick = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')

    if (currentTheme === "dark") {
      document.documentElement.setAttribute('data-theme', 'light');
      window.localStorage.setItem('theme', 'light');
      setTheme('light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark')
    }

  }

  // return (<>
  //   <div
  //     className={`rounded-full absolute z-50 w-10 h-10 cursor-pointer transition-all bottom-4 right-4 sm:bottom-12 sm:right-12`}
  //     style={{ backgroundImage: `url(${theme === 'dark' ? lightThemeIcon : darkThemeIcon})` }}
  //     onClick={handleClick}
  //   ></div>
  // </>)
};
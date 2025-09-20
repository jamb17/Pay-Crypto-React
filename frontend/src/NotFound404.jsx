import { Link } from 'react-router-dom'
import FuzzyText from './reactbits/FuzzyText/FuzzyText.jsx'
import { useEffect, useState } from 'react'

export const NotFound404 = () => {

    const [color, setColor] = useState('#fff')
 
    useEffect(() => {
        const theme = document.documentElement.getAttribute('data-theme')

        theme === 'dark' ? setColor('#fff') : setColor('#111')

    }, [])

    return <>
        <FuzzyText baseIntensity={.3} hoverIntensity={.8} color={color}>404</FuzzyText>
        <div className='mt-5'></div>
        <FuzzyText color={color} >Not Found</FuzzyText>
        <Link to='/' className='btn-primary mt-20 max-w-[200px]'>Home</Link>
    </>
} 
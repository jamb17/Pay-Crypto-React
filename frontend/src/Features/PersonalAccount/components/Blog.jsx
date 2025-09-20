import GlitchText from '../../../reactbits/GlitchText/GlitchText.jsx'
import Header from './Header.jsx'

export const Blog = () => {
    return (<>
        <Header />
        <GlitchText
            speed={1} >
            This page is under development
        </GlitchText>
    </>)
}
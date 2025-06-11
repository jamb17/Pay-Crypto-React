import { useEffect } from "react";
import { gsap } from "gsap";

const useGsapSlideUp = (ref, setOptions = {}, toOptions = {}) => {
    useEffect(() => {
        let tween;

        if (ref.current) {

            gsap.set(ref.current, {
                y: 120,
                scale: 0.8,
                opacity: 0,
                ...setOptions
            })
          
            tween = gsap.to(ref.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                delay: .2,
                ...toOptions
            })
        }
        return () => {
            tween && tween.kill()
        }
    }, [])
}

export default useGsapSlideUp;
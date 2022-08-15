import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types'

export default function FadeInSection(props) {
    const [isVisible, setVisible] = useState(true);
    const domRef = useRef();
    
    useEffect(() => {
        const ref = domRef.current
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => entry.isIntersecting ? setVisible(true) : props.persistent ? undefined : setVisible(false))
        })
        observer.observe(ref)
        return () => observer.unobserve(ref)
    }, [props])

    return (
        <div className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${props.className}`} ref={domRef} id={props.id}>
            {props.children}
        </div>
    )
}

FadeInSection.propTypes = {
    persistent: PropTypes.bool,
    children: PropTypes.node,
}
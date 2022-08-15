import { useEffect } from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types'
import './Typewriter.scss';
const randomizeResponseTime = (min, max) => Math.floor(Math.random()*(max-min)) + min

function waitMs(ms) {
    if(ms instanceof Array) ms = randomizeResponseTime(...ms)
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Typewriter(props) {
    const [start, setStart] = useState(false)
    useEffect(() => {
        let timeout
        if(props.initialDelay){
            timeout = setTimeout(() => setStart(true), props.initialDelay)
        } else setStart(true)
        return () => clearTimeout(timeout)
    }, [props])
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const incCurrentWord = () => setCurrentWordIndex((currentWordIndex < props.words.length-1) ? currentWordIndex+1 : 0)
    const words = props.words.map((w,i) => <Word key={i} word={w} typeDelay={props.typeDelay} wordDelay={props.wordDelay} changeWord={incCurrentWord}/>)
    return (
        <span style={{verticalAlign: 'top'}}>
            {start && words[currentWordIndex]}
            {!start && <span className="input-cursor"></span>}
        </span>
    )
}

function Word(props) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [reverse, setReverse] = useState(false)

    let {typeDelay, wordDelay} = props
    
    useEffect(() => {
        const anim = async() => {
            if(((currentIndex <= props.word.length)&&!reverse) || ((currentIndex>0)&&reverse)){
                await waitMs(typeDelay);
                setCurrentIndex(currentIndex + (!reverse ? 1 : -1))
            } else {
                await waitMs(wordDelay);
                if(reverse) props.changeWord()
                setReverse(true)
            }
        }
        anim()
    }, [currentIndex,reverse, props, typeDelay, wordDelay])

    return (
        <div className="typewriter">
            <span className="sentence">{props.word.slice(0,currentIndex)}</span>
            <span className="input-cursor"></span>
        </div>
    )
}

Typewriter.propTypes = {
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    typeDelay: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    wordDelay: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    initialDelay: PropTypes.number
}
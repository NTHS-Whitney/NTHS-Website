import { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import './Typewriter.scss';
import { wait } from '@testing-library/user-event/dist/utils';

export default function Typewriter(props) {
    function waitMs(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [content, setContent] = useState('')

    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);

    async function type(){
        const word = props.words[wordIndex]
        while(letterIndex < word.length) {
            await waitMs(props.typeDelay)
            setContent(word.slice(0,letterIndex));
            setLetterIndex(letterIndex+1);
        }
    }
    
    async function del(){
        const word = props.words[wordIndex]
        while(letterIndex > 0){
            await waitMs(props.typeDelay)
            setContent(word.slice(0,letterIndex))
            setLetterIndex(letterIndex-1)
        }
    }


    useEffect(() => {
        const loop = async () => {
            await type()
            await waitMs(props.wordDelay)
            await del()
        }
        loop()
    },[])

    return (
        <div className="typewriter">
            <span className="sentence">{content}</span>
            <span className="input-cursor"></span>
        </div>
    )
}

Typewriter.defaultProps = {
    typeDelay: 100,
    wordDelay: 2000,
}

Typewriter.propTypes = {
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    typeDelay: PropTypes.number.isRequired,
    wordDelay: PropTypes.number.isRequired
}
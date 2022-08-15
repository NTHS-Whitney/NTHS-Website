import { useState, useEffect } from 'react'
import { parseMarkdownWithYamlFrontMatter } from '../../util/Utilities';
import PropTypes from 'prop-types'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../../Article.scss'
import { useRef } from 'react';
import { BsFillPersonFill,BsHourglass, BsCalendarDate, BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function MarkdownArticle(props) {
    const [loaded, setLoaded] = useState(false);
    const [content, setContent] = useState(null);
    const metadata = useRef(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/Pages/${props.name}`, {
                    headers: {
                        'Content-Type': 'text/plain',
                        'Accept': 'text/plain'
                    }
                })
                if(res.ok){
                    const text = await res.text()
                    const data = parseMarkdownWithYamlFrontMatter(text)
                    metadata.current = data.metadata;
                    setContent(data.markdown)
                    setLoaded(true);
                }
            } catch (e){
                console.log(`Unable to fetch page Pages/${props.name}`)
            }
        }
        load()
    },[props.name])
    
    return (
        <>
        {!loaded && <div className='loader'></div>}
        {loaded && <article>
            {metadata.current?.background && <div className="hero">
                <div className="hero-gradient"></div>
                <div className="hero-img" style={{backgroundImage: `url(/${metadata.current.background})`}}></div>
                <h1 className="hero-title">{metadata.current.heroTitle || metadata.current.title || ""}</h1>
            </div>}
            <main>
                <h1 className="title">{metadata.current?.title}</h1>
                <p className="descriptor">
                    {metadata.current?.author && <><span className="tooltip"><BsFillPersonFill /><span className="tooltip-text">Written by</span></span>{metadata.current.author}</>}
                    {!props.noReadingTime && <><span className="tooltip"><BsHourglass/><span className='tooltip-text'>Reading Time</span></span>{Math.ceil((content?.split(" ").length || 0 )/ 250)} min</>}
                    {metadata.current?.writtenOn && <><span className="tooltip"><BsCalendarDate /><span className="tooltip-text">Written on</span></span>{metadata.current.writtenOn}</>}
                    {metadata.current?.updatedOn && metadata.current.updatedOn !== metadata.current.writtenOn && <><span className="tooltip"><BsPencilSquare /><span className="tooltip-text">Updated on</span></span>{metadata.current.updatedOn}</>}
                </p>
                 <ReactMarkdown children={content} remarkPlugins={[[remarkGfm, {singleTilde: false}]]} components={{
                    a({href, ...props}) {
                        const match = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.exec(href)
                        return match ? <a href={href} target="_blank" rel="noreferrer noopener" {...props} /> : <Link to={'/'+href} {...props} />
                    }
                 }}/>
            </main>
        </article>}
        </>
    )
}

MarkdownArticle.propTypes = {
    name: PropTypes.string.isRequired,
    noReadingTime: PropTypes.bool,
}
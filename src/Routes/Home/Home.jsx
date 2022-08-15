import Typewriter from "../../Components/Typewriter/Typewriter";
import './HomeAnimations.scss'
import "./Home.scss"
import { shuffleArray } from "../../util/Utilities";
//import FadeInSection from "../../Components/FadeInSection/FadeInSection";
import { useEffect } from "react";
import { Link } from "react-router-dom";
//import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

const featured = shuffleArray(["explorers","creators", "doctors","engineers","performers","musicians","lawyers", "entrepreneurs", "actors","developers","architects","teachers","leaders"])

export default function Home(props) {

    useEffect(() => {
        /*disableBodyScroll(document.querySelector(".dramatic"))
        const t = setTimeout(() => enableBodyScroll(document.querySelector(".dramatic")), 4000)
        return () => {
            clearAllBodyScrollLocks()
            clearTimeout(t)
        }*/
    },[])

    return (
        <div id="home">
            <div className="dramatic">
                <div className="bg-gradient"></div>
                <div className="bg-img"></div>
                <div className="bg-cover"></div>
                <h1 className="org-name"><div className="NTHS">National Technical Honor Society</div> Whitney High</h1>
                <h1 className="headline">Supporting the future <span className="underline"><Typewriter words={featured} typeDelay={[80,120]} wordDelay={2000} initialDelay={3200}/></span> of Whitney High School</h1>
                <div className="btns">
                    <Link to="membership/join">Join NTHS Today</Link>
                    <Link to="about" className="learn-more">Learn more</Link>
                </div>
            </div>
        </div>
    )
}
import { useState, useContext, useEffect } from "react"
import { DataContext } from "../../Contexts/data-context"
import { groupBy } from "../../util/Utilities"
import '../../Article.scss'
import './Clubs.scss'
import { BsDiscord, BsGlobe, BsTwitter, BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs"
import { FaTiktok } from 'react-icons/fa'

const renderSocials = (socials) => {
    const renderSocial = (propName, icon, tooltip) =>{
        return <span className="tooltip"><a href={socials[propName]} target="_blank" rel="noreferrer noopener">{icon}</a><span className="tooltip-text">{tooltip}</span></span>
    }

    return <>
        {socials.website && renderSocial('website', <BsGlobe/>, 'Website')}
        {socials.discord && renderSocial('discord', <BsDiscord/>, 'Discord')}
        {socials.twitter && renderSocial('twitter', <BsTwitter/>, 'Twitter')}
        {socials.facebook && renderSocial('facebook', <BsFacebook/>, 'Facebook')}
        {socials.youtube && renderSocial('youtube', <BsYoutube/>, 'Youtube')}
        {socials.instagram && renderSocial('instagram', <BsInstagram/>, 'Instagram')}
        {socials.tiktok && renderSocial('tiktok', <FaTiktok/>, 'TikTOk')}
    </>
}

export default function Clubs(props) {
    const [clubs, setClubs] = useState(null)
    const dataContext = useContext(DataContext)

    useEffect(() => {
        //instead of 2 seperate reads for different api endpoints, do one bulk read and get data from context
        if(dataContext){
            let {clubs} = dataContext
            console.log(groupBy(clubs, 'department'))
            setClubs(groupBy(clubs, 'department'))
        }
    }, [dataContext])

    return (
        <article className='clubs'>
            <div className="hero">
                <div className="hero-gradient"></div>
                <div className="hero-img" style={{backgroundImage: "url(/Assets/club-rush.png)"}}></div>
                <h1 className="hero-title">Clubs</h1>
            </div>
            <main>
                <h1 className="title">Member Clubs of NTHS Whitney</h1>
                <p>All of the following clubs have officially partnered with NTHS Whitney, and are eligible for requirement fulfillment.</p>
                <div className="clubs-view">
                    {clubs && Object.entries(clubs).sort((d1,d2) => {
                        if(!d1 || !d1[0]) {
                            if(!d2 || !d2[0]) return -1;
                            return 1;
                        }  
                        let a = d1[0].toLowerCase()
                        let b = d2[0].toLowerCase()
                        if (a===b) return 0
                        return (a<b) ? -1 : 1
                    }).map(dept => (
                        <section key={dept[0]}>
                            <h1>{dept[0]}</h1>
                            <hr />
                            {dept[1].sort((c1, c2) => {
                                if(!c1.club) {
                                    if(!c2.club) return -1;
                                    return 1;
                                }  
                                let a = c1.club.toLowerCase()
                                let b = c2.club.toLowerCase()
                                if(a===b) return 0
                                return (a<b) ? -1 : 1
                            }).map(club => (
                                //in the future, support can be added for images, i'm just too lazy to do the css atm :P
                                <div className="tile" key={club.club}>
                                    <h2>{club.club}</h2>
                                    <p>{club.description}</p>
                                    {club.socials && <div className="socials">
                                        {club.socials.website && renderSocials(club.socials)}
                                    </div>}
                                </div>
                            ))}
                        </section>
                    ))}
                </div>
            </main>
        </article>
    )
}
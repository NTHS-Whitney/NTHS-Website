import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DataContext } from '../../Contexts/data-context'
import '../../Article.scss'
//import FadeInSection from '../../Components/FadeInSection/FadeInSection'
import './Opportunities.scss'
import { useContext } from 'react'

export default function Opportunities(props) {
    const [opportunities, setOpportunities] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const dataContext = useContext(DataContext)

    useEffect(() => {
        /*const fetchData = async () => {
            try {
                const data = await fetch('https://script.google.com/macros/s/AKfycbwhQavj0T0QwsmK7fS9pITot3u5EY47X0ssnKIsUpZxj57lF8R3f4uCLZEDnj9qWw-d/exec?type=opportunities')
                const json = await data.json()
                setOpportunities(json.map(opp => {
                    opp.addedOn = opp.addedOn ? new Date(opp.addedOn) : null
                    opp.endsOn = opp.endsOn ? new Date(opp.endsOn) : null
                    return opp;
                }))
                } catch(e) {
                    console.log(e)
            }
        }*/
        //instead of 2 seperate reads for different api endpoints, do one bulk read and get data from context
        if(dataContext){
            let {opportunities} = dataContext
            setOpportunities(opportunities.map(opp => {
                opp.addedOn = opp.addedOn ? new Date(opp.addedOn) : null
                opp.endsOn = opp.endsOn ? new Date(opp.endsOn) : null
                return opp;
            }))
        }
        //fetchData()
    }, [dataContext])
    return (
        <article className='opportunities'>
            <div className="hero">
                <div className="hero-gradient"></div>
                <div className="hero-img" style={{backgroundImage: "url(Assets/internship.jpeg)"}}></div>
                <h1 className="hero-title">Opportunities</h1>
            </div>
            <main>
                <h1 className="title">Opportunities from NTHS Whitney</h1>
                <p>We reguarly update this list with new opportunities for members and students alike. Check back often to stay informed!</p>
                <div className="filters">
                    <input type="search" placeholder="Search" value={searchParams.get('filter') || ""}
                        onChange={(e) => {
                            let filter = e.target.value
                            if(filter) {
                                searchParams.set('filter',filter)
                            } else {
                                searchParams.delete('filter')
                            }
                            setSearchParams(searchParams,{replace: true})
                        }}/>
                    <select name="sortBy" id="sortBy" value={searchParams.get('sortBy') || ""}
                        onChange={e => {
                            let sortBy = e.target.value;
                            if(sortBy !== 'ascending') {
                                searchParams.set('sortBy',sortBy)
                            } else {
                                searchParams.delete('sortBy')
                            }
                            setSearchParams(searchParams, {replace: true})
                        }}>
                        <option value="ascending">A-Z</option>
                        <option value="descending">Z-A</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="endingSoon">Ending Soon</option>
                    </select>
                </div>
                <div className="opportunity-view">
                    {opportunities && opportunities.filter(opp => {
                        if(!searchParams.get('filter')) return true;
                        return (opp.provider + opp.description + opp.requirement).toLowerCase().includes(searchParams.get('filter').toLowerCase())
                    }).sort(searchParams.get('sortBy') ? sortFunctions[searchParams.get('sortBy')] : sortFunctions.ascending).map((opp, i) => {
                        return (
                            <div className="card" key={i}>
                                {opp.image && <img src={opp.image} alt="" />}
                                <div className="content">
                                    <h2>{opp.provider}</h2>
                                    <p>{opp.description}</p>
                                    {opp.requirement && <p className='requirement'>{opp.requirement}</p>}
                                    <a href={opp.link} target="_blank" rel="noreferrer noopener">Learn More</a>
                                    <div className="dates">
                                        {opp.addedOn && <p>Added on {opp.addedOn.toLocaleDateString()}</p>}
                                        {opp.endsOn && <p>Ends on {opp.endsOn.toLocaleDateString()}</p>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </article>
    )
}

const sortFunctions = {
    ascending(a, b) {
        const providerA = a.provider.toLowerCase().charAt(0)
        const providerB = b.provider.toLowerCase().charAt(0)
        if (providerA < providerB) return -1
        if(providerA > providerB) return 1
        return 0;
    },
    descending(c,d){
        return (sortFunctions.ascending(c,d))*-1
    },
    newest(a,b){
        if(!a.addedOn) {
            if(!b.addedOn) return -1;
            return 1;
        }  
        if (a.addedOn > b.addedOn) return -1
        if(a.addedOn < b.addedOn) return 1
        return 0; 
    },
    oldest(a,b){
        if(!a.addedOn) {
            if(!b.addedOn) return -1;
            return 1;
        }
        if (a.addedOn < b.addedOn) return -1
        if(a.addedOn > b.addedOn) return 1
        return 0; 
    },
    endingSoon(a,b){
        if(!a.endsOn) {
            if(!b.endsOn) return -1;
            return 1;
        }
        if (a.endsOn > b.endsOn) return -1
        if(a.endsOn < b.endsOn) return 1
        return 0; 
    }
}
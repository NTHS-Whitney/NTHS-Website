import { useState } from 'react'
import '../../Article.scss'
import './Contact.scss'
//import { BsDiscord, BsGlobe, BsTwitter, BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs"
//import { FaTiktok } from 'react-icons/fa'
//import ReCAPTCHA from 'react-google-recaptcha'

export default function Clubs(props) {
    const [charCount, setCharCount] = useState(0)
    //const [verified, setVerified] = useState(false)

    const sendFormData = async (formData, callback) => {
        await fetch("https://script.google.com/macros/s/AKfycbzfaFlNsHC84y-5aydxWZimRKbt8Wn-KWgIkZGg1dNDKW3H533kw1fs9stzIq5xFoyi7w/exec", {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
        callback()
    }

    const onFormSubmit = e => {
        sendFormData(new FormData(e.target), ()=>e.target.reset())
        e.preventDefault()
    }

    return (
        <article className='contact'>
            <div className="hero">
                <div className="hero-gradient"></div>
                <div className="hero-img" style={{backgroundImage: "url(Assets/mun-conference.jpeg)"}}></div>
                <h1 className="hero-title">Contact</h1>
            </div>
            <main>
                <h1 className="title">Contact Us</h1>
                <p>Want to get in touch? Use the following form to leave a message.</p>
                <form id="contact-form" onSubmit={onFormSubmit}>
                    <label htmlFor="contact-name" className="required">Full Name</label>
                    <input type="text" id="contact-name" name="contact-name" autoComplete='name' required/>
                    <label htmlFor="contact-email" className="required">Email</label>
                    <input type="email" id="contact-email" name="contact-email" autoComplete='email' required/>
                    <label htmlFor="contact-phone">Phone</label>
                    <input type="tel" id="contact-phone"  name="contact-phone" autoComplete='tel'/>
                    <label htmlFor="conact-subject" className="required">Which of the following best describes your inquiry?</label>
                    <select name="contact-subject" id="contact-subject">
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Membership">Membership</option>
                        <option value="Website Feedback">Website Feedback</option>
                        <option value="Donations/Grants">Donations/Grants</option>
                        <option value="Media Request">Media Request</option>
                    </select>
                    <label htmlFor="contact-content" className="required">Message</label>
                    <textarea name="contact-content" id="contact-content" required maxLength={1500} onChange={e => setCharCount(e.target.value.length)} onReset={() => setCharCount(0)}></textarea>
                    <p className="length-counter">{charCount}/1500</p>
                    <input type="submit" value="Submit" id="contact-submit"/>
                </form>
            </main>
        </article>
    )
}
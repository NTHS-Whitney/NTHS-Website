import PropTypes from 'prop-types'
import './Announcement.scss'
import { ThemeContext } from '../../Contexts/theme-context'
import { BsMegaphoneFill, BsXLg } from 'react-icons/bs'
import { useContext } from 'react'

export function Announcement(props) {
    const theme = useContext(ThemeContext);

    return (
        <div id="announcement-banner" className={theme.light ? "" : "dark"}>
            <span>
                <BsMegaphoneFill id="megaphone"/>
                {props.children}
            </span>
            <span className="link-container">
                {props.link}
            </span>
            <button onClick={props.close}>
                <BsXLg />
            </button>
        </div>
    )
}

Announcement.propTypes = {
    children: PropTypes.element.isRequired,
    link: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired
}
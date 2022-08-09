import { useContext, useState } from "react"
import {ReactComponent as DarkModeLogo} from "../../Assets/LogoDarkModeHorizontal.svg"
import {ReactComponent as LightModeLogo} from "../../Assets/LogoLightModeHorizontal.svg"
import {BsMoonFill,BsSun, BsX} from "react-icons/bs"
import {FaCaretDown} from "react-icons/fa";
import PropTypes from 'prop-types'
import {BiMenu} from 'react-icons/bi'

import { Link } from "react-router-dom"
import { ThemeContext } from "../../Contexts/theme-context"
import './Navbar.scss';


//todo: nested dropdowns in css
export function Dropdown(props){
    return (
        <div className="dropdown">
            <button className="dropbtn">
                {props.name}
                <FaCaretDown />
            </button>
            <div className="dropdown-content">
                {props.children}
            </div>
        </div>
    )
}

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array,PropTypes.element]).isRequired
}

export default function Navbar(props){
    const theme = useContext(ThemeContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <nav id={"navbar"} className={theme.light ? "" : "navbar-dark"}>
            <button id="responsive-dropdown-btn" onClick={toggleDropdown}>
                {showDropdown ? <BsX className="icon"/> : <BiMenu className="icon"/>}
            </button>
            <Link to="/" className="logo-link"> 
                <div id="logo-parent">
                    <LightModeLogo className={"logo " + (theme.light ? "" : "flipped")} />
                    <DarkModeLogo className={"logo " + (theme.light ? "flipped" : "")} />
                </div>
            </Link>
            <ul className={"navbar-dropdown " + (showDropdown ? "responsive " : "")}>
                <li><Link to="about">About</Link></li>
                <li>
                    <Dropdown name="Membership">
                        <Link to="membership/join">Join/Renew</Link>
                        <Link to="membership/criteria">Criteria</Link>
                        <Link to="membership/bylaws">Bylaws</Link>
                    </Dropdown>
                </li>
                <li><Link to="opportunities">Opportunities</Link></li>
                <li><Link to="clubs">Clubs</Link></li>
                <li><Link to="contact">Contact</Link></li>
            </ul>
            <button onClick={props.changeTheme}>{theme.light ? <BsMoonFill id="moon" className="icon"/> : <BsSun id="sun" className="icon"/>}</button>
        </nav>
    )
}

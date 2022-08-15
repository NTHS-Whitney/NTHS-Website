import { useContext, useState } from "react"
import {ReactComponent as DarkModeLogo} from "../../Assets/LogoDarkModeHorizontal.svg"
import {ReactComponent as LightModeLogo} from "../../Assets/LogoLightModeHorizontal.svg"
import {BsMoonFill,BsSun, BsX} from "react-icons/bs"
import {FaCaretDown} from "react-icons/fa";
import PropTypes from 'prop-types'
import {BiMenu} from 'react-icons/bi'

import { Link, NavLink, useLocation } from "react-router-dom"
import { ThemeContext } from "../../Contexts/theme-context"
import './Navbar.scss';


//todo: nested dropdowns in css
export function Dropdown(props){
    return (
        <div className="dropdown">
            <button className={"dropbtn " + props.className}>
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
    const location = useLocation()

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
                <li className="list-item-dropdown">
                    <Dropdown name="About" className={(location.pathname.split("/").includes("about") ? "nav-selected" : "")}>
                        <NavLink className={({isActive}) => isActive ? "dropdown-selected" : ""} to="about/">About NTHS</NavLink>
                        <NavLink className={({isActive}) => isActive ? "dropdown-selected" : ""} to="about/leadership">Leadership</NavLink>
                    </Dropdown>
                </li>
                {/* Janky fix until :has selector is implemented */}
                <li className="list-item-dropdown">
                    <Dropdown name="Membership" className={(location.pathname.split("/").includes("membership") ? "nav-selected" : "")}>
                    <NavLink className={({isActive}) => isActive ? "dropdown-selected" : ""} to="membership/join">Join/Renew</NavLink>
                        <NavLink className={({isActive}) => isActive ? "dropdown-selected" : ""} to="membership/benefits">Benefits</NavLink>
                        <NavLink className={({isActive}) => isActive ? "dropdown-selected" : ""} to="membership/criteria">Criteria</NavLink>
                        <NavLink className={({isActive}) => isActive ? "dropdown-selected" : ""} to="membership/bylaws">Bylaws</NavLink>
                    </Dropdown>
                </li>
                <li><NavLink className={({ isActive }) => isActive ? "nav-selected" : ""} to="opportunities">Opportunities</NavLink></li>
                <li className="list-item-dropdown">
                    <Dropdown name="Clubs" className={(location.pathname.split("/").includes("clubs") ? "nav-selected" : "")}>
                        <NavLink className={({isActive}) => isActive ? "dropdown-selected" : ""} to="clubs/">Member Clubs</NavLink>
                        <NavLink className={({isActive}) => isActive ? "dropdown-selected" : ""} to="clubs/join">Join NTHS Whitney</NavLink>
                    </Dropdown>
                </li>
                <li><NavLink className={({ isActive }) => isActive ? "nav-selected" : ""} to="contact">Contact</NavLink></li>
            </ul>
            <button onClick={props.changeTheme}>{theme.light ? <BsMoonFill id="moon" className="icon"/> : <BsSun id="sun" className="icon"/>}</button>
        </nav>
    )
}

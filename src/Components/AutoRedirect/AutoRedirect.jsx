import { useState, useEffect } from "react";
import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom";
import "./AutoRedirect.scss"

export default function AutoRedirect(props) {
    const navigate = useNavigate()

    useEffect(() => {
        let reloadTimeout
        if(!props.disabled) reloadTimeout = setTimeout(() => navigate('/'), props.delay)
        return () => { clearTimeout(reloadTimeout); }
    },[props.delay, props.disabled, navigate])

    return(
        <>
            <div id="nothing-here">
                <h1>Uh oh, you've found an empty page!</h1>
                <h2>You will be redirected to the home page in {Math.round(props.delay / 1000)} seconds. If that doesn't work, you can use <Link to="/">this link</Link> to go back to the home page.</h2>
                <p>If this was a mistake, please contact the developer.</p>
            </div>
        </>
    ) 
}

AutoRedirect.propTypes = {
    delay: PropTypes.number.isRequired,
    disabled: PropTypes.bool
}
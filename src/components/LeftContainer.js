import React from 'react'
import { NavLink } from "react-router-dom";

function LeftContainer({currentUser}) {
    return (
        <div className="left-container">
            <NavLink className="new-post-btn" to={ currentUser ? "/create_post" : "/login"}>Upload</NavLink> 
        </div>
    )
}

export default LeftContainer

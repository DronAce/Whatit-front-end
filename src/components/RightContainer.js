import React from 'react'
import { NavLink } from "react-router-dom";

function RightContainer() {
    return (
        <div className="right-container">
            <NavLink className="new-post-btn" to="/communities">Communities</NavLink>
        </div>
    )
}

export default RightContainer

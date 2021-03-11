import React, { useState }from 'react'
import { Link, useHistory } from "react-router-dom";

function CommunityList({communities, setCommunity, currentUser}) {
    const history = useHistory();
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        description: "",
    });


    const {name, description} = formData

    function handleClick(Community) {
        setCommunity(Community)
    }

    function createCommunity(e){
        e.preventDefault()
        fetch("http://localhost:4000/communities", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then((data) => {
            setCommunity(data)
            history.push(`/community/${data.id}`);
        })
        e.target.reset()
    }

    function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }

    const renderNames = communities.map((community) => <Link className="link" to={`/community/${community.id}`} onClick={()=>handleClick(community)}>{community.name}</Link>)


    return (
        <div className="list">
            {currentUser ? <button onClick={()=> setShow(!show)}>Create a new community</button> : null}
            { show ?
            <div >
                <form className="form" onSubmit={createCommunity}>
                    <input 
                        type="text" 
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleChange} 
                    />
                    <input 
                        type="text" 
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                    <button type="submit">Create</button>
                </form>
            </div> : null
            }
            
                {renderNames}
            
        </div>
    )
}

export default CommunityList

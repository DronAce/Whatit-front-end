import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function PostForm({currentUser, community, setPost}) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        title: "",
        content:"",
        user_id: currentUser? currentUser.id : null,
        community_id: community ?  community.id : null 
    });

    function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:4000/posts", {
            method: "POST",
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        }) 
        .then(response => response.json())
        .then(data => {
            setPost(data)
            history.push(`/posts/${data.id}`)
        })
    }

    const { title, content} = formData;

    return (
        <div className="post-form" >
            <form className="form" onSubmit={handleSubmit}>
                <h1>Create Post</h1>
                <input 
                    name="title" 
                    type="text" 
                    placeholder="Title"
                    autoComplete = 'title'
                    value={title}
                    onChange={handleChange} 
                    required
                />
                <input 
                    name="content" 
                    type="content" 
                    placeholder="Embed_url"
                    value={content}
                    onChange={handleChange}  
                    required
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default PostForm

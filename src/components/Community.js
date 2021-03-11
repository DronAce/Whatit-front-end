import React, {useState, useEffect} from 'react'
import { useHistory, Link } from "react-router-dom";


function Community({community, currentUser, setPost}) {
    const history = useHistory();
    const [joined, setJoined] = useState(false)
    const [show, setShow] = useState(false)
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

    useEffect(() => {
        if (currentUser) {
            fetch("http://localhost:4000/memberships")
            .then(response => response.json())
            .then(data => {
                const members = data.filter((member) => member.community_id === community.id)
                if(members) {
                    const join = members.filter((member) => member.user_id === currentUser.id)
                    join.length? setJoined(true) : setJoined(false);
                } else {
                    setJoined(false);
                }
                
            })
        }
    },[])



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

    function newMembership(){
        const member = {
            user_id: currentUser.id,
            community_id: community.id
        }

        fetch("http://localhost:4000/memberships",{
            method: "POST",
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(member)
        })
        setJoined(!joined)
    }

    const { title, content} = formData;
    const {posts} = community

    const renderPost = posts.map((post) => 
        <div className="grid-post">
            <h3 className="grid-title">{post.title}</h3>
                <iframe className="grid-iframe"
                    width="150"
                    height="150"
                    src= {post.content}
                    frameBorder="0"
                    allowFullScreen
                    title={post.title}
                />
                <Link onClick={() => setPost(post)} to= {`/posts/${post.id}`}  className="grid-btn"> Watch </Link>
        </div>
    )

    


    return (
        <div className="community">
            {currentUser ? 
                <div className="btn-div"> 
                    <button className="c-btn" onClick={() => setShow(!show) }>Upload</button> 
                    { joined ?  <h4>Member</h4> : 
                        <button className="c-btn" onClick={newMembership}>join</button>
                    }
                </div>: null }
            { show ?
             <div >
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
                    <button type="submit">Post</button>
                </form>
            </div> : null
            }
            <div className="c-header">
                <h2 className="cname">{community.name}</h2>
                <h3 className="description">{community.description}</h3>
            </div>
            
            <div className="grid">
                {renderPost}
            </div>
            
            
        </div>
    )
}

export default Community

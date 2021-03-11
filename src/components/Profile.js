import React, {useState} from 'react'
import { Link } from "react-router-dom";

function Profile({user, currentUser, setPost, setUser}) {
    const {posts, followers, followees, communities} = user;
    const [show, setShow] = useState(false)

    const renderPost = posts.map(post => 
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
            { currentUser ?
                currentUser.id === user.id ?
                    <Link onClick={() => deletePost(post.id)}  className="grid-btn grid-delete"> Delete </Link> : null
                : null
            }
        </div>
    )
    
    function deletePost(id) {
        fetch(`http://localhost:4000/posts/${id}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        setUser(user)
        console.log(id)

    }

    function follow(){
        const follow = {
            follower_id: currentUser.id,
            followee_id: user.id,
        }
        fetch("http://localhost:4000/follows", {
            method: "POST",
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(follow),
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            setUser(user)
        })

    }

    const followersId = followees.filter((follower) => follower.follower_id === currentUser.id)
    const follower = followersId[0]

    function unfollow() {
        fetch(`http://localhost:4000/follows/${follower.id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            setUser(user)
        })
    }

    return (
        <div className="profile">
            <h1 className="name">{user.name}  
                { currentUser ?
                    currentUser.id === user.id ? 
                        null : follower ?
                            <button className="btn" onClick={unfollow}> Unfollow </button>
                            : <button className="btn" onClick={follow}> Follow </button> 
                    : null
                }
                
            </h1>
            <div className="info">
                <h3 className="info-h3">Followers: {followers ? followers.length : 0 } </h3>
                <h3 className="info-h3 pointer" onClick={()=>setShow(!show)}>Memberships: {communities ? communities.length : 0} </h3>
                <h3 className="info-h3">Posts: {posts? posts.length : 0}</h3>
            </div>
            {show ? 
                <div >
                    {communities ? communities.map((community) => <p>{community.name} </p> ): null }
                </div> 
            : null}

        <div className="grid">
            {renderPost}
        </div>
        </div>
        
    )
}

export default Profile

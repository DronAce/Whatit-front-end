import React, { useState, useEffect }from 'react'
import { Switch, Route } from "react-router-dom";
import CommunityList from './CommunityList.js';
import PostList from "./PostList.js"

function MiddleContainer({setPost, communities, setCommunity, currentUser, searchPost}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/posts")
        .then((response) => response.json())
        .then((data) => {
            setPosts(data)
        })
    },[])
    

    const renderTrending = posts.map((post) => <PostList key={post.id} post={post} setPost={setPost} />)
    const fromlast = posts.reverse()
    const renderRecent = fromlast.map((post) => <PostList key={post.id} post={post} setPost={setPost} />)
    


    return (
        <div className="middle-container">
            <Switch>
                <Route exact path="/trending">
                    {renderTrending}
                </Route>
                <Route exact path="/recent">
                    {renderRecent}
                </Route>
                <Route exact path="/">
                    {renderTrending}
                </Route>
                <Route exact path="/communities">
                    <CommunityList communities={communities} setCommunity={setCommunity} currentUser={currentUser} />
                </Route>
                <Route exact path="/search">
                    {searchPost}
                </Route>
            </Switch>
        </div>
    )
}

export default MiddleContainer

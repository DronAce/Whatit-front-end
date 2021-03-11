import React from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer';
import MiddleContainer from './MiddleContainer';

function Home({currentUser, setPost, communities, setCommunity}) {
    return (
        <div className="body">
            <LeftContainer currentUser={currentUser}/>
            <MiddleContainer setPost={setPost} communities={communities} setCommunity={setCommunity} currentUser={currentUser}/>
            <RightContainer />
        </div>
    )
}

export default Home

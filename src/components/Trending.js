import React from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer';
import MiddleContainer from './MiddleContainer';

function Trending({currentUser, setPost}) {
    return (
        <div className="body">
            <LeftContainer currentUser={currentUser}/>
            <MiddleContainer setPost={setPost}/>
            <RightContainer />
        </div>
    )
}

export default Trending

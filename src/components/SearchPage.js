import React from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer';
import MiddleContainer from './MiddleContainer';

function SearchPage({currentUser, setPost, searchPost}) {
    return (
        <div className="body">
            <LeftContainer currentUser={currentUser}/>
            <MiddleContainer setPost={setPost} searchPost={searchPost}/>
            <RightContainer />
        </div>
    )
}

export default SearchPage
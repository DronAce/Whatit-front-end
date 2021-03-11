import React from 'react'
import { Link } from "react-router-dom";

function PostList({post, setPost}) {

    return (
        <div className="post">
            <h3 className="title">{post.title}</h3>
                <iframe className="iframe"
                    width="100%"
                    height="400"
                    src= {post.content}
                    frameBorder="0"
                    allowFullScreen
                    title={post.title}
                />
            <div>
                <Link onClick={() => setPost(post)} to= {`/posts/${post.id}`}  className="comment-btn"> Comment </Link>
            </div>
        </div>
    )
}

export default PostList

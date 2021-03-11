import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';

function Post({post, currentUser, setComment, setUser}) {
    const history = useHistory();
    const [user, setUser1] = useState()
    const [editForm, setEditForm] = useState()
    const [text, setText] = useState()
    const [edit, setEdit] = useState(false)

    
    useEffect(() => {
        fetch(`http://localhost:4000/users/${post.user_id}`)
        .then((response) => response.json())
        .then((data) => {
            setUser1(data)
        })
    },[post.user_id])

    function deleteComment(id) {
        fetch(`http://localhost:4000/comments/${id}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            setComment(data)
        })
    }

    function editComment(e) {
        e.preventDefault();

        const comment = {
            text: text,
        }

        fetch(`http://localhost:4000/comments/${editForm.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(comment),
        })
        .then((response) => response.json())
        .then((data) => {
            setComment(data)
        })
        setEdit(!edit)
        e.target.reset()
    }

    function userPage() {
        setUser(user)
        history.push(`/profile/${user.id}`)
    }

    function handleSubmit(e){
        e.preventDefault();

        const comment = {
            text: text,
            user_id: currentUser.id,
            post_id: post.id,
            name: currentUser.name,
        }


        fetch("http://localhost:4000/comments", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(comment)
        })
        .then((response) => response.json())
        .then((data) => {
            setComment(data)
        })


        e.target.reset()
    }

    const comments = post.comments.map((comment) => 
        <p className="comment" id={comment.id} >
            <p className="text" ><span className="comment-name">{comment.name} </span> 
                {': '+comment.text}
            </p>
            { currentUser? comment.user_id === currentUser.id ? 
                <div className="option-btn"> 
                    <button className="delete" onClick={()=>deleteComment(comment.id)}>Delete</button> 
                    <button className="edit" onClick={()=>{setEdit(!edit); setEditForm(comment)}}>Edit</button>
                </div> : null : null
            }
        </p>
     )
    comments.reverse()
    return (
        <div className="post">
            {user? <h1 onClick={userPage} className="name pointer">{user.name}</h1> : null} 
            <h3 className="title">{post.title}</h3>
                <iframe
                    width="500"
                    height="400"
                    src= {post.content}
                    frameBorder="0"
                    allowFullScreen
                    title={post.title}
                />
            { currentUser ?   
                <div>
                    
                    {edit ? 
                        <form className="edit-form" onSubmit={editComment}>
                            <h3>Edit</h3>
                            <input type="text" className="edit-text" placeholder={editForm.text} onChange={(e)=>setText(e.target.value)}/>
                            <button type="submit" className="send" >Send</button>
                        </form>  
                    :  <div> 
                        <h3>Comment</h3>
                            <form className="edit-form" onSubmit={handleSubmit}>
                                <input type="text" className="edit-text"  onChange={(e)=>setText(e.target.value)} />
                                <button type="submit" className="send" >Send</button>
                            </form> 
                        </div> 
                    }
                    
                </div> : null
            }
            <div className="comments-div">
                {comments}
            </div>

        </div>
    )
}

export default Post

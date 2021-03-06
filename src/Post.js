import React from 'react'
import logo from './logo.png';
import './Post.css';
import { Avatar } from '@material-ui/core';

function Post({username,caption,imageUrl}) {
    return (
        <div className="post__body">
            <div className="post__header">
            <Avatar className="post__avatar"
            alt="username"
            src={logo}/>
            <h3>{username}</h3>
        </div>
            
            <img className="post__image" src={imageUrl} alt="post"/>
            <h4 className="post__text"><strong>user</strong> {caption}</h4>
        </div>
    )
}

export default Post

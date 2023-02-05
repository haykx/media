import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'

function Post() {

    const [post, setPost] = useState({
        image:"",
        headline:'',
        body:'',
        created: '',
        likes:''

    });

    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:8040/api/v1/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(e => console.log(e))
    }, []);


    return (
        <div className={'container'}>
            <section className="post-header">
                <div className="header-content post-container">
                    <Link to='/' >back</Link>
                    <h1 className="header-title">{post.headline}</h1>
                    <img src={`data:image/jpeg;base64, ${post.image}`} alt="" className="header-img"/>
                </div>
            </section>
            <section className="post-content post-container">
                <p className="post-text">{post.body}</p>
                <p className="post-text">likes: {post.likes}</p>
            </section>
        </div>
    );
}

export default Post;
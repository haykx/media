import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';

function Home(){

    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:8040/api/v1/post')
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [])


    return (
        <div className={'post container'}>
            {posts.map( (post, index) => (
                    <div className={'post-box'} key={post.id}>
                        <img src={`data:image/jpeg;base64, ${post.image}`}  alt="" post-img/>
                        <Link className="post-title flicker" to={`/post/${post.id}`}>{post.headline}</Link>
                        <span className="post-date">{new Date(post.created).toLocaleDateString("hy-HY", {year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute:'2-digit'})}</span>
                    </div>
            ))}
        </div>
    );
}

export default Home;
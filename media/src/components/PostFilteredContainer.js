import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';

function PostFilteredContainer(){

    const {id} = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:8040/api/v1/publisher/${id}`, {
            headers : {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYXlrQGdtYWlsLmNvbSIsImp0aSI6IjQyZTU0ZGM3LTExZjUtNGIzMy04MWM4LWYzNDIyZjcxMDZlNSIsImlhdCI6MTY3ODUxMzcwNiwicGVybWlzc2lvbnMiOlsiUFVCTElTSEVSX0NBTl9ET19FVkVSWVRISU5HIl0sImV4cCI6MTY3ODc3MjkwNn0.5P3XehIW1ggFPn6JE8B01dfDAmfewahgrKe-NZleYJQ"
            }
        })
            .then(response => response.json())
            .then(data => setPosts(data?.posts))
    }, [id])


    return (
        <div>

            <h1 className={'your-posts'}>Ձեր հրապարակությունները</h1>
            <div className={'post container'}>
                <Link to={`/publisher/${id}/post`}>
                    <div className={'post-box create'} >
                        <svg className={'create-icon'} width="175px" height="175px" viewBox="0 0 20 20" id="meteor-icon-kit__regular-plus" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 9V1C9 0.44772 9.4477 0 10 0C10.5523 0 11 0.44772 11 1V9H19C19.5523 9 20 9.4477 20 10C20 10.5523 19.5523 11 19 11H11V19C11 19.5523 10.5523 20 10 20C9.4477 20 9 19.5523 9 19V11H1C0.44772 11 0 10.5523 0 10C0 9.4477 0.44772 9 1 9H9z"></path></g></svg>
                        <p className={"post-title flicker"}>Հրապարակել նոր նյութ</p>
                    </div>
                </Link>
                {posts.map( (post, index) => (
                        <div className={'post-box'} key={post?.id}>
                            <img src={`data:image/jpeg;base64, ${post?.image}`}  alt="" />
                            <Link className="post-title flicker" to={`/post/${post?.id}`}>{post?.headline}</Link>
                            <span className="post-date">{new Date(post?.created).toLocaleDateString("hy-HY", {year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute:'2-digit'})}</span>
                        </div>
                ))}
            </div>
        </div>
    );
}

export default PostFilteredContainer;
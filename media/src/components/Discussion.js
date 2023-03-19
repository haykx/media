import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import CommentBox from "./CommentBox";
import Like from "./Like";
import AddComment from "./AddComment";


function Discussion() {

    const [discussion, setDiscussion] = useState({});
    const [publisher, setPublisher] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const token = 'Bearer ' + localStorage.getItem('token');

    useEffect(() => {
        fetch(`http://localhost:8040/api/v1/discussion/${id}`,{
            headers : {
                "Authorization": token
            }
        })
            .then(response => response.json())
            .then(data => {
                setDiscussion(data);
                fetch(`http://localhost:8040/api/v1/publisher/${data.publisherId}`, {
                    headers : {
                        "Authorization": token
                    }
                })
                .then(response => response.json())
                .then(data => setPublisher(data))
                .catch(e => console.log(e));
            })
            .catch(e => navigate('/home'));
    }, [id]);

    let links;

    if(discussion.link){
        links = (<section className='useful-link'>
            <p>Օգտակար հղումներ`</p>
            <a href={discussion.link} target={'_blank'}>{discussion.link}</a>
        </section>);
    } else {
        links = '';
    }


    return (
        <div className={'container'}>
            <div className={'discussion'}>
                <div className={'question'}>
                    <h2>{discussion.question}</h2>
                </div>
                <div className={'body'}>
                    <p>{discussion.body}</p>
                </div>
                <div className={'details'}>
                    <div>
                        {publisher?.firstName} {publisher?.lastName}
                    </div>
                    <div>
                        {new Date(discussion?.created).toLocaleDateString("en", {year: 'numeric', month: 'short', day: 'numeric' , hour: 'numeric', minute:'2-digit'})}
                    </div>
                </div>
                <Like scope={'discussion'} id={discussion.id} likes={discussion?.likes} isLiked={discussion.liked} />
            </div>
            <h4>Comments:</h4>
            <AddComment scope={'discussion'} parent={discussion.id} />
            <CommentBox comments={discussion?.comments}></CommentBox>

        </div>
    );
}

export default Discussion;
import React, {useEffect, useState} from 'react';
import Like from "./Like";
import AddComment from "./AddComment";
import login from "./Login";


function Comment(props) {

    const [comment, setComment] = useState();
    const [size, setSize] = useState();
    const [display, setDisplay] = useState();
    const token = 'Bearer ' + localStorage.getItem('token');

    useEffect(()=>{
        setComment(props.comment);
        setSize(props.size);
        setDisplay(false);
    }, [props.comment, props.size]);

    const showMore = (e) => {
        if(!comment.replies){
            fetch(`http://localhost:8040/api/v1/comment/${comment.id}`, {
                headers: {
                    Authorization: token,
                    Accept: "application/json"
                }
            }).then(response => response.json())
                .then(data => setComment(data))
                .catch(e => console.log(e));
        }

        setDisplay(!display);
    };

    return (
        <div className={'comments'} style={{width: size+'%'}}>
            <div className={'comment'} key={comment?.id}>
                <h3>{comment?.text}</h3>
                <div className={'details'}>
                    <div>
                        {comment?.publisherName}
                    </div>
                    <div>
                        {new Date(comment?.created).toLocaleDateString("en", {year: 'numeric', month: 'short', day: 'numeric' , hour: 'numeric', minute:'2-digit'})}
                    </div>
                </div>
                <Like scope={'comment'} id={comment?.id} likes={comment?.likes} isLiked={comment?.liked} />
                <button style={{display: comment?.replyCount ? "flex" : "none"}} onClick={showMore}>Show {comment?.replyCount} replies</button>
                <AddComment scope={'comment'} parent={comment?.id} />
                <div style={{display: display ? "flex" : "none"}}>
                    {comment?.replies?.map((r, j) => (
                        <Comment comment={r} size={size}/>
                    ))}
                </div>
            </div>


        </div>
    );
}

export default Comment;
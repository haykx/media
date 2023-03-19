import React, {useEffect, useState} from 'react';
import Like from "./Like";
import AddComment from "./AddComment";


function Comment(props) {

    const [comment, setComment] = useState();
    const [size, setSize] = useState();
    const [publisher, setPublisher] = useState();
    const token = 'Bearer ' + localStorage.getItem('token');

    useEffect(()=>{
        setComment(props.comment);
        console.log(props.comment);
        setSize(props.size);
        fetch(`http://localhost:8040/api/v1/publisher/${props.comment.publisherId}`, {
            headers : {
                "Authorization": token
            }
        })
            .then(response => response.json())
            .then(data => setPublisher(data))
            .catch(e => console.log(e));
    }, [props.comment, props.size]);

    const s = {
        width: size+'%'
    };
    return (
        <div className={'comments'} style={s}>
            <div className={'comment'} key={comment?.id}>
                <h3>{comment?.text}</h3>
                <div className={'details'}>
                    <div>
                        {publisher?.firstName} {publisher?.lastName}
                    </div>
                    <div>
                        {new Date(comment?.created).toLocaleDateString("en", {year: 'numeric', month: 'short', day: 'numeric' , hour: 'numeric', minute:'2-digit'})}
                    </div>
                </div>
                <Like scope={'comment'} id={comment?.id} likes={comment?.likes} isLiked={comment?.liked} />
                <AddComment scope={'comment'} parent={comment?.id} />
            </div>
            {comment?.replies?.map((r, j) => (
                <Comment comment={r} size={size-10}/>
            ))}

        </div>
    );
}

export default Comment;
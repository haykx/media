import React, {useEffect, useState} from 'react';
import Like from "./Like";
import AddComment from "./AddComment";


function Comment(props) {

    const [comment, setComment] = useState();
    const [size, setSize] = useState();
    const [display, setDisplay] = useState();
    // const token = 'Bearer ' + localStorage.getItem('token');

    useEffect(()=>{
        setComment(props.comment);
        setSize(props.size);
        setDisplay(false);
    }, [props.comment, props.size]);

    const showMore = (e) => {
        //TODO: write fetch, etc.

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
                <button onClick={showMore}>show more</button>
                <div style={{display: display ? "flex" : "none"}}>

                </div>
                {/*<AddComment scope={'comment'} parent={comment?.id} />*/}
            </div>

            {/*{comment?.replies?.map((r, j) => (*/}
            {/*    <Comment comment={r} size={size-10}/>*/}
            {/*))}*/}

        </div>
    );
}

export default Comment;
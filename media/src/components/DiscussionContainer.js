import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';

function DiscussionContainer(props){

    const [discussions, setDiscussions] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:8040/api/v1/discussion${props.page ? '?page='+props.page : ''}`)
            .then(response => response.json())
            .then(data => setDiscussions(data))
    }, [props.page])


    return (

        <div className={'post container'}>
            {discussions.map( (d, index) => (
                    <div className={'post-box'} key={d?.id}>
                        <Link className="post-title flicker" to={`/discussion/${d?.id}`}>{d?.question}</Link>
                        <span className="post-date">{new Date(d?.created).toLocaleDateString("hy-HY", {year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute:'2-digit'})}</span>
                    </div>
            ))}
        </div>
    );
}

export default DiscussionContainer;
import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';

function DiscussionContainer(props){

    const [discussions, setDiscussions] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:8040/api/v1/publication${props.page ? '?page='+props.page : ''}`)
            .then(response => response.json())
            .then(data => setDiscussions(data))
    }, [props.page])


    return (

        <div className={'post container'}>
            {discussions.map((d, index) => {
                if(d.title){
                    return (<div className={'post-box'} key={d?.id}>
                        <Link className="post-title flicker" to={`/survey/${d?.id}`}>{d?.title}</Link>
                        <div>
                            <span className="post-date">
                                {new Date(d?.created).toLocaleDateString("en", {year: 'numeric', month: 'short', day: 'numeric' , hour: 'numeric', minute:'2-digit'})}
                            </span>
                            {/*<span>*/}
                            {/*    likes: {d?.likes}*/}
                            {/*</span>*/}
                        </div>
                    </div>);
                } else {
                    return (<div className={'post-box'} key={d?.id}>
                        <Link className="post-title flicker" to={`/discussion/${d?.id}`}>{d?.question}</Link>
                        <div>
                            <span className="post-date">
                                {new Date(d?.created).toLocaleDateString("en", {year: 'numeric', month: 'short', day: 'numeric' , hour: 'numeric', minute:'2-digit'})}
                            </span>
                            <span>
                                likes: {d?.likes}
                            </span>
                        </div>
                    </div>);
                }
            })}
        </div>
    );
}

export default DiscussionContainer;
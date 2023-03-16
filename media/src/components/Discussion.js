import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function Discussion() {

    const [discussion, setDiscussion] = useState({
        question:'',
        body:'',
        created: '',
        link:'',
        publisherId:''
    });

    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:8040/api/v1/discussion/${id}`)
            .then(response => response.json())
            .then(data => setDiscussion(data))
            .catch(e => console.log(e))
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
            <section className="post-header">
                <div className="header-content post-container">
                    {/*<Link to='/' >back</Link>*/}
                    <h1 className="header-title">{discussion?.question}</h1>
                    {/*<img src={`data:image/jpeg;base64, ${discussion?.image}`} alt="" className="header-img"/>*/}
                </div>
            </section>
            <section className="post-content post-container">
                <p className="post-text">{discussion?.body}</p>
                {links}
            </section>
        </div>
    );
}

export default Discussion;
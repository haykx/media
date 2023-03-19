import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

function PostCreate() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState();
    const [body, setBody] = useState();
    const [link, setLink] = useState();

    const handleSubmit = (e) => {

        e.preventDefault();

        const requestBody = {
            publisherId: id,
            question: question,
            body: body,
            link: link
        };

        const bb = JSON.stringify(requestBody);

        console.log('body: ',requestBody);
        console.log('bb: ',bb);

        fetch('http://localhost:8040/api/v1/discussion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Accept': '*/*'
            },
            body: JSON.stringify(requestBody)
        }).then(response => response.json())
            .then(data => {
                navigate('/publisher/'+id);
            })
            .catch(e => console.log(e));


    }

    return (
        <div className={'post-create-container'}>
            <form className={'post-create-form'} onSubmit={handleSubmit}>
                <label htmlFor={'question'}>Question</label>
                <input className={'post-text'} name={'question'} type={'text'} onChange={e => setQuestion(e.target.value)} maxLength={150} required={true} />
                <label htmlFor={'body'}>Body</label>
                <textarea className={'post-text'} name={'body'} onChange={e => setBody(e.target.value)} maxLength={3000} required={true}></textarea>
                <label htmlFor={'link'}>Link</label>
                <input className={'post-text'} name={'link'} onChange={e => setLink(e.target.value)} type={'url'} maxLength={150} />
                <input className={'submit'} type={'submit'} name={'submit'} value='Publish'/>
            </form>
        </div>
    );
}

export default PostCreate;
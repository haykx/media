import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

function PostCreate() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [headline, setHeadline] = useState();
    const [src, setSrc] = useState();
    const [body, setBody] = useState();
    const [link, setLink] = useState();
    const showImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
            console.log("res: \n",e.target.result);
            console.log(e);
            console.log(e.target.result);
            setSrc(e.target.result);
        });
        console.log('src:\n',src);
        return reader.readAsDataURL(file);
    }

    const handleSubmit = (e) => {

//         const BASE64_MARKER = ';base64,';
//         const sub = src.substring(src.indexOf(BASE64_MARKER) + BASE64_MARKER.length);
//         const rawLength = sub.length;
//         const array = new Uint8Array(new ArrayBuffer(rawLength));
//         for(let i = 0; i < rawLength; i++) {
//             array[i] = src.charCodeAt(i);
//         }
        const requestBody = {
            publisherId: id,
            headline: headline,
            image: src,
            body: body,
            link: link
        };

        const bb = JSON.stringify(requestBody);

        console.log('body: ',requestBody);
        console.log('bb: ',bb);

        fetch('http://localhost:8040/api/v1/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYXlrQGdtYWlsLmNvbSIsImp0aSI6IjQyZTU0ZGM3LTExZjUtNGIzMy04MWM4LWYzNDIyZjcxMDZlNSIsImlhdCI6MTY3ODYwMTc2MiwicGVybWlzc2lvbnMiOlsiUFVCTElTSEVSX0NBTl9ET19FVkVSWVRISU5HIl0sImV4cCI6MTY3ODg2MDk2Mn0.7_0Tl0-_xIfafriqM-ZdyFUzoOX8gUMe5QbhSEdBxhg',
                'Accept': '*/*'
            },
            body: JSON.stringify(requestBody)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                navigate('/publisher/'+id);
            })
            .catch(e => {
                alert(e);
                console.log(e)
            });


    }

    return (
        <div className={'post-create-container'}>
            <form className={'post-create-form'} onSubmit={handleSubmit}>
                <label htmlFor={'headline'}>Վերնագիր</label>
                <input className={'post-text'} name={'headline'} type={'text'} onChange={e => setHeadline(e.target.value)} maxLength={150} required={true} />
                <label htmlFor={'image'}>Նկար</label>
                <input name={'image'} type={'file'} onChange={showImage} accept={'image/jpeg, image/png'} required={true}/>
                <img src={src}  alt="" />
                <label htmlFor={'body'}>Տեքստ</label>
                <textarea className={'post-text'} name={'body'} onChange={e => setBody(e.target.value)} maxLength={6999} required={true}></textarea>
                <label htmlFor={'link'}>Հղում</label>
                <input className={'post-text'} name={'link'} onChange={e => setLink(e.target.value)} type={'url'} maxLength={150} required={true} />
                <input className={'submit'} type={'submit'} name={'submit'} value='Հրապարակել'/>
            </form>
        </div>
    );
}

export default PostCreate;
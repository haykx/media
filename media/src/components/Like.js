import React, {useEffect, useState} from "react";
import config from '../config.json';

function Like(props) {
    const [likes, setLikes] = useState();
    const [scope, setScope] = useState();
    const [id, setId] = useState();
    const [isLiked, setIsLiked] = useState();
    const token = 'Bearer ' + localStorage.getItem('token');
    const PUB_URL = config.PUBLISHER_URL;

    useEffect(() => {
            setIsLiked(props?.isLiked);
            setScope(props.scope);
            setId(props.id);
            setLikes(props.likes);
        },
        [props.scope, props.likes, props.id, props.isLiked])
    const likeUnlike = () => {
        if (!isLiked) {
            fetch(`${PUB_URL}/api/v1/${scope}/${id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                },
                'Accept': 'application/json'
            }).then(() => {
                setLikes(likes + 1);
            })
                .catch(e => console.log(e));
        } else {
            fetch(`${PUB_URL}/api/v1/${scope}/${id}/unlike`, {
                method: 'POST',
                headers: {
                    'Authorization': token
                }
            }).then(() => {
                setLikes(likes - 1);
            })
                .catch(e => console.log('error: ', e))
            console.log('remove class');
        }
        setIsLiked(!isLiked);

    }

    return (
        <div className={"like"}>
            <svg onClick={likeUnlike} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <rect width="24" height="24" fill="white"></rect>
                    <path className={isLiked ? 'like-svg unlike-svg' : 'like-svg'} fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.36129 3.46995C6.03579 3.16081 6.76287 3 7.50002 3C8.23718 3 8.96425 3.16081 9.63875 3.46995C10.3129 3.77893 10.9185 4.22861 11.4239 4.78788C11.7322 5.12902 12.2678 5.12902 12.5761 4.78788C13.5979 3.65726 15.0068 3.00001 16.5 3.00001C17.9932 3.00001 19.4021 3.65726 20.4239 4.78788C21.4427 5.91515 22 7.42425 22 8.9792C22 10.5342 21.4427 12.0433 20.4239 13.1705L14.2257 20.0287C13.0346 21.3467 10.9654 21.3467 9.77429 20.0287L3.57613 13.1705C3.07086 12.6115 2.67474 11.9531 2.40602 11.2353C2.13731 10.5175 2 9.75113 2 8.9792C2 8.20728 2.13731 7.44094 2.40602 6.72315C2.67474 6.00531 3.07086 5.34694 3.57613 4.78788C4.08157 4.22861 4.68716 3.77893 5.36129 3.46995Z"></path>
                </g>
            </svg>
            <p> {likes} likes</p>
        </div>
    );
}

export default Like;
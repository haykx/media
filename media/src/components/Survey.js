import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Question from "./Question";

function Survey() {

    const [survey, setSurvey] = useState({});
    const [publisher, setPublisher] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const token = 'Bearer ' + localStorage.getItem('token');


    const handleSubmit = (e) => {
        console.log("elements", e.target.elements);
        Object.entries(e.target.elements).forEach((r,i) => {
            console.log("rr  ",r?.checked, r)
        });
        const l = e.target.elements.length;
        console.log("byId: ", e?.target?.elements["85010d51-0202-4477-a583-6376f8a5e85f"])
        console.log("ind: ", e?.target?.elements?.item(0));
        for (let i = 0; i < l; i++) {
            try {
                console.log(i, e.target.elements.item(i).options[0]);
            } catch (error) {
                console.log("error", error);
                console.log(e.target.elements.item(i).value);
            }
        }
        alert("a");
    }

    useEffect(() => {
        fetch(`http://localhost:8040/api/v1/survey/${id}`, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => response.json())
            .then(data => {
                setSurvey(data);
                fetch(`http://localhost:8040/api/v1/publisher/${data.publisherId}`, {
                    headers: {
                        "Authorization": token
                    }
                })
                    .then(response => response.json())
                    .then(data => setPublisher(data))
                    .catch(e => console.log(e));
            })
            .catch(e => navigate('/home'));
    }, [id]);


    return (
        <div className={'container'}>
            <div className={'discussion'}>
                <div onClick={e => navigate(-1)} className={'back-home'}>
                    <svg viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z">
                            </path>
                        </g>
                    </svg>
                    Back
                </div>
                <div className={'question'}>
                    <h2>{survey.title}</h2>
                </div>
                <div className={'body'}>
                    <p>{survey.body}</p>
                </div>
                <div className={'details'}>
                    <div>
                        {publisher?.firstName} {publisher?.lastName}
                    </div>
                    <div>
                        {new Date(survey?.created).toLocaleDateString("en", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                {survey?.questionnaire?.map((question, i) =>
                    (
                        <Question question={question}/>
                    )
                )}
                <button type={"submit"}>submit</button>
            </form>
        </div>
    );
}

export default Survey;
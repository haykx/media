import React from 'react';

function Question(props) {
    const question = props.question;
    const type = question.type;


    switch (type) {
        case "DROPDOWN":
            return (
                <div className={"comment"}>
                    <label htmlFor={question?.id}>{question?.question}</label>
                    <select name={question?.id} required={question?.required}>
                        {question.options.map((option, i) =>
                            (
                                <option>{option}</option>
                            )
                        )}
                    </select>
                </div>
            )

        case "RADIO":
            return (
                <div className={"comment"}>
                    <label htmlFor={question?.id}>{question?.question}</label>
                    {question.options.map((option, i) =>
                        (
                            <div>
                                <input type={"radio"} id={question?.id+i} name={question?.id} required={question?.required}/>
                                <label htmlFor={i}>{option}</label>
                            </div>
                        )
                    )}
                </div>
            );

        case "SHORT_ANSWER":
            return (
                <div className={"comment"}>
                    <label htmlFor={question?.id}>{question?.question} </label>
                    <input name={question?.id} required={question?.required} />
                </div>
            );
        case "PARAGRAPH":
            return (
                <div className={"comment"}>
                    <label htmlFor={question?.id}>{question?.question}</label>
                    <textarea name={question?.id} required={question?.required}></textarea>
                </div>
            );
        case "MULTIPLE_CHOICE":
            return (
                <div className={"comment"}>
                    <label htmlFor={question?.id}>{question?.question}</label>
                    <select name={question?.id} multiple required={question?.required}>
                        {question.options.map((option, i) =>
                            (
                                <option>{option}</option>
                            )
                        )}
                    </select>
                </div>
            );

        case "DATE":
            return (
                <div className={"comment"}>
                    <label htmlFor={question?.id}>{question?.question}</label>
                    <input name={question?.id} type={"date"} ></input>
                </div>
            );
        case "CHECKBOX":
            return (
                <div className={"comment"}>
                    <label htmlFor={question?.id}>{question?.question}</label>
                    {question.options.map((option, i) =>
                        (
                            <div>
                                <input type={"checkbox"} id={question?.id+i} name={question?.id} />
                                <label htmlFor={question?.id+i}>{option}</label>
                            </div>
                        )
                    )}
                </div>
            );
        default:
            return null;
    }

}

export default Question;
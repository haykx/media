import React from 'react';
import PostFilteredContainer from "./PostFilteredContainer";
import {useParams} from "react-router-dom";

function PublisherHome() {

    const {id} = useParams();

    return (
        <div>
            <PostFilteredContainer id={id} />
        </div>
    );
}

export default PublisherHome;
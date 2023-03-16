import React from 'react';
import Header from "./Header";
import DiscussionContainer from "./DiscussionContainer";
import HomeHead from "./HomeHead";
import {Link, useParams} from 'react-router-dom'

function Home() {
    const {page} = useParams();
    return (
        <div>
            <HomeHead/>
            <DiscussionContainer page={page}/>
        </div>

    );
}
export default Home;
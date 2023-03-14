import React from 'react';
import Header from "./Header";
import PostContainer from "./PostContainer";
import HomeHead from "./HomeHead";
import {Link, useParams} from 'react-router-dom'

function Home() {
    const {page} = useParams();
    return (
        <div>
            <HomeHead/>
            <PostContainer page={page}/>
        </div>

    );
}
export default Home;
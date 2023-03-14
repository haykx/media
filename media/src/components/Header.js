import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="nav container">
                <Link className="logo" to="/home">148</Link>
                <Link className="login" to="/login" >Մուտք</Link>
            </div>
        </header>
    );
}

export default Header;
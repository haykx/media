import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="nav">
                <Link className="logo" to="/home">Home</Link>
                <div>
                    <Link className="sign-up" to="/sign-up" >Sign Up</Link>
                    <Link className="login" to="/login" >Log In</Link>
                </div>
            </div>
        </header>
    );
}
const handleLogout = (e) => {
    localStorage.clear();
};
function logged(){
    if(localStorage.getItem("token")){
        return (<div>
            <Link className="login" to={"/login"} onClick={handleLogout}>Log Out</Link>
        </div>)
    } else {
        return (<div>
            <Link className="sign-up" to="/sign-up" >Sign Up</Link>
            <Link className="login" to="/login" >Log In</Link>
        </div>)
    }

}

export default Header;
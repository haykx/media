import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ApplicationContext} from "./ApplicationContext";

function Header() {
    const {logged, setLogged} = useContext(ApplicationContext);

    const handleLogout = () => {
        setLogged(false);
        localStorage.clear();
    }

    return (
        <header>
            <div className="nav">
                <Link className="logo" to="/home">Home</Link>
                {
                    logged ? (
                        <div>
                            <Link className="login" to="/login" onClick={handleLogout}>Log Out</Link>
                        </div>
                    ) : (
                        <div>
                            <Link className="sign-up" to="/sign-up" >Sign Up</Link>
                            <Link className="login" to="/login" >Log In</Link>
                        </div>
                    )
                }

            </div>
        </header>
    );

}

export default Header;
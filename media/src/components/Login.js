import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])

    const handleSubmit = (e) => {
      e.preventDefault();

        const b = {
            email: email,
            password: password
        }

      fetch('http://localhost:8030/api/v1/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(b)
      }).then(response => response.json())
        .then(data => {
            console.log(data?.access_token);
            localStorage.setItem('token', data?.access_token);
            fetch('http://localhost:8040/api/v1/publisher', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => response.json())
                .then(data => {
                    navigate('/publisher/'+data?.id);
                })
                .catch(e => console.log(e));

        })
        .catch(e => console.log(e));


    };

    return (
        <div className='login-container container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    onChange={e => setEmail(e?.target?.value)}
                    value={email}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    onChange={e => setPassword(e?.target?.value)}
                    value={password}
                    required
                />
                <button>Log In</button>
            </form>
        </div>
    );
}

export default Login;
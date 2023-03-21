import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [bio, setBio] = useState();
    const [password, setPassword] = useState([]);
    const [rePassword, setRePassword] = useState();

    const handleSubmit = (e) => {
      e.preventDefault();
       if(password !== rePassword) {
           alert('Passwords do not match!')
           return;
       }

       const b = {
           email: email,
           password: password
       }

      fetch('http://localhost:8030/api/v1/publisher/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(b)
      }).then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data?.access_token);
            const bb = {
                firstName: firstName,
                lastName: lastName,
                bio: bio ? bio : null
            }
            console.log(JSON.stringify(bb));
            fetch('http://localhost:8040/api/v1/publisher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bb)
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
                    type='text'
                    placeholder='First Name'
                    onChange={e => setFirstName(e?.target?.value)}
                    value={firstName}
                    required
                />
                <input
                    type='text'
                    placeholder='Last Name'
                    onChange={e => setLastName(e?.target?.value)}
                    value={lastName}
                    required
                />
                <input
                    type='text'
                    placeholder='Bio'
                    onChange={e => setBio(e?.target?.value)}
                    value={bio}
                />
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
                <input
                    type='password'
                    placeholder='Repeat password'
                    onChange={e => setRePassword(e?.target?.value)}
                    value={rePassword}
                    required
                />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default Login;
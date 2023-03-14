import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const [tokens, setTokens] = useState([])
    const [publisher, setPublisher] = useState({
        id: '',
        avatar: '',
        firstName:'',
        lastName:'',
    })

    const handleSubmit = (e) => {
      e.preventDefault();

      fetch('http://localhost:8030/api/v1/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
      }).then(response => response.json())
        .then(data => {
            setTokens(data);
            console.log(tokens.access_token);
            console.log(data?.access_token);
            fetch('http://localhost:8040/api/v1/publisher', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${data?.access_token}`
                }
            }).then(response => response.json())
                .then(data => {
                    setPublisher(data);
                    console.log("data:\n",data);
                    console.log("pubb:\n",publisher);
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
                    placeholder='Մուտքագրեք Ձեր էլ. հասցեն'
                    onChange={e => setEmail(e?.target?.value)}
                    value={email}
                    required
                />
                <input
                    type='password'
                    placeholder='Մուտքագրեք Ձեր գաղտնաբառը'
                    onChange={e => setPassword(e?.target?.value)}
                    value={password}
                    required
                />
                <button>Մուտք</button>
            </form>
        </div>
    );
}

export default Login;
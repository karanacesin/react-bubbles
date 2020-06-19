import React, { useState } from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const initialCredentials = {
   username:'',
   password:''
  }

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
 
const [login, setLogin] = useState(initialCredentials)
const {push} = useHistory();

const handleChange = e =>{
  setLogin({ ...login, [e.target.name]: e.target.value
  })
}

const submit = e =>{
  e.preventDefault();
  axios
    .post('http://localhost:5000/api/login', login)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      push('/protected')
    })
    .catch(err => console.log(err.response));
}
  return (
    <>
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <p>Login in to see the bubbles</p>
      
      <form onSubmit={submit}>
        <input
          type="text"
          name="username"
          value={login.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
        />

        <button>Log in</button>
      </form>
      </div>
    </>
  );
};

export default Login;

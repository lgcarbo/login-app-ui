import { prependOnceListener } from 'process';
import React, { FormEvent, FormEventHandler, ReactEventHandler, useEffect, useRef, useState } from 'react';
import usePost from '../../hooks/usePost';
import usePrevious from '../../hooks/usePrevious';
import styles from './Login.module.scss';

type LoginData = {
  username: string,
  password: string
}

type Token = {
  accessToken: string
}

function Login({onAuthenticated}: {onAuthenticated: (token: Token) => void}) { 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [{data: token, isLoading, isError}, doPost] = usePost<LoginData,Token>("https://localhost:44311/token");

  const prevToken = usePrevious(token);

  useEffect(() => {
    if(token && token.accessToken && onAuthenticated && username && password) {
      if(prevToken === undefined || prevToken.accessToken !== token.accessToken) {
        console.log("Calling onAuthenticated...")
        onAuthenticated(token);  
      }
    }  
  }, [token, onAuthenticated, username, password]);

  const validateUser = (event: FormEvent<HTMLFormElement>) => {
    if(username && password) {
      doPost({ username, password });
    }

    event.preventDefault();
  };

  return (
  <form onSubmit={validateUser}>
    <div id="title" className={styles.Login} data-testid="Login">
      Login Component
    </div>
    <label><p>Username</p><input id="user-value" type="text" onChange={e => setUsername(e.target.value)}/></label>
    <label><p>Password</p><input id="password-value" type="password" onChange={e => setPassword(e.target.value)}/></label>
    <div>
      <button id="login-btn" type="submit">Log in</button>
    </div>
    { isError ? <p>Could not log in.</p> : "" }
  </form>
  );
}

export type { Token };
export default Login;

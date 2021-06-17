import { useState } from 'react';
import './App.css';
import Login, { Token } from './components/Login/Login';


function App() {
  const [accessToken, setAccessToken] = useState<Token | null>(null);

  console.log(`accessToken = '${JSON.stringify(accessToken)}'`)

  return (
    <div className="App">
      <header className="App-header">
        Welcome to My Login Page
        <Login onAuthenticated={(token) => setAccessToken(token)} />
      </header>
    </div>
  );
}

export default App;

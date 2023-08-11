import React from'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mainpage from './components/Mainpage';
import Login from './components/Login';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code? <Mainpage code={code}/> : <Login />;
}

export default App;

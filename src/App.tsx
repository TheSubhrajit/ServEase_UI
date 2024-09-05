import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header/Header';
import { Help_Search } from './components/Help-Search/Help_Search';
import { Landingpage } from './components/Landing_Page/Landingpage';


function App() {
  return (
    <div className="App">
      {/* <Login />
      <Help_Search></Help_Search> */}
      <Header></Header>
      <Landingpage/>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header/Header';
import { Help_Search } from './components/Help-Search/Help_Search';
import {Search_form} from './components/Search-Form/Search_form';
import { Landingpage } from './components/Landing_Page/Landingpage';
import { DetailsView } from './components/DetailsView/DetailsView';


function App() {

  const [selection , setSelection] = useState();
  const handleDataFromChild = (e:any)=>{
      setSelection(e);
  }


  return (

    <div className="App">
      {/* <Login />
      <Help_Search></Help_Search> */}
      <Header></Header>
      {
        !selection && <Landingpage sendDataToParent={(e) => handleDataFromChild(e)}/>
      }
      {
        selection && <DetailsView sendDataToParent={(e) => handleDataFromChild(e)}/>
      }


    </div>

  );
}

export default App;
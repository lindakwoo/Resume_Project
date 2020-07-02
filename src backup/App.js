import React, {Component} from 'react';
import classes from './App.module.css';
import {storage} from './firebase';
import firebase from './firebase';
import UserPage from './Components/UserPage/UserPage';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Radium from "radium";
import {StyleRoot} from "radium"
import ResumeBuilder from './Containers/ResumeBuilder/ResumeBuilder'

class App extends Component {
  

 
  render(){
    
  
          return (
            <BrowserRouter>
              <ResumeBuilder></ResumeBuilder>
           </BrowserRouter>
          );
          
            
      
  };
}

export default App;

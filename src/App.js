import React, {Component} from 'react';
import classes from './App.module.css';
import {storage} from './firebase';
import firebase from './firebase';
import Form from './Containers/Form/Form';
import UserPage from './Components/UserPage/UserPage';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Radium from "radium";
import {StyleRoot} from "radium"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view:"home",
      persons:[],
      currentUsername:"",
      currentUserId:"",
      currentPerson:{}
    }
  }  

  componentDidMount(){
    const personsRef = firebase.database().ref('persons');
    personsRef.on('value', (snapshot)=>{
      let persons = snapshot.val();
      let newState = [];
      for(let person in persons){
        let projects = []
        for(let project in persons[person]['projects']){
          projects.push({
            id:project,
            projectTitle:persons[person]['projects'][project].projectTitle,
            projectDescription:persons[person]['projects'][project].projectDescription,
            photo: persons[person]['projects'][project].photo
          })
        }
        newState.push({
          id:person,
          username:persons[person].username,
          description:persons[person].description,
          photo:persons[person].photo,
          projects:projects
        });
      }
      this.setState({persons:newState})
    })
  }
  returnHome = ()=>{
    this.setState({view:'home'})
    console.log(this.state.view)
  }

  getForm = ()=>{
    this.setState({view:'form'})
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  setCurrentPerson=()=>{
    let persons = [...this.state.persons]
    let validUserName = false;
    for(let person of persons){
      if(person.username===this.state.currentUsername){
        validUserName = true;
        this.setState({currentPerson:person})
      }
    }
    if(validUserName){
      this.setState({view:"userPage"})
    }else{
      alert("no such user name")
    }
    

  }
 
  render(){
    let style = {
      backgroundColor:"green",
      color:"white",
      ":hover":{
        backgroundColor:"red",
      color:"yellow"
      }
    }
    
    
      switch(this.state.view){
        case "home" :
          return (
            <div className={classes.App}>
              <h2 className = {classes.Title}>My First Resume </h2>
              <div className = {classes.Home}>
              </div>
              <div className = {classes.Back}></div>
              <button style = {style} onClick = {this.getForm}>add new person</button>
              <input type = "text" name = "currentUsername" placeholder = "enter user's name" onChange = {this.handleChange}/>
              <button onClick = {this.setCurrentPerson}>display current user</button>
            </div>
          );
          case "form" : 
          return (
            <div className={classes.App}>
              <Form persons = {this.state.persons} returnHome = {this.returnHome}/>
            </div>
          );
            
          case "userPage" : 
          return (
            // <StyleRoot>
              <div className={classes.App}>
                <UserPage currentPerson = {this.state.currentPerson} returnHome = {this.returnHome}/>
              </div>
            // {/* </StyleRoot> */}
          );
            
      }
  };
}


// export default Radium(App);
export default App;

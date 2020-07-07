import React, {Component} from 'react';
import classes from './ResumeBuilder.module.css';
import {storage} from '../../firebase/index';
import firebase from '../../firebase/index';
import Edit from '../Edit/Edit';
import UserPage from '../../Components/UserPage/UserPage';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Radium from "radium";
import {StyleRoot} from "radium"
import Aux from '../../hoc/Aux'
import NavigationItems from '../../Components/Navigation/NavigationItems'
import Landing from '../../Components/Landing/Landing'
import history from '../../History'


class ResumeBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view:"home",
      persons:[],
      currentUsername:"Linda Woo",
      currentUserId:"",
      currentPerson:{},
      loggingIn:false,
      addingNewUser:false,
      number:0
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
        let jobs = []
        for(let job in persons[person]["jobs"]){
          jobs.push({
            id:job,
            jobEmployer:persons[person]['jobs'][job].jobEmployer,
            jobTitle:persons[person]['jobs'][job].jobTitle,
            jobDescription:persons[person]['jobs'][job].jobDescription
          })
        }
        newState.push({
          id:person,
          username:persons[person].username,
          description:persons[person].description,
          summary:persons[person].summary,
          photo:persons[person].photo,
          projects:projects,
          jobs:jobs
        });
      }
      this.setState({persons:newState, number:newState.length})
      for(let person of newState){
        if(person.username===this.state.currentUsername){
          this.setState({currentPerson:person})
        }
      }
      
    })
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
    if(!validUserName){
      alert("no such user name")
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  signIn = ()=>{
    this.setState({loggingIn:true});
  } 

  newUser =()=>{
    this.setState({addingNewUser:true});
  }

  logInHandler = ()=>{
    this.setState({loggingIn:false});
    this.setCurrentPerson();
  }

  closeLogin=()=>{
    this.setState({loggingIn:false})
  }

  closeAddingNewUser=()=>{
    this.setState({addingNewUser:false})
  }

  
 
  render(){

    const myUserPage = (props)=>{
      return (
        <UserPage 
          currentPerson = {this.state.currentPerson} 
          view = "main"
          {...props}
          />
      )
    }

    const myLanding = (props)=>{
      return(
        <Landing
          getForm = {this.getForm} 
          setCurrentPerson = {this.setCurrentPerson} 
          handleChange = {this.handleChange}
          persons = {this.state.persons}
          loggingIn = {this.state.loggingIn}
          addingNewUser = {this.state.addingNewUser}
          signIn = {this.signIn}
          newUser = {this.newUser}
          closeAddingNewUser = {this.closeAddingNewUser}
          closeLogin = {this.closeLogin}
          logInHandler = {this.logInHandler}
          handleChange = {this.handleChange}
          {...props}
          />

      )
    }

    const myForm = (props)=>{
      return(
        <Edit
          currentPerson = {this.state.currentPerson}
          persons = {this.state.persons} 
          {...props}
          />

      )
    }
      return(
    
        <div className = {classes.ResumeBuilder}>
            <NavigationItems/>
            <Switch>
                <Route path = '/' exact render = {myLanding}/>
                <Route path = '/MyPage' exact render = {myUserPage}/>
                <Route path = '/EditMyPage' exact render = {myForm}/>
            </Switch>
        </div>
      )
  };
}

export default ResumeBuilder;
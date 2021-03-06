import React, {Component} from 'react';
import {storage} from '../../firebase/index';
import firebase from '../../firebase/index';
import classes from './Resume.module.css';
import Radium from "radium";
import {StyleRoot} from "radium";
import styled from 'styled-components';
import Jobs from "../../Components/UserPage/Jobs/Jobs";
import Projects from "../../Components/UserPage/Projects/Projects";
import Main from "../../Components/UserPage/Main/Main";


class Resume extends Component {
   
  state = {
      persons : [],
      currentPerson:{username:"", description:"", photo:"", words:[], projects:[], jobs:[], summary:""},
      view:"main",
      start:true,
      name:this.props.match.params.name,
      nameValid:true
  }

  //get database from firebase and load as an array of persons
  componentDidMount(){
      const personsRef = firebase.database().ref('persons');
      personsRef.on('value', (snapshot)=>{
        let persons = snapshot.val();
        let newState = [];
        //because firebase does not allow arrays, convert object to array
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
              jobDescription:persons[person]['jobs'][job].jobDescription,
              jobDescription2:persons[person]['jobs'][job].jobDescription2,
              jobDescription3:persons[person]['jobs'][job].jobDescription3
            })
          }
          let words =[]
          for(let word in persons[person]["words"]){
            words.push({
              id:word,
              word:persons[person]['words'][word]
            })
          }
          newState.push({
            id:person,
            username:persons[person].username,
            urlname:persons[person].urlname,
            description:persons[person].description,
            summary:persons[person].summary,
            photo:persons[person].photo,
            projects:projects,
            jobs:jobs,
            words:words
          });
        }
        this.setState({persons:newState})
        for(let person of newState){
          if(person.urlname===this.props.match.params.name){
            this.setState({currentPerson:person})
          }
        }
        
      })
  }



  setCurrentPerson = ()=>{
      let resumeName;
      let name = this.props.match.params.name;
      let valid=false;
      for(let person of this.props.persons){
          if(person.urlname==name){
              resumeName=person;
              this.setState({currentPerson:resumeName});
          }
      }
  }

  setView = (event)=>{
      this.setState({view:event.target.name})
  }

  render(){
      let currentView = <div></div>
      let viewName = <div></div>
   
      if(this.state.view =="jobs"){
        currentView = <Jobs currentPerson={this.state.currentPerson}/>
        viewName = <div>Work Experiences:</div>
      }else if (this.state.view == "projects"){
        currentView = <Projects currentPerson = {this.state.currentPerson} />
        viewName = <div>Personal Projects:</div>
      }else{
        currentView = <Main currentPerson = {this.state.currentPerson} />
        viewName = <div>Summary and Characteristics: </div>
      }

      return this.state.currentPerson['username']? 
      (
        <div className={classes.UserPage}>
          <div className = {classes.Header}>
            <h1 className = {classes.Title}>{this.state.currentPerson["username"]}</h1>
            <h2 className = {classes.Description}>{this.state.currentPerson["description"]}</h2>
            <h2 className = {classes.ViewName}>{viewName}</h2>
          </div>
          <div className = {classes.ImageCropper}>
            <img className = {classes.UserPhoto} src = {this.state.currentPerson["photo"]}/>
          </div>
          <div className = {classes.Sidebar}>
            <button onClick = {this.setView} name = "main">Summary</button>
            <button onClick = {this.setView} name = "jobs">Jobs</button>
            <button onClick = {this.setView} name = "projects">Projects</button>
          </div>  
          <div className = {classes.Content}> {currentView} </div>  
        </div>    
      ):  <div className = {classes.NoSuchPerson}>{this.props.match.params.name} is an unrecognized name</div>;
  }
 
}


export default Resume;
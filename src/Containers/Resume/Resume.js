import React, {Component} from 'react';
import classes from './Resume.module.css';
import Radium from "radium";
import {StyleRoot} from "radium";
import styled from 'styled-components';
import Jobs from "../../Components/UserPage/Jobs/Jobs";
import Projects from "../../Components/UserPage/Projects/Projects";
import Main from "../../Components/UserPage/Main/Main";


class Resume extends Component {
   
  state = {
    persons : this.props.persons,
    currentPerson:{username:"", description:"", photo:"", words:[], projects:[], jobs:[], summary:""},
    view:"main",
    start:false,
    name:this.props.match.params.name,
    nameValid:false
  }

  setCurrentPerson = ()=>{
  let resumeName;
    let name = this.props.match.params.name;
    let valid=false;
    for(let person of this.props.persons){
        if(person.username==name){
            resumeName=person;
            valid=true;
        }
    }
    if(valid){
    this.setState({currentPerson:resumeName, nameValid:true,start:true});
    }else{
    this.setState({start:true,nameValid:false})
    }
}

  setView = (event)=>{
    this.setState({view:event.target.name})
  }

  render(){
    

    let currentView = <div></div>
    let viewName = <div></div>
    let message = <div>no such person</div>
    let page = <button onClick = {this.setCurrentPerson}>click me</button>
   
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

      return !this.state.start? 
      <button onClick = {this.setCurrentPerson}>{this.props.match.params.name}</button>:
      !this.state.nameValid? <div>no such person</div>:
      
      (
        <div className={classes.UserPage}>
          <div className = {classes.Header}>
            <h1 className = {classes.Title}>{this.state.currentPerson["username"]|| message}</h1>
            <h2 className = {classes.Description}>{this.state.currentPerson["description"]}</h2>
            <h2 className = {classes.ViewName}>{viewName}</h2>
          </div>
          <img className = {classes.UserPhoto} src = {this.state.currentPerson["photo"]}/>
          <div className = {classes.Sidebar}>
            <button onClick = {this.setView} name = "main">Summary</button>
            <button onClick = {this.setView} name = "jobs">Jobs</button>
            <button onClick = {this.setView} name = "projects">Projects</button>
          </div>  
          <div className = {classes.Content}> {currentView} </div>  
        </div>
          
      );
  }
 
}


export default Resume;
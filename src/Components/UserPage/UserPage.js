import React, {Component} from 'react';
import classes from './UserPage.module.css';
import Radium from "radium";
import {StyleRoot} from "radium";
import styled from 'styled-components';
import Jobs from "./Jobs/Jobs";
import Projects from "./Projects/Projects";
import Main from "./Main/Main";


class UserPage extends Component {
  state = {
    view:"main",
    currentPerson:this.props.currentPerson,
    words: this.props.currentPerson["words"]
  }


  componentDidMount(){
    this.setState({view:"main"})
  }

  setView = (event)=>{
    this.setState({view:event.target.name})
  }

  render(){

    let userPhotoStyle = {
      // '@media(max-width:850px)':{
      //   width:'25%'
      // }
    }

    let imgStyle = {
      // '@media(min-width:500px)':{
      //   width:'600px'
      // }
    }

    // let UserImgDiv = styled.img`
    // width:250px;
    // position: absolute;
    // top:20px;
    // left:20px;
    // @media(max-width:850px){
    //   width:25%;
    // }
    // `

   
    let message = <div className = {classes.Message}>You must enter a valid current user. Go Home to log in.</div> 
    let currentView = <div></div>
    let viewName = <div></div>
   

      if(this.state.view =="jobs"){
        currentView = <Jobs currentPerson={this.props.currentPerson}/>
        viewName = <div className = {classes.ViewTitle}>Jobs:</div>
      }else if (this.state.view == "projects"){
        currentView = <Projects currentPerson = {this.props.currentPerson} />
        viewName = <div className = {classes.ViewTitle}>Projects:</div>
      }else{
        currentView = <Main currentPerson = {this.props.currentPerson} />
        viewName = <div className = {classes.ViewTitle}>Summary and Characteristics: </div>
      }

      return (
        <div className={classes.UserPage}>
          <div className = {classes.Header}>
            <h1 className = {classes.Title}>{this.props.currentPerson["username"]||message }</h1>
            <p>rezoom3.web.app/resume/{this.props.currentPerson["urlname"]} </p>
            <h2 className = {classes.Description}>{this.props.currentPerson["description"]}</h2>
            <div className = {classes.ViewName}>{viewName}</div>
          </div>
          <div className = {classes.ImageCropper}>
            <img className = {classes.UserPhoto} src = {this.props.currentPerson["photo"]}/>
          </div>
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


// export default Radium(UserPage);
export default UserPage;
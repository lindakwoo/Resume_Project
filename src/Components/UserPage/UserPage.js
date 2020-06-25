import React, {Component} from 'react';
import classes from './UserPage.module.css';
import Radium from "radium";
import {StyleRoot} from "radium";
import styled from 'styled-components'


const UserPage =(props)=> {

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
  let UserImgDiv = styled.img`
  width:250px;
  position: absolute;
  top:20px;
  left:20px;
  @media(max-width:850px){
    width:25%;
  }
  `

  let ImageDiv = styled.img`
    width:65%;
    text-align:center;
    @media(min-width:600px){
    width:450px
    }
  `

  let projects = props.currentPerson["projects"].map(project=>{
    return <div>
      <h2>{project["projectTitle"]}</h2>
      <h3>{project["projectDescription"]}</h3>
      
        <ImageDiv  className = {classes.projectPhoto} src = {project["photo"]}/>
    </div>
  })

  let returnHome = ()=>{
    props.returnHome();
  }

  


    return (
        <div className={classes.userPage}>
          <button className = {classes.returnHomeBtn} onClick = {returnHome}>return home</button>
          <div className = {classes.container}>
            <h1 className = {classes.title}>{props.currentPerson["username"]}</h1>
            <h2 className = {classes.description}>{props.currentPerson["description"]}</h2>
            <UserImgDiv style = {userPhotoStyle} className = {classes.userPhoto} src = {props.currentPerson["photo"]}/>
            <div>
              <h1>Projects</h1>
              {projects}
            </div>
          
          </div>
        </div>
    );
 
}


// export default Radium(UserPage);
export default UserPage;
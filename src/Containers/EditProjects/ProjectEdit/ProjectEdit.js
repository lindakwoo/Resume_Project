import React, {Component} from 'react';
import {storage} from '../../../../firebase';
import firebase from '../../../../firebase';
import classes from './ProjectEdit.module.css';


class ProjectEdit extends Component {
  state = {
    currentPersonId:this.props.currentPersonId,
    projectId:this.props.projectId,
    projectTitle:this.props.projectTitle,
    projectDescription:this.props.projectDescription,
    selectedProjectPhotoFile:null,
    projectPhotoURL:this.props.photo
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }  
  
  projectFileSelectedHandler = event=>{
    this.setState({selectedProjectPhotoFile:event.target.files[0]});
  }

  uploadProjectPhoto = ()=>{
    if(this.state.selectedProjectPhotoFile){
      const uploadTask = storage.ref(`images/${this.state.selectedProjectPhotoFile.name}`).put(this.state.selectedProjectPhotoFile);
      uploadTask.on(
          "state_changed",
          snapshot=>{},
          error=>{
              console.log(error);
          },
          ()=>{
              storage
              .ref("images")
              .child(this.state.selectedProjectPhotoFile.name)
              .getDownloadURL()
              .then(url=>{
                  this.setState({projectPhotoURL:url})
              });
          }
      )
    }else{
        alert("You haven't selected a photo")
    }    
  }

  handleNewChangesToProject =(event)=>{
    event.preventDefault();
      let personId = this.state.currentPersonId;
      let projectId = this.state.projectId;
      let projectTitle=this.state.projectTitle;
      let projectDescription = this.state.projectDescription;
      let projectPhotoURL = this.state.projectPhotoURL;
      const projectsRef = firebase.database().ref(`persons/${personId}/projects`);
      const projectRef = projectsRef.child(projectId)
      projectRef.update({
        "projectTitle":projectTitle,
        "projectDescription":projectDescription,
        "photo":projectPhotoURL
      })
  }

  render(){

    return (
      <div className = {classes.ProjectEdit}>
          <label>Project Name:</label>
          <input type="text" onChange = {this.handleChange} value = {this.state.projectTitle} name = "projectTitle" placeholder = "Name of project"/>
          <label>Project Description:</label>
          <textarea cols = "45" rows="5"  type = "textarea" onChange={this.handleChange} value = {this.state.projectDescription} name = "projectDescription" placeholder = "Description of project"/>
          <input type = "file" onChange = {this.projectFileSelectedHandler} placeholder = "select different project photo"/>
          <button onClick = {this.uploadProjectPhoto} >change photo</button> 
          <img src = {this.state.projectPhotoURL|| "http://via.placeholder.com/300"}/>
          <button onClick = {this.handleNewChangesToProject} >submit changes to project</button>
      </div>
        
    );
  } 
}


// export default Radium(UserPage);
export default ProjectEdit;
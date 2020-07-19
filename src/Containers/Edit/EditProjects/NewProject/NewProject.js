import React, {Component} from 'react';
import {storage} from '../../../../firebase';
import firebase from '../../../../firebase';
import classes from './NewProject.module.css';
import Spinner from '../../../../UI/Spinner/Spinner';


class NewProject extends Component {
  state = {
    currentPersonId:this.props.currentPersonId,
    projectTitle:"",
    projectDescription:"",
    selectedProjectPhotoFile:null,
    projectPhotoURL:"",
    loading:false
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }  
  
  projectFileSelectedHandler = event=>{
    this.setState({selectedProjectPhotoFile:event.target.files[0]});
  }

  uploadProjectPhoto = ()=>{
    if(this.state.selectedProjectPhotoFile){
      this.setState({loading:true})
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
                  this.setState({projectPhotoURL:url});
                  this.setState({loading:false});
              });
          }
      )
    }else{
        alert("You haven't selected a photo")
    }    
  }

  handleAddNewProject =(event)=>{
    event.preventDefault();
      let personId = this.state.currentPersonId;
      let projectTitle=this.state.projectTitle;
      let projectDescription = this.state.projectDescription;
      let projectPhotoURL = this.state.projectPhotoURL;
      let newProject = {
        "projectTitle":projectTitle,
        "projectDescription":projectDescription,
        "photo":projectPhotoURL
      }
      const projectsRef = firebase.database().ref(`persons/${personId}/projects`);
      let newRef = projectsRef.push(newProject);
      let projectId = newRef.key;
      this.setState({projectTitle:"", projectDescription:"", projectPhotoURL:""});
      newProject["id"]=projectId;
      this.props.addProjectToEdit(newProject);
  }

  render(){
    let loading = <div className = {classes.Loading}></div>
    if(this.state.loading){
      loading = <div className = {classes.Loading}><Spinner/></div>
    }
    return (
      <div className = {classes.NewProjectContainer}>
        <div className = {classes.NewProject}>
          <div className = {classes.ProjectInfo}>
              <label>Project Name:</label>
              <input type="text" onChange = {this.handleChange} value = {this.state.projectTitle} name = "projectTitle" placeholder = "Name of project"/>
              <label>Project Description:</label>
              <textarea cols = "35" rows="8"  type = "textarea" onChange={this.handleChange} value = {this.state.projectDescription} name = "projectDescription" placeholder = "Description of project"/>
          </div>
          <div className = {classes.ProjectPhoto}>
              <div className = {classes.Image}>
                <img src = {this.state.projectPhotoURL|| "http://via.placeholder.com/300"}/>
                {loading}
              </div>
              <div className = {classes.PhotoBtns}>
                <input className = {classes.ChooseFile} type = "file" onChange = {this.projectFileSelectedHandler} placeholder = "select project photo"/>
                <button onClick = {this.uploadProjectPhoto} >Upload photo</button> 
              </div>
          </div>
        </div>
        <button className = {classes.AddNewProject} onClick = {this.handleAddNewProject} >Submit New Project</button>
      </div>
    )
  } 
}


// export default Radium(UserPage);
export default NewProject;
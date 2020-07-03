import React, {Component} from 'react';
import {storage} from '../../firebase';
import firebase from '../../firebase';
import classes from './Edit.module.css';
import ProjectEdit from './EditProjects/ProjectEdit/ProjectEdit';
import NewProject from './EditProjects/NewProject/NewProject';
import NewJob from './EditJobs/NewJob/NewJob';
import JobEdit from './EditJobs/JobEdit/JobEdit';
import EditJobs from './EditJobs/EditJobs'
import EditProjects from './EditProjects/EditProjects'

class Edit extends Component {
  constructor(props){
    super(props)
 
    this.state = {
      selectedUserPhotoFile:null,
      id:this.props.currentPerson['id'],
      username:this.props.currentPerson['username'],
      description:this.props.currentPerson['description'],
      summary:this.props.currentPerson['summary'],
      userPhotoURL:this.props.currentPerson['photo'],
      selectedUserPhotoFile:"",
      projects: this.props.currentPerson['projects'],
      jobs:this.props.currentPerson['jobs'],
      projectId:"",
      projectTitle:"",
      projectDescription:"",
      selectedProjectPhotoFile:null,
      projectPhotoURL:"",
      added:0,
      view:"main"
    }
  }
  
  photoFileSelectedHandler = event=>{
    this.setState({selectedUserPhotoFile:event.target.files[0]});
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  setView = (event)=>{
    this.setState({view:event.target.name})
  }

  
  fileUploadHandler = ()=>{
    if(this.state.selectedUserPhotoFile){
        const uploadTask = storage.ref(`images/${this.state.selectedUserPhotoFile.name}`).put(this.state.selectedUserPhotoFile);
        uploadTask.on(
            "state_changed",
            snapshot=>{},
            error=>{
                console.log(error);
            },
            ()=>{
                storage
                .ref("images")
                .child(this.state.selectedUserPhotoFile.name)
                .getDownloadURL()
                .then(url=>{
                    this.setState({userPhotoURL:url})
                });
            }
        )
    }else{
        alert("You haven't selected a photo")
    }    
  }

  handleNewChangesToPerson =()=>{
      let id = this.state.id;
      let username = this.state.username;
      let description = this.state.description;
      let photo = this.state.userPhotoURL;
      let summary = this.state.summary;
      const personRef = firebase.database().ref(`persons/${id}`);
      personRef.update({
          "username":username,
          "description":description,
          "photo":photo,
          "summary":summary
      })

  }
 
  render(){      
    let currentView = <div>placeholder</div>  
    let title = <h1 className = {classes.Title}>Edit your main profile</h1>
   if(this.state.view=="main"){
    currentView =   <div className = {classes.UserContainer}>
                        <div className = {classes.User}>
                          <div className = {classes.UserInfo}>
                            <div className = {classes.UserLabels}>
                                <label>name: </label>
                                <input type = "text" onChange = {this.handleChange} name = "username" value={this.state.username}/>
                                <label>tag line: </label>
                                <input type = "text" onChange = {this.handleChange} name = "description" value = {this.state.description}/>
                            </div>
                            <div className = {classes.UserPhoto}>
                                <img src = {this.state.userPhotoURL|| "http://via.placeholder.com/300"}/>
                                <input className ={classes.ChooseFile} type = "file" title = " Choose Photo" onChange = {this.photoFileSelectedHandler} placeholder="Select New Photo"/>
                                <button onClick = {this.fileUploadHandler}>Upload New Photo</button> 
                            </div>
                          </div>
                          <div className = {classes.UserSummary}>
                            <label>summary of self:</label>
                            <textarea type = "textarea" cols = "60" rows = "5" onChange = {this.handleChange} name = "summary" value={this.state.summary}/>
                          </div>
                        </div>
                        <div className = {classes.ChangesToPerson}>
                          <button  onClick = {this.handleNewChangesToPerson}>Save New Changes</button>
                        </div>
                      </div>;
      title = <h1 className = {classes.Title}>Edit your main profile</h1>

      }else if(this.state.view=="jobs"){
      currentView = <EditJobs currentPerson = {this.props.currentPerson} jobs = {this.state.jobs} currentPersonId = {this.state.id}/>
      title = <h1 className = {classes.Title}>Edit your jobs</h1>  
    } else if(this.state.view= "projects"){
      currentView = <EditProjects  currentPerson = {this.props.currentPerson} projects = {this.state.projects} currentPersonId = {this.state.id}/>
      title = <h1 className = {classes.Title}>Edit your projects</h1>
    }               
    return (
      <div className={classes.Edit}>
          {title}
          <div className = {classes.Sidebar}>
            <button onClick = {this.setView} name = "main">Main</button>
            <button onClick = {this.setView} name = "jobs">Jobs</button>
            <button onClick = {this.setView} name = "projects">Projects</button>
          </div> 
          <div className = {classes.Content}> {currentView} </div>  
         
      </div>
    );
  };
}


export default Edit;
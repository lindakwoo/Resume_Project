import React, {Component} from 'react';
import {storage} from '../../firebase';
import firebase from '../../firebase';
import classes from './Edit.module.css';
import ProjectEdit from './EditProjects/ProjectEdit/ProjectEdit';
import NewProject from './EditProjects/NewProject/NewProject';
import NewJob from './EditJobs/Job/NewJob/NewJob';
import JobEdit from './EditJobs/Job/JobEdit/JobEdit';
import EditJobs from './EditJobs/EditJobs'

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

    let projects = <div>no projects at this time</div> 
    let jobs = <div>no jobs at this time</div>
        if(this.props.currentPerson["username"]){
            if(this.state.projects.length>0){
                projects = this.state.projects.map(project=>{
                    return (
                      <ProjectEdit
                        key = {project["id"]}
                        currentPersonId = {this.state.id}
                        projectId = {project["id"]}
                        projectTitle = {project["projectTitle"]}
                        projectDescription = {project["projectDescription"]}
                        photo = {project["photo"]||"http://via.placeholder.com/300"}
                        />
                    )
                })
            }
            if(this.props.currentPerson["jobs"].length>0){
                jobs = this.state.jobs.map(job=>{
                    return (
                      <JobEdit
                        key = {job["id"]}
                        currentPersonId = {this.state.id}
                        jobId = {job["id"]}
                        jobEmployer = {job["jobEmployer"]}
                        jobTitle = {job["jobTitle"]}
                        jobDescription = {job["jobDescription"]}
                        />
                    )
                })
            }      
        }    
        
    return (
      <div className={classes.Edit}>
            <div className = {classes.User}>
                <div className = {classes.UserInfo}>
                    <label>name:</label>
                    <input type = "text" onChange = {this.handleChange} name = "username" value={this.state.username}/>
                    <label>tag line</label>
                    <input type = "text" onChange = {this.handleChange} name = "description" value = {this.state.description}/>
                </div>
                <div className = {classes.UserPhoto}>
                    <input type = "file" onChange = {this.photoFileSelectedHandler} placeholder="Select New Photo"/>
                    <button onClick = {this.fileUploadHandler}>Upload New Photo</button>
                    <img src = {this.state.userPhotoURL|| "http://via.placeholder.com/300"}/>
                </div>
                <div className = {classes.UserSummary}>
                  <label>summary of self:</label>
                  <textarea type = "textarea" cols = "30" rows = "5" onChange = {this.handleChange} name = "summary" value={this.state.summary}/>
                </div>
                <div className = {classes.ChangesToPerson}>
                  <button  onClick = {this.handleNewChangesToPerson}>Save New Changes</button>
                </div>
            </div>
            <div className = {classes.Sidebar}>
            <button onClick = {this.setView} name = "main">Main</button>
            <button onClick = {this.setView} name = "jobs">Jobs</button>
            <button onClick = {this.setView} name = "projects">Projects</button>
          </div> 
            <EditJobs jobs = {jobs} currentPersonId = {this.state.id}/>
            <div classame = {classes.Projects}>
              <div className = {classes.CurrentProjects}>
                  Projects:
                  {projects}
              </div>
              <div className = {classes.NewProject}>
                Add a new project:
                <NewProject currentPersonId={this.state.id}/>
              </div>
            </div>
         
      </div>
    );
  };
}


export default Edit;
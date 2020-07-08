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
import Spinner from '../../UI/Spinner/Spinner'
import ChooseWords from './EditMain/Words/ChooseWords/ChooseWords'

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
      view:"main",
      loading:false
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
      this.setState({loading:true})
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
                    this.setState({userPhotoURL:url, loading:false})
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
      let summary = this.state.summary||" ";
      const personRef = firebase.database().ref(`persons/${id}`);
      personRef.update({
          "username":username,
          "description":description,
          "photo":photo,
          "summary":summary
      })
  }

  addProjectToEdit=(newProject)=>{
    let projects = this.state.projects;
      projects.push(newProject);
      this.setState({projects:projects})
  }
 
  addJobToEdit=(newJob)=>{
    let jobs = this.state.jobs;
      jobs.push(newJob);
      this.setState({jobs:jobs})
  }

  deleteProjectFromEdit = (id)=>{
    let projects = this.state.projects;
    let index = projects.findIndex(project=>{return project.id ===id})
    projects.splice(index,1);
    this.setState({projects:projects})
  }

  deleteJobFromEdit = (id)=>{
    let jobs = this.state.jobs;
    let index = jobs.findIndex(job=>{return job.id ===id})
    jobs.splice(index,1);
    this.setState({jobs:jobs})
  }

  render(){      
    let loading = <div className = {classes.Loading}></div>
    if(this.state.loading){
      loading = <div className = {classes.Loading}><Spinner/></div>
    }
    let currentView = <div>placeholder</div>  
    let title = <h1 >Edit your main profile</h1>
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
                                <div className = {classes.Image}>
                                  <img src = {this.state.userPhotoURL|| "http://via.placeholder.com/300"}/>
                                  {loading}
                                </div>
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
      currentView = <EditJobs 
                      currentPerson = {this.props.currentPerson} 
                      jobs = {this.state.jobs} 
                      addJobToEdit={this.addJobToEdit} 
                      deleteJobFromEdit = {this.deleteJobFromEdit}
                      currentPersonId = {this.state.id}/>
      title = <h1>Edit your jobs</h1>  
    } else if(this.state.view=="projects"){
      currentView = <EditProjects  
                      currentPerson = {this.props.currentPerson} 
                      projects = {this.state.projects} 
                      addProjectToEdit = {this.addProjectToEdit} 
                      deleteProjectFromEdit = {this.deleteProjectFromEdit}
                      currentPersonId = {this.state.id}/>
      title = <h1>Edit your projects</h1>
    } else if(this.state.view == "words"){
      currentView = <ChooseWords
                      currentPerson = {this.props.currentPerson}
                      currentPersonId = {this.state.id}/>
      title = <h1>Choose five words to describe yourself</h1>
    }              
    return (
      <div className={classes.Edit}>
          <div className = {classes.Title}>  {title}</div>
          <div className = {classes.Sidebar}>
            <button onClick = {this.setView} name = "main">Main</button>
            <button onClick = {this.setView} name = "jobs">Jobs</button>
            <button onClick = {this.setView} name = "projects">Projects</button>
            <button onClick = {this.setView} name = "words">Words</button>
          </div> 
          <div className = {classes.Content}> {currentView} </div> 
          
         
      </div>
    );
  };
}


export default Edit;
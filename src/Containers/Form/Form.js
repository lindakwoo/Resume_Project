import React, {Component} from 'react';
import {storage} from '../../firebase';
import firebase from '../../firebase';

class Form extends Component {
  constructor(props){
    super(props)
 
    this.state = {
      selectedUserPhotoFile:null,
      id:"",
      username:"",
      description:"",
      userPhotoURL:"",
      projectTitle:"",
      projectDescription:"",
      selectedProjectPhotoFile:null,
      projectPhotoURL:""
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
        newState.push({
          id:person,
          username:persons[person].username,
          description:persons[person].description,
          photo:persons[person].photo,
          projects:projects
        });
      }
      this.setState({persons:newState})
    })
  }

  returnHome =()=>{
    this.props.returnHome();
  }
  
  photoFileSelectedHandler = event=>{
    this.setState({selectedUserPhotoFile:event.target.files[0]});
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleAddNewPerson = event=>{
    event.preventDefault();
    const personsRef = firebase.database().ref('persons');
    const person = {
      username: this.state.username,
      description: this.state.description,
      photo: this.state.userPhotoURL,
    }
    personsRef.push(person)
      .then(()=>{
        let personsArray = [...this.state.persons]
        let currentUsername = this.state.username;
        for(let personX of personsArray){
          if(personX.username===this.state.username){
            this.setState({id:personX.id})
          }
        }
      })
      .catch(e=>{
        console.log("error saving data: ", e)
      })
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

  submitProjectHandler =(event)=>{
    event.preventDefault();
      let id = this.state.id;
      let projectTitle=this.state.projectTitle;
      let projectDescription = this.state.projectDescription;
      let projectPhotoURL = this.state.projectPhotoURL;
      const projectsRef = firebase.database().ref(`persons/${id}/projects`);
      projectsRef.push({
        "projectTitle":projectTitle,
        "projectDescription":projectDescription,
        "photo":projectPhotoURL
      })
      this.setState({projectDescription:"", projectTitle:"", projectPhotoURL:"", selectedProjectPhotoFile:null});
  }
 
 
  render(){
    return (
      <div className="App">
        <div className = 'container'>
            <button onClick={this.returnHome}>return home</button>
            <input type = "text" onChange = {this.handleChange} name = "username" placeholder = "What is your name?"/>
            <input type = "text" onChange = {this.handleChange} name = "description" placeholder = "What is your description/title?"/>
            <input type = "file" onChange = {this.photoFileSelectedHandler}/>
            <button onClick = {this.fileUploadHandler}>Upload Photo</button>
            <img src = {this.state.userPhotoURL|| "http://via.placeholder.com/300"}/>
            <button className = "addPerson" onClick = {this.handleAddNewPerson}>Add New Person</button>
            <input type="text" onChange = {this.handleChange} value = {this.state.projectTitle} name = "projectTitle" placeholder = "Name of project"/>
            <input type = "textarea" onChange={this.handleChange} value = {this.state.projectDescription} name = "projectDescription" placeholder = "Description of project"/>
            <input type = "file" onChange = {this.projectFileSelectedHandler} placeholder = "choose project photo"/>
            <button onClick = {this.uploadProjectPhoto} >upload project photo</button> 
            <img src = {this.state.projectPhotoURL|| "http://via.placeholder.com/300"}/>
            <button onClick = {this.submitProjectHandler} >submit project</button>
         
        </div>
      </div>
    );
  };
}


export default Form;
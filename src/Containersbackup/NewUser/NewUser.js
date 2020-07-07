import React, {Component} from 'react';
import {storage} from '../../firebase';
import firebase from '../../firebase';
import classes from './NewUser.module.css';

class NewUser extends Component {
  constructor(props){
    super(props)
 
    this.state = {
      selectedUserPhotoFile:null,
      id:"",
      username:"",
      description:"",
      userPhotoURL:"",
      persons:[]
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
    this.props.modalClosed();  
  }
  
  fileUploadHandler = ()=>{
    if(this.state.selectedUserPhotoFile){
        const uploadTask = storage.ref(`images/${this.state.selectedUserPhotoFile.name}`).put(this.state.selectedUserPhotoFile);
        console.log(uploadTask)
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

 
  render(){
    return (
      <div className={classes.NewUser}>
          <div className = {classes.LeftSide}>
            <input type = "text" onChange = {this.handleChange} name = "username" placeholder = "Enter name"/>
            <input type = "text" onChange = {this.handleChange} name = "description" placeholder = "Describe yourself briefly"/>
            <div className = {classes.CustomChooseFileContainer}>
                <label className = {classes.CustomFileUpload}>
                    <input className = {classes.ChooseFile} type = "file" onChange = {this.photoFileSelectedHandler}/>
                    <div>Choose Photo</div>
                </label>
                {this.state.selectedUserPhotoFile? <div>{this.state.selectedUserPhotoFile["name"]}</div>:<div></div>}
            </div>
            <button onClick = {this.fileUploadHandler}>Upload Photo</button>
        </div> 
        <div className = {classes.RightSide}>
            <img src = {this.state.userPhotoURL|| "http://via.placeholder.com/300"}/>
            <button className = {classes.AddPerson} onClick = {this.handleAddNewPerson}>Submit</button>
        </div>    
      </div>
    );
  };
}

export default NewUser;
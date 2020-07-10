import React, {Component} from 'react';
import classes from './Landing.module.css';
import Aux from '../../hoc/Aux'
import Modal from '../../UI/Modal/Modal';
import { useHistory } from "react-router-dom";
import history from '../../History'
import NavigationItem from '../Navigation/NavigationItem/NavigationItem'
import NewUser from '../../Containers/NewUser/NewUser'
import Leafs from "./leafs.png"


const landing =(props)=>{
 
    return  (
          <Aux>
            <Modal show = {props.loggingIn} modalClosed = {props.closeLogin}>
              <div className = {classes.LogIn}>
                <p>LOGIN</p>
                <input type = "text" name = "currentUsername" placeholder = "enter user's name" onChange = {props.handleChange}/>
              </div>
              <button className = {classes.LoginSubmit} onClick = {props.logInHandler}><NavigationItem link = '/MyPage'> Submit</NavigationItem></button>
            </Modal>
            <Modal show = {props.addingNewUser} modalClosed = {props.closeAddingNewUser}>
              <NewUser modalClosed = {props.closeAddingNewUser} persons = {props.persons} setUserName = {props.setUserName}/>
            </Modal>
           
            <img className = {classes.Leaf} src = {Leafs}/>
            <h2 className = {classes.Title}>Rezoom</h2>
            <div className = {classes.Home}>
            </div>
            <div className = {classes.Back}></div>
            <div className = {classes.SignInUpBtns}>
              <button className = {classes.SignInBtn} onClick = {props.signIn}>Sign In</button>
              <p>Are you new?</p>
              <button className = {classes.NewUserBtn} onClick = {props.newUser}>New User</button>
            </div>
          
          </Aux>
    )
  
}

export default landing;

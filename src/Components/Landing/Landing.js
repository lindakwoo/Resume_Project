import React, {Component, createRef} from 'react';
import classes from './Landing.module.css';
import Aux from '../../hoc/Aux'
import Modal from '../../UI/Modal/Modal';
import { useHistory } from "react-router-dom";
import history from '../../History'
import NavigationItem from '../Navigation/NavigationItem/NavigationItem'
import NewUser from '../../Containers/NewUser/NewUser'
import Leafs from "../../images/leafs.png"
import Arrow from "../../images/arrow.png"


const Landing  =(props)=> {
 


  let siteDesc= React.createRef();
  let p1=React.createRef();
  let siteDesc2 =React.createRef();
  let p2=React.createRef();
  let signBtns2=React.createRef();

    let place = 0;
    window.addEventListener("scroll", (e)=>{
      if(p1.current&&p2.current&&siteDesc2.current){
     place = window.pageYOffset;
      p1.current.style.transform = `translate(-50%,${.2*place}px)`;
      p2.current.style.transform = `translate(-50%,${.4*place}px)`;
      siteDesc2.current.style.transform = `translate(0,${-.1*place}px)`;
      }
    
    })


    return  (
          <Aux>
            <Modal show = {props.loggingIn} modalClosed = {props.closeLogin} top = {props.top}>
              <div className = {classes.LogIn}>
                <p>LOGIN</p>
                <input type = "text" onChange = {props.handleChange} name = "currentUsername" placeholder = "Enter name"/>
                <input type = "password" name = "password" placeholder = "enter password" onChange = {props.handleChange}/>
              </div>
              <button className = {classes.LoginSubmit} onClick = {props.logInHandler}><NavigationItem link = '/MyPage'> Submit</NavigationItem></button>
            </Modal>
            <Modal show = {props.addingNewUser} modalClosed = {props.closeAddingNewUser} top = {props.top}>
              <NewUser modalClosed = {props.closeAddingNewUser}  persons = {props.persons} setUserName = {props.setUserName}/>
            </Modal>
           
            <img className = {classes.Leaf} src = {Leafs}/>
            <h2 className = {classes.Title}>Rezoom</h2>
            <div className = {classes.Home}>
            </div>
            <div className = {classes.Back}></div>
            <div className = {classes.SignInUpBtns}>
              <button className = {classes.SignInBtn} onClick = {()=>props.signIn(0)}>Sign In</button>
              <p>Are you new?</p>
              <button className = {classes.NewUserBtn} onClick = {()=>props.newUser(0)}>New User</button>
            </div>
            
            <div className = {classes.SiteDesc} ref={siteDesc} >
              <p ref = {p1} >Build your online resume in minutes.</p>
            </div>
            <div className = {classes.SiteDesc2} ref = {siteDesc2}>
           
            <p ref = {p2}>Share your qualities with potential employers.</p>
            <div className = {classes.SignInUpBtns2} ref = {signBtns2}>
                <button className = {classes.SignInBtn2} onClick = {()=>props.signIn(1500)}>Sign In</button>
                <button className = {classes.NewUserBtn2}  onClick = {()=>props.newUser(1500)}>Sign Up</button>
            </div>
            </div>
            
          
          </Aux>
    )
  
  
}

export default Landing;



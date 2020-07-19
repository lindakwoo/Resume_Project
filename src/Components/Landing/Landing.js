import React, {Component, createRef} from 'react';
import classes from './Landing.module.css';
import Aux from '../../hoc/Aux'
import Modal from '../../UI/Modal/Modal';
import { useHistory } from "react-router-dom";
import history from '../../History'
import NavigationItem from '../Navigation/NavigationItem/NavigationItem'
import NewUser from '../../Containers/NewUser/NewUser'
import Leafs from "./leafs.png"
import Arrow from "../../images/arrow.png"


class Landing extends Component {
  state = {
    siteDesc:React.createRef(),
    p1:React.createRef(),
    siteDesc2:React.createRef(),
    p2:React.createRef(),
    signBtns2:React.createRef(),
  }

  render(){
    // let place = 0;
    // window.addEventListener("scroll", (e)=>{
    //  place = window.pageYOffset;
    //   this.state.p1.current.style.transform = `translate(-50%,${.2*place}px)`;
    //   this.state.p2.current.style.transform = `translate(-50%,${.4*place}px)`;
    //   this.state.siteDesc2.current.style.transform = `translate(0,${-.1*place}px)`;
    
    // })


    return  (
          <Aux>
            <Modal show = {this.props.loggingIn} modalClosed = {this.props.closeLogin}>
              <div className = {classes.LogIn}>
                <p>LOGIN</p>
                <input type = "text" name = "currentUsername" placeholder = "enter user's name" onChange = {this.props.handleChange}/>
                <input type = "password" name = "password" placeholder = "enter password" onChange = {this.props.handleChange}/>
              </div>
              <button className = {classes.LoginSubmit} onClick = {this.props.logInHandler}><NavigationItem link = '/MyPage'> Submit</NavigationItem></button>
            </Modal>
            <Modal show = {this.props.addingNewUser} modalClosed = {this.props.closeAddingNewUser}>
              <NewUser modalClosed = {this.props.closeAddingNewUser} persons = {this.props.persons} setUserName = {this.props.setUserName}/>
            </Modal>
           
            <img className = {classes.Leaf} src = {Leafs}/>
            <h2 className = {classes.Title}>Rezoom</h2>
            <div className = {classes.Home}>
            </div>
            <div className = {classes.Back}></div>
            <div className = {classes.SignInUpBtns}>
              <button className = {classes.SignInBtn} onClick = {this.props.signIn}>Sign In</button>
              <p ref = {this.state.p1}>Are you new?</p>
              <button className = {classes.NewUserBtn} onClick = {this.props.newUser}>New User</button>
            </div>
            
            <div className = {classes.SiteDesc} ref={this.state.siteDesc} >
              <p ref = {this.state.p1} >Build your online resume in minutes.</p>
            </div>
            <div className = {classes.SiteDesc2} ref = {this.state.siteDesc2}>
           
            <p ref = {this.state.p2}>Share your qualities with potential employers.</p>
            <div className = {classes.SignInUpBtns2} ref = {this.state.signBtns2}>
                <button className = {classes.SignInBtn2} onClick = {this.props.signIn}>Sign In</button>
                <button className = {classes.NewUserBtn2}  onClick = {this.props.newUser}>Sign Up</button>
            </div>
            </div>
            
          
          </Aux>
    )
  }
  
}

export default Landing;



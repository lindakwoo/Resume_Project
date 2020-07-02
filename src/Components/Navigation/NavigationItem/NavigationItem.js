import React from 'react';
import classes from './NavigationItem.module.css';
import {Route, Link, Switch} from "react-router-dom";

const NavigationItem = (props)=>(
    <li className = {classes.NavigationItems}>
        <Link className = {classes.Links} to = {props.link}> {props.children}</Link>
   </li>
);

export default NavigationItem;
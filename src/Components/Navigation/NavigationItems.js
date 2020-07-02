import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props)=>(
    <ul className = {classes.NavigationItems}>
         <NavigationItem link = '/'>Home</NavigationItem>
        <NavigationItem link = '/EditMyPage'>Edit My Page</NavigationItem>
        <NavigationItem link = '/MyPage'> Go To My Page</NavigationItem>
   </ul>
);

export default NavigationItems;
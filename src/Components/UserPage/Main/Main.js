import React from 'react';
import classes from './Main.module.css'

const main = (props)=>{

    let wordsDisplay = props.words.map(word=>{
        return <div className = {classes.Word}><div className = {classes.Leafs}></div>{word['word']} </div>
      })
      
    return(
        <div className = {classes.Main}>
            <div className = {classes.Summary}> {props.currentPerson["summary"]}</div>
           
            <div className = {classes.WordsDisplay}>{wordsDisplay}</div>
        </div>
    )

}

export default main;
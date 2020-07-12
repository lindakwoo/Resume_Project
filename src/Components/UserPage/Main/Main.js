import React from 'react';
import classes from './Main.module.css'

const main = (props)=>{
    let wordsDisplay = <div></div>
    if(props.currentPerson.words){
        wordsDisplay = props.currentPerson.words.map(word=>{
            return <div className = {classes.Word}><div className = {classes.Leafs}></div>{word['word']} </div>
        })
    }
      
    return(
        <div className = {classes.Main}>
            <div className = {classes.Summary}> {props.currentPerson["summary"]}</div>
            <div className = {classes.WordsDisplay}>{wordsDisplay}</div>
        </div>
    )

}

export default main;
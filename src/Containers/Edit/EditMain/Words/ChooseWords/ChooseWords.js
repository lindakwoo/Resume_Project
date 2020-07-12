import React, {Component} from "react";
import words from '../words.json'
import classes from "./ChooseWords.module.css";
import {storage} from '../../../../../firebase';
import firebase from '../../../../../firebase';

class ChooseWords extends Component{

    state = {
        chosenWords:this.props.currentPerson["words"]||[],
        workingChosenWords:[],
        chosenWord:"",
        currentPerson:this.props.currentPerson,
        currentPersonId:this.props.currentPersonId,
    }

    componentDidMount(){
        let words = this.state.chosenWords.map(word=>{
            return word["word"];
        })
        this.setState({workingChosenWords:words})
    }
    updateDatabase =(chosenWords)=>{
        let personId = this.state.currentPersonId;
        let wordsRef = firebase.database().ref(`persons/${personId}/words`);
          wordsRef.remove()
          wordsRef = firebase.database().ref(`persons/${personId}/words`);
          for(let i = 0;i<chosenWords.length;i++){
              wordsRef.push(chosenWords[i]); 
          }
    }

    handleAddNewWord =(event)=>{
        event.preventDefault();
        let workingChosenWords = [...this.state.workingChosenWords];
        if(workingChosenWords.length<5){
          workingChosenWords.push(event.target.innerText);
          this.updateDatabase(workingChosenWords);
        }else{
            alert("too many.  click on one word to delete");
        }
        this.setState({chosenWord:event.target.innerText,workingChosenWords:workingChosenWords});
      }

    deleteWord = (event)=>{
        let word = event.target.innerText;
        let workingChosenWords = [...this.state.workingChosenWords];
        let index = workingChosenWords.indexOf(word);
        workingChosenWords.splice(index,1);
        this.updateDatabase(workingChosenWords);
        this.setState({workingChosenWords:workingChosenWords});
    }

    render(){
    
        let allWordsArray = [];
        let categoryWords = [];
        for(let category in words){
            categoryWords =[];
            words[category].forEach(word=>{
                categoryWords.push(<div className = {classes.Word} onClick = {this.handleAddNewWord}>{word}</div>)
            })
            allWordsArray.push(<div className = {classes.WordCategoryContainer}><h4 className = {classes.CategoryTitle}>{category}</h4><div className = {classes.Words}>{categoryWords}</div></div>)
        }
        let workingChosenWords = []
        workingChosenWords = this.state.workingChosenWords.map(word=>{
            return <div className = {classes.ChosenWordContainer}><div className = {classes.ChosenWord} onClick = {this.deleteWord}>{word}</div><span> delete x</span></div>
        })
        if(workingChosenWords.length<5){
            for(let i = workingChosenWords.length;i<5;i++){
                workingChosenWords.push(<div className = {classes.ChosenWordBlank}>Blank</div>)
            }
        }

        return(
            <div className = {classes.ChooseWordsContainer}>
                <div className = {classes.ChosenWords}>{workingChosenWords}</div>
                <div className = {classes.WordsContainer}>
                    {allWordsArray}
                </div>
            </div>
        )
    }

}

export default ChooseWords;
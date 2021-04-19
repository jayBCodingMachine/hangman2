import React, { useState } from 'react';
import { randomWord } from "./words.js"
import img0 from "./imgs/0.jpg";
import img1 from "./imgs/1.jpg";
import img2 from "./imgs/2.jpg";
import img3 from "./imgs/3.jpg";
import img4 from "./imgs/4.jpg";
import img5 from "./imgs/5.jpg";
import img6 from "./imgs/6.jpg";
import "../css/Hangman.css";
import { useTimer } from 'use-timer';






function Hangman(props) {

    const { time, start, pause, reset, status } = useTimer({
        initialTime: 15,
        timerType: 'DECREMENTAL',
        endTime: 0
      });
    
     
     
    const [game, setGame] = useState({ nWrong: 0, guessed: new Set(), answer: randomWord()})
    const images = [img0, img1, img2, img3, img4, img5, img6];

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
 function guessedWord() {
        return game.answer.split("").map(ltr => (game.guessed.has(ltr) ? ltr : "_"));
      }
    
      /** handleGuest: handle a guessed letter:
        - add to guessed letters
        - if not in answer, increase number-wrong guesses
      */
 function handleGuess(evt) {

        reset();
        start();
       
        let ltr = evt.target.value;
        setGame(st => ({
          guessed: st.guessed.add(ltr),
          nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
          answer: st.answer
        }));
      }
    
      /** generateButtons: return array of letter buttons to render */
  function  generateButtons() {
            
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
          <button
            key={ltr}
            value={ltr}
            onClick={handleGuess}
            disabled={game.guessed.has(ltr)}
          >
            {ltr}
          </button>
        ));
      }
    
   function  handleRestGame() {
        reset();
         setGame(st => ({ nWrong: 0, guessed: new Set(), answer: randomWord() }));
      }

 
    
      let  loser = <p className="Hangman-wrong-words"> Loser😝 The answer is: {game.answer} </p>
      let imgText =  game.nWrong + " wrong guesses.";
      
      
        
      return (
        <div className='Hangman'>
          <h1>Hangman</h1>
          <img src={images[game.nWrong]} alt={imgText} />
        <div>{time === 0 ? <h2>Why are you so slow</h2> :   <h2 className={time > 8 ? "Hangman-timer-start":"Hangman-timer-end"}> {time } </h2>        }</div>
          <p className='Hangman-wrong-words'>Current wrong guessed: {game.nWrong} </p>
          <p className='Hangman-word'>{guessedWord()}</p>
         { game.nWrong === props.maxWrong ? loser : 
         <p className='Hangman-btns'>{generateButtons()}</p>}
         <button id="rest" onClick={handleRestGame} >RESET GAME</button>
        </div>
      );       
}

export default Hangman;
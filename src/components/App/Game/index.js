import React, { Component } from 'react';

import Question from './Question';
import Controls from './Controls';
import NewQuiz from './NewQuiz';

import { CFG, MESSAGES, UNITS, BTN } from 'common/constants'
import { getRandom } from 'common/common'


class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      score: { correct: 0, attempted: 0 },
      difficulty: 1, // 0-3, 0 being easy
      currentMeasurement: 0,
      isImpToMet: true,
      choices: [],
      guessed: false,
      answer: { answerNum: 0, questionNum: 0, location: 0 },
      btnStatus: {
        code: Array(CFG.MAX_NUM_ANSWERS).fill(BTN.DEFAULT),
        isEnabled: Array(CFG.MAX_NUM_ANSWERS).fill("true")
      },
      message: MESSAGES.random("start"),
      isNewQuiz: false
    };
  }

  componentWillMount() {
    this.generateQ();
  }

/*********************************************************************/

  handleGuess(guessIndex) {
    console.log("Game.handleGuess");
    // console.log(UNITS[this.state.currentMeasurement]);

    var newMessage;
    var newScore = this.state.score;
    var newBtnStatus = { code: Array(CFG.MAX_NUM_ANSWERS-this.state.difficulty).fill("default"), isEnabled: Array(CFG.MAX_NUM_ANSWERS-this.state.difficulty).fill(false)};

    if (guessIndex===this.state.answer.location) {
      newMessage = MESSAGES.random("success");
      newScore.correct++;
    } else {
      newMessage = MESSAGES.random("failure") + " The correct answer was " +
            this.state.answer.answerNum + " " +
            UNITS[this.state.currentMeasurement][(this.state.isImpToMet)?"metric":"imperial"].abbreviation;
    }
    newScore.attempted++;
    newBtnStatus.code[guessIndex]=BTN.WRONG;
    newBtnStatus.code[this.state.answer.location]=BTN.CORRECT;
    newBtnStatus.isEnabled[this.state.answer.location]=true;
    this.setState( { message: newMessage, btnStatus: newBtnStatus, score: newScore, guessed: true } );

  }

/*********************************************************************/

  generateQ() {

    // console.log("Game.generateQ");

    var curMin = UNITS[this.state.currentMeasurement][(this.state.isImpToMet)?"imperial":"metric"].rangeMin;
    var curMax = UNITS[this.state.currentMeasurement][(this.state.isImpToMet)?"imperial":"metric"].rangeMax;
    var questionNum = getRandom(curMin, curMax);
    var answerNum = UNITS[this.state.currentMeasurement][(this.state.isImpToMet)?"imperial":"metric"].convert(questionNum);
    var numAnswers = this.state.difficulty + 2;
    var answerLoc = Math.floor(getRandom(0, numAnswers));
    var choices = [];

    for (var i = 0; i < numAnswers; i++) {
      // factor is an additive adjust relative to the answer,
      // spread across the CFG.ANSWER_SPREAD
      var factor = (i-answerLoc)*(CFG.ANSWER_SPREAD/(numAnswers-1))
      var num = answerNum + factor*answerNum
      choices[i] = this.prettyNum(num)
    }

    questionNum = this.prettyNum(questionNum);
    answerNum = this.prettyNum(answerNum);

    var btnStatus = {
      code: Array(CFG.MAX_NUM_ANSWERS).fill(BTN.DEFAULT),
      isEnabled: Array(CFG.MAX_NUM_ANSWERS).fill("true")
    }


    this.setState( { btnStatus: btnStatus, choices: choices, answer: { location: answerLoc, answerNum: answerNum, questionNum: questionNum, guessed: false } } );
  }

/*********************************************************************/

  prettyNum(num) {
     var mult = Math.pow(10, CFG.NUM_SIG_DIGITS - Math.floor(Math.log10(num)) - 1);
     return Math.round(num * mult) / mult;
  }

  /*********************************************************************/

  handleSetup() {
    this.setState({ isNewQuiz: true })
  }
  handleCancel() {
    this.setState({ isNewQuiz: false })
  }
  handleSave(status) {
    status.isNewQuiz = false
    this.setState( status, this.generateQ)
  }

  handleNextQuestion() {
    if (this.state.guessed) {
      this.generateQ()
    } else {

      var newScore = this.state.score
      newScore.attempted++
      this.setState({ score: newScore }, this.generateQ)
    }
  }

  handleResetScore() {
    this.setState({ score: { correct: 0, attempted: 0 } }, this.generateQ)
  }

/*********************************************************************/

  render() {
    // console.log("Game");
    // console.log(this.state);

    return (
      <div>
        <Question
            choices={this.state.choices}
            answer={this.state.answer}
            currentMeasurement={this.state.currentMeasurement}
            isImpToMet={this.state.isImpToMet}
            btnStatus={this.state.btnStatus}
            handleGuess={this.handleGuess.bind(this)}
        />

        <Controls
            score={this.state.score}
            message={this.state.message}
            handleNextQuestion={this.handleNextQuestion.bind(this)}
            handleResetScore={this.handleResetScore.bind(this)}
            handleSetup={this.handleSetup.bind(this)}
        />

        <NewQuiz
            isNewQuiz={this.state.isNewQuiz}
            difficulty={this.state.difficulty}
            currentMeasurement={this.state.currentMeasurement}
            isImpToMet={this.state.isImpToMet}
            handleCancel={this.handleCancel.bind(this)}
            handleSave={this.handleSave.bind(this)}
        />


      </div>
    );
  }
} // Game

export default Game;

import React, { Component } from 'react';
import 'react-bootstrap'

import { Button, ButtonGroup } from 'react-bootstrap'

import Message from './Message';

class Controls extends Component {

  render() {
    var scoreString = this.props.score.correct + "/" + this.props.score.attempted + " correct";
    if (this.props.score.attempted>0)
      scoreString+= " " + Math.round(100*this.props.score.correct/this.props.score.attempted) + "%";
    // console.log("Controls.render");
    // console.log(BTN);
    return (
        <div className="container">
          <div>
            <Message message={this.props.message} />
          </div>
          <div>
            {scoreString}
          </div>
          <div>
            <ButtonGroup>
              <Button bsStyle="success" onClick={this.onNextQuestion.bind(this)}>Next Question</Button>
              <Button bsStyle="warning" onClick={this.onResetScore.bind(this)}>Reset Score</Button>
              <Button bsStyle="info" onClick={this.onSetup.bind(this)}>Setup</Button>
            </ButtonGroup>
          </div>
        </div>
      );
    }

    onNextQuestion() {
      this.props.handleNextQuestion();
    }
    onResetScore() {
      this.props.handleResetScore();
    }
    onSetup() {
      this.props.handleSetup();
    }
}

export default Controls;

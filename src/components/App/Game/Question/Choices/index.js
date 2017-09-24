import React, { Component } from 'react';

import { ButtonGroup, Button } from 'react-bootstrap'

import { UNITS } from 'common/constants'

class Choices extends Component {

  renderChoiceButton(choice, i) {
    return (
      <Button bsSize="large" bsStyle={this.props.btnStatus.code[i]} key={i}
             onClick={this.onGuess.bind(this, i)} disabled={!this.props.btnStatus.isEnabled[i]} >
          {choice}&nbsp;{UNITS[this.props.currentMeasurement][(this.props.isImpToMet)?"metric":"imperial"].abbreviation}
      </Button> 
    )
  }

  render() {
    return (
      <div className="center">
        <ButtonGroup bsSize="large">
          {this.props.choices.map((choice, i) => this.renderChoiceButton(choice, i)) }
        </ButtonGroup>
      </div>
    );
  }
  onGuess(guessIndex) {
    this.props.passGuess(guessIndex);
  }
}

export default Choices;

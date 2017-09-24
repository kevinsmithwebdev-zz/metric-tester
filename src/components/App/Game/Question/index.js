import React, { Component } from 'react';

import Choices from './Choices';

import { UNITS } from 'common/constants'


class Question extends Component {

    render() {
      // console.log("Question.render");
      // console.log(this.props);

      return (
        <div>
          <h2 className="center">
            Convert&nbsp;
            {UNITS[this.props.currentMeasurement][(!this.props.isImpToMet)?"metric":"imperial"].units}
            &nbsp;to&nbsp;
            {UNITS[this.props.currentMeasurement][(this.props.isImpToMet)?"metric":"imperial"].units}
          </h2>

          <h3 className="center">
            How many&nbsp;
            {UNITS[this.props.currentMeasurement][(this.props.isImpToMet)?"metric":"imperial"].units}
            &nbsp;is&nbsp;
            {this.props.answer.questionNum}&nbsp;
            {UNITS[this.props.currentMeasurement][(!this.props.isImpToMet)?"metric":"imperial"].abbreviation}
          </h3>

          <Choices choices={this.props.choices}
              currentMeasurement={this.props.currentMeasurement}
              isImpToMet={this.props.isImpToMet}
              answer={this.props.answer}
              btnStatus={this.props.btnStatus}
              passGuess={this.passGuess.bind(this)}
           />

        </div>
      );
    }

    passGuess(guessIndex) {
      this.props.handleGuess(guessIndex);
    }
}

export default Question;

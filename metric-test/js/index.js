"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var LB_PER_KG = 2.20462;

var UNITS = {
  weight1: {
    imperial: { units: "pounds", abbreviation: "lb", rangeMin: 10, rangeMax: 1000, convert: function convert(imperial) {
        return imperial / LB_PER_KG;
      } },
    metric: { units: "kilograms", abbreviation: "kg", rangeMin: 10, rangeMax: 500, convert: function convert(metric) {
        return metric * LB_PER_KG;
      } }
  }
};

var NUM_SIG_DIGITS = 3;
var NUM_ANSWERS = 4;

var MESSAGES = {
  start: ["What do you think?", "Wanna take a guess?"],
  success: ["Well done!", "Awesome!", "You're a star!", "You aren't cheating, are you?", "Tres bien!"],
  failure: ["Too bad.", "Better luck next time.", "Sorry, it takes practice."],
  random: function random(type) {
    if (this.hasOwnProperty(type) && type != "random") // wowsers - get function name dynamically?
      return this[type][getRandom(0, this[type].length, true)];else {
      console.error('Type "' + type + '" is not a valid property of MESSAGES.');
      return "Message type error.";
    }
  }
};

function getRandom(min, max, isInt) {
  if (isInt) return Math.floor(Math.random() * (max - min) + min);else return Math.random() * (max - min) + min;
}

// button statuses

var BTN_DEFAULT = "primary";
var BTN_CORRECT = "success";
var BTN_WRONG = "danger";

/*********************************************************************/
/*********************************************************************/

var Choices = function (_React$Component) {
  _inherits(Choices, _React$Component);

  function Choices() {
    _classCallCheck(this, Choices);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Choices.prototype.render = function render() {
    var _this2 = this;

    // console.log("Choices.render");
    // console.log(this.props.btnStatus.isEnabled);

    var myCode = "";

    return React.createElement(
      "div",
      { className: "center" },
      React.createElement(
        ButtonGroup,
        { bsSize: "large" },
        this.props.choices.map(function (choice, i) {
          return React.createElement(
            Button,
            { bsSize: "large", bsStyle: _this2.props.btnStatus.code[i], key: i,
              onClick: _this2.onGuess.bind(_this2, i), disabled: !_this2.props.btnStatus.isEnabled[i] },
            choice,
            " ",
            UNITS[_this2.props.currentMeasurement][_this2.props.isImpToMet ? "metric" : "imperial"].abbreviation
          );
        })
      )
    );
  };

  Choices.prototype.onGuess = function onGuess(guessIndex) {
    console.log("Choices.onGuess");
    this.props.passGuess(guessIndex);
  };

  return Choices;
}(React.Component);

/*********************************************************************/
/*********************************************************************/

var Message = function (_React$Component2) {
  _inherits(Message, _React$Component2);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Message.prototype.render = function render() {
    return React.createElement(
      "h4",
      { className: "center" },
      this.props.message
    );
  };

  return Message;
}(React.Component);

/*********************************************************************/
/*********************************************************************/

var Question = function (_React$Component3) {
  _inherits(Question, _React$Component3);

  function Question() {
    _classCallCheck(this, Question);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Question.prototype.render = function render() {
    // console.log("Question.render");
    // console.log(this.props);

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h2",
        { className: "center" },
        "Convert ",
        UNITS[this.props.currentMeasurement][!this.props.isImpToMet ? "metric" : "imperial"].units,
        " to ",
        UNITS[this.props.currentMeasurement][this.props.isImpToMet ? "metric" : "imperial"].units
      ),
      React.createElement(
        "h3",
        { className: "center" },
        "How many ",
        UNITS[this.props.currentMeasurement][this.props.isImpToMet ? "metric" : "imperial"].units,
        " is ",
        this.props.answer.questionNum,
        " ",
        UNITS[this.props.currentMeasurement][!this.props.isImpToMet ? "metric" : "imperial"].abbreviation
      ),
      React.createElement(Choices, { choices: this.props.choices,
        currentMeasurement: this.props.currentMeasurement,
        isImpToMet: this.props.isImpToMet,
        answer: this.props.answer,
        btnStatus: this.props.btnStatus,
        passGuess: this.passGuess.bind(this)
      })
    );
  };

  Question.prototype.passGuess = function passGuess(guessIndex) {
    console.log("Question.passGuess");
    this.props.handleGuess(guessIndex);
  };

  return Question;
}(React.Component);

/*********************************************************************/
/*********************************************************************/

var Controls = function (_React$Component4) {
  _inherits(Controls, _React$Component4);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Controls.prototype.render = function render() {
    var scoreString = this.props.score.correct + "/" + this.props.score.attempted + " correct";
    if (this.props.score.attempted > 0) scoreString += " " + Math.round(100 * this.props.score.correct / this.props.score.attempted) + "%";
    console.log("Controls.render");
    console.log(this.props);
    return React.createElement(
      Grid,
      null,
      React.createElement(
        Row,
        { className: "show-grid" },
        React.createElement(
          Col,
          { className: "find-cell right", md: 2 },
          React.createElement(
            Button,
            { bsStyle: BTN_DEFAULT, onClick: this.onNextQ.bind(this) },
            "Next Question"
          )
        ),
        React.createElement(
          Col,
          { className: "find-cell", md: 6 },
          React.createElement(Message, { message: this.props.message })
        ),
        React.createElement(
          Col,
          { className: "find-cell center", md: 2 },
          scoreString
        ),
        React.createElement(
          Col,
          { className: "find-cell left", md: 2 },
          React.createElement(
            Button,
            { bsStyle: BTN_CORRECT, onClick: this.onNewGame.bind(this) },
            "New Quiz"
          )
        )
      )
    );
  };

  Controls.prototype.onNextQ = function onNextQ() {
    this.props.handleNextQ();
  };

  Controls.prototype.onNewGame = function onNewGame() {
    // this.props.handleNextQ();
  };

  return Controls;
}(React.Component); // Controls

/*********************************************************************/
/*********************************************************************/

var Game = function (_React$Component5) {
  _inherits(Game, _React$Component5);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this6 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    _this6.state = {
      score: { correct: 0, attempted: 0 },
      difficulty: 99,
      currentMeasurement: "weight1",
      isImpToMet: true,
      choices: [],
      answer: { answerNum: 0, questionNum: 0, location: 0 },
      btnStatus: {
        code: Array(NUM_ANSWERS).fill(BTN_DEFAULT),
        isEnabled: Array(NUM_ANSWERS).fill("true")
      },
      message: MESSAGES.random("start")
    };
    return _this6;
  }

  Game.prototype.componentWillMount = function componentWillMount() {
    this.generateQ();
  };
  /*********************************************************************/

  Game.prototype.handleNextQ = function handleNextQ() {
    console.log("Game.handleNextQ");
    // console.log(UNITS[this.state.currentMeasurement]);
    var newMessage = MESSAGES.random("start");
    var newBtnStatus = { code: Array(NUM_ANSWERS).fill(BTN_DEFAULT), isEnabled: Array(NUM_ANSWERS).fill(true) };
    this.setState({ message: newMessage, btnStatus: newBtnStatus });
    this.generateQ();
  };

  /*********************************************************************/

  Game.prototype.handleGuess = function handleGuess(guessIndex) {
    console.log("Game.handleGuess");
    // console.log(UNITS[this.state.currentMeasurement]);

    var newMessage;
    var newScore = this.state.score;
    var newBtnStatus = { code: Array(NUM_ANSWERS).fill("default"), isEnabled: Array(NUM_ANSWERS).fill(false) };

    if (guessIndex == this.state.answer.location) {
      newMessage = MESSAGES.random("success");
      newScore.correct++;
    } else {
      newMessage = MESSAGES.random("failure") + " The correct answer was " + this.state.answer.answerNum + " " + UNITS[this.state.currentMeasurement][this.state.isImpToMet ? "metric" : "imperial"].abbreviation;
    }
    newScore.attempted++;
    newBtnStatus.code[guessIndex] = BTN_WRONG;
    newBtnStatus.code[this.state.answer.location] = BTN_CORRECT;
    newBtnStatus.isEnabled[this.state.answer.location] = true;
    this.setState({ message: newMessage, btnStatus: newBtnStatus, score: newScore });
  };

  /*********************************************************************/

  Game.prototype.generateQ = function generateQ() {

    // console.log("Game.generateQ");

    var curMin = UNITS[this.state.currentMeasurement][this.state.isImpToMet ? "imperial" : "metric"].rangeMin;
    var curMax = UNITS[this.state.currentMeasurement][this.state.isImpToMet ? "imperial" : "metric"].rangeMax;
    var rawNum = getRandom(curMin, curMax);
    var answerNum = UNITS[this.state.currentMeasurement][this.state.isImpToMet ? "imperial" : "metric"].convert(rawNum);
    var choices = [];
    var answerLoc = Math.floor(getRandom(0, NUM_ANSWERS));

    for (var i = 0; i < NUM_ANSWERS; i++) {
      choices[i] = this.prettyNum(answerNum * (1 - this.state.difficulty / (NUM_ANSWERS - 1) * (answerLoc - i) / 100));
    }

    rawNum = this.prettyNum(rawNum);
    answerNum = this.prettyNum(answerNum);
    this.setState({ choices: choices, answer: { location: answerLoc, answerNum: answerNum, questionNum: rawNum } });
  };

  /*********************************************************************/

  Game.prototype.prettyNum = function prettyNum(num) {
    var mult = Math.pow(10, NUM_SIG_DIGITS - Math.floor(Math.log10(num)) - 1);
    return Math.round(num * mult) / mult;
  };

  /*********************************************************************/

  Game.prototype.render = function render() {
    // console.log("Game");
    // console.log(this.state);
    return React.createElement(
      "div",
      null,
      React.createElement(Question, {
        choices: this.state.choices,
        answer: this.state.answer,
        currentMeasurement: this.state.currentMeasurement,
        isImpToMet: this.state.isImpToMet,
        btnStatus: this.state.btnStatus,
        handleGuess: this.handleGuess.bind(this)
      }),
      React.createElement(Controls, { handleNextQ: this.handleNextQ.bind(this), score: this.state.score, message: this.state.message })
    );
  };

  return Game;
}(React.Component); // Game

/*********************************************************************/
/*********************************************************************/

var Header = function (_React$Component6) {
  _inherits(Header, _React$Component6);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement("h4", { className: "center" })
    );
  };

  return Header;
}(React.Component); // Header
/*********************************************************************/
/*********************************************************************/

var Footer = function (_React$Component7) {
  _inherits(Footer, _React$Component7);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
  }

  Footer.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement("h4", { className: "center" })
    );
  };

  return Footer;
}(React.Component); // Footer

/*********************************************************************/
/*********************************************************************/

var App = function (_React$Component8) {
  _inherits(App, _React$Component8);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Header, null),
      React.createElement(Game, null),
      React.createElement(Footer, null)
    );
  }; // render

  return App;
}(React.Component); // App

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
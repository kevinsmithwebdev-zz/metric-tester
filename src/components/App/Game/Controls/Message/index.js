import React, { Component } from 'react';


class Message extends Component {

  render() {
    return (
      <h4 className="center">{this.props.message}</h4>
    )
  }

}

export default Message;

import React, { Component } from 'react'
import 'react-bootstrap'
// eslint-disable-next-line
import { Button, Modal, ToggleButtonGroup, ToggleButton, Grid, Row, Col } from 'react-bootstrap'
// eslint-disable-next-line
import { UNITS } from 'common/constants'

import './styles.css'


class NewQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMeasurement: this.props.currentMeasurement,
      isImpToMet: this.props.isImpToMet,
      difficulty: this.props.difficulty
    }
  }

  renderUnitButton(unit, index) {
    return (
      <ToggleButton key={index} value={index} onChange={this.handleUnitsChange.bind(this)}>{(this.state.isImpToMet)?unit.imperial.units:unit.metric.units} to {(this.state.isImpToMet)?unit.metric.units:unit.imperial.units}</ToggleButton>
    )
  }

  render() {

    return (
      <div>
        <Modal show={this.props.isNewQuiz}>
          <Modal.Header>
            <Modal.Title>Setup New Quiz</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid btn-groups">
              <ToggleButtonGroup vertical className="btn-group" type="radio" name="currentMeasurement" defaultValue={this.props.currentMeasurement}>
                { UNITS.map((unit, index) => this.renderUnitButton(unit, index)) }
              </ToggleButtonGroup>

              <ToggleButtonGroup vertical className="btn-group" type="radio" name="isImpToMet" defaultValue={String(this.props.isImpToMet)}>
                <ToggleButton key="0" value="true" onChange={this.handleIsImpToMetChange.bind(this)}>Imperial to Metric</ToggleButton>
                <ToggleButton key="1" value="false" onChange={this.handleIsImpToMetChange.bind(this)}>Metric to Imperial</ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup vertical className="btn-group" type="radio" name="difficulty" defaultValue={String(this.props.difficulty)}>
                <ToggleButton key="0" value="0" onChange={this.handleDifficultyChange.bind(this)}>Easy</ToggleButton>
                <ToggleButton key="1" value="1" onChange={this.handleDifficultyChange.bind(this)}>Medium</ToggleButton>
                <ToggleButton key="2" value="2" onChange={this.handleDifficultyChange.bind(this)}>Hard</ToggleButton>
                <ToggleButton key="3" value="3" onChange={this.handleDifficultyChange.bind(this)}>Lethal</ToggleButton>
              </ToggleButtonGroup>

            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="success" onClick={this.onSave.bind(this, this.unit)}>Save</Button>
            <Button bsStyle="danger" onClick={this.onCancel.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
















  //
  //
  // <Grid>
  //   <Row className="show-grid">
  //     <Col lg={6}>
  //       <ToggleButtonGroup vertical type="radio" name="currentMeasurement" defaultValue={this.props.currentMeasurement}>
  //         { UNITS.map((unit, index) => this.renderUnitButton(unit, index)) }
  //       </ToggleButtonGroup>
  //     </Col>
  //     <Col lg={6}>
  //       <ToggleButtonGroup vertical type="radio" name="isImpToMet" defaultValue={String(this.props.isImpToMet)}>
  //         <ToggleButton key="0" value="true" onChange={this.handleIsImpToMetChange.bind(this)}>Imperial to Metric</ToggleButton>
  //         <ToggleButton key="1" value="false" onChange={this.handleIsImpToMetChange.bind(this)}>Metric to Imperial</ToggleButton>
  //       </ToggleButtonGroup>
  //
  //       <ToggleButtonGroup vertical type="radio" name="difficulty" defaultValue={String(this.props.difficulty)}>
  //         <ToggleButton key="1" value="1" onChange={this.handleDifficultyChange.bind(this)}>Easy</ToggleButton>
  //         <ToggleButton key="2" value="2" onChange={this.handleDifficultyChange.bind(this)}>Medium</ToggleButton>
  //         <ToggleButton key="3" value="3" onChange={this.handleDifficultyChange.bind(this)}>Hard</ToggleButton>
  //         <ToggleButton key="4" value="4" onChange={this.handleDifficultyChange.bind(this)}>Lethal</ToggleButton>
  //       </ToggleButtonGroup>
  //     </Col>
  //   </Row>
  // </Grid>















  handleIsImpToMetChange(changeEvent) {
    this.setState({
      isImpToMet: (changeEvent.target.value === 'true')
    })
  }
  handleUnitsChange(changeEvent) {
    this.setState({
      currentMeasurement: Number(changeEvent.target.value)
    })
  }
  handleDifficultyChange(changeEvent) {
    this.setState({
      difficulty: Number(changeEvent.target.value)
    })
  }

//*************

  onSave(unit) {
    this.props.handleSave(this.state)
  }

  onCancel() {
    this.props.handleCancel()
  }

}

export default NewQuiz

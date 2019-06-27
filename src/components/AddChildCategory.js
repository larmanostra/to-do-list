import React, { Component } from 'react'
import ChildTextInput from './ChildTextInput'

export default class AddChildCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addChild: true,
    }
  }


  handleSave = text => {
    if (text.length !== 0) {
      const { actions, id} = this.props
      const childId = actions.createNode(text).nodeId
      actions.addChild(id, childId);
      this.setState({
        addChild: false,
      })
      this.props.handleStateChild();
    }
    this.props.handleStateChild();
    this.setState({
      addChild: false,
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.addChild &&
          <ChildTextInput
            onSave={(text) => this.handleSave(text)}
            placeholder="Name new category?" />
        }
      </React.Fragment>
    )
  }
}
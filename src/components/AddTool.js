import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CategoryTextInput from './CategoryTextInput'

export default class AddTool extends Component {

    static propTypes = {
        category: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
      }

  handleSave = text => {
    if (text.length !== 0) {
        const { actions } = this.props
        actions.createNode(text,true);
        // actions.addCategory(text, childId)
    }
  }

  render() {
    return (
      <CategoryTextInput 
        newTodo
        onSave={this.handleSave}
        placeholder="Enter category tittle" 
      />
    );
  }
}

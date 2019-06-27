import React, { Component } from 'react'
import TodoTextInput from './TodoTextInput'
import styled from 'styled-components'

const Inpute = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
margin: 10px;
`;

export default class AddTodo extends Component {


  handleSave = text => {
    const { actions, idCategory } = this.props
    if (text.length !== 0) {
      actions.addTodo(idCategory,text, false, 'Description');
      // actions.noCompleteCategory(idCategory);
    }

  }

  render() {
    return (
      <Inpute>
        <TodoTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="What needs to be done?" />
      </Inpute>
    )
  }
}
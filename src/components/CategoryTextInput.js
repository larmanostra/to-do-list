import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from 'styled-components';

const Input = styled.input`
margin: 10px auto;
    height: 30px;
    font-size: 19px;
    width: 85%;
    border: 1px solid #b1aeae8f;
`;

export default class CategoryTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || '',
    onInput: true,
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.onInput &&
            <Input className={
                classnames({
                  edit: this.props.editing,
                  'new-todo': this.props.newTodo
                })}
                type="text"
                placeholder={this.props.placeholder}
                autoFocus="true"
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit} />
        }
        </React.Fragment>
    )
  }
}

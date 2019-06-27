import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'



export default class ChildTextInput extends Component {
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
        this.setState({ text: '',
        onInput: !this.state.onInput,
      })
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    if (true) {
      this.props.onSave('');
    }
    // this.setState({ text: '',
    //     onInput: !this.state.onInput,
    //   })
  }


  render() {
    return (
        <React.Fragment>
        {this.state.onInput &&
            
            <input className={
                classnames({
                  edit: this.props.editing,
                  'new-todo': this.props.newTodo
                })}
                type="text"
                placeholder={this.props.placeholder}
                autoFocus="true"
                value={this.state.text}
                onBlur={this.handleBlur}
                onSubmit={this.handAdd}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
                />
        }
        </React.Fragment>
    )
  }
}
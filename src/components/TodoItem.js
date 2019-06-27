import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import Edit from 'react-icons/lib/fa/edit'

const Todo = styled.div`
  height: 60px;
  border: 1px solid #ededed;
  width: 97%;
`;

const Element = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
    height: 60px;
    padding: 0 15px;

    > div {
      display: flex;
      align-items: center;
      >p{
        margin 0 10px;

      }
      >span{
        cursor: pointer;
      }
      > input{
        cursor: pointer;
      }
    }
`;

const styleLink = {
  textDecoration: 'none',
  color: 'black',
}


export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
    this.handleEditTodo = this.handleEditTodo.bind(this);
  }

  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

//   componentWillMount(){

//   }

  handleEditTodo(id) {
    this.props.editTodoComponent(id);
    this.props.editTodoCategory();
    this.props.handleAddTodoText(this.props.todo.text);
  }

  handleSave = (id, text) => {
    const { idCategory } = this.props
    if (text.length === 0) {
      this.props.deleteTodo(idCategory, id)
    } else {
      this.props.editTodo(idCategory, id, text)
    }
    this.setState({ editing: false })
  }


  render() {
    const { todo, category, completeTodo, idCategory } = this.props;

    let element
      element = (
        
        <Element>
          <div>
            <input className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => completeTodo(idCategory, todo.id)}/>
            <p>
            {todo.text.length>=45? todo.text.slice(1,45)+'...' : todo.text}
            </p>
          </div>
          <div>
          <Link to={`/${category.present[idCategory].text}/${todo.text}`} style={styleLink}>
            <span onClick={() => this.handleEditTodo(todo.id)}> <Edit /> </span>
          </Link>
          </div>
        </Element>
        
      )

    return (
      <Todo className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </Todo>
    )
  }
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'
import EditTodo from './EditTodo'
import AddTodo from './AddTodo'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import styled from 'styled-components'
import SearchInput, { createFilter } from 'react-search-input'

const MainSections = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SectionTodos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: auto;
  height: 390px;
`;

const styleSearch = {
  position: 'absolute',
  top: '-95px',
  right: '20px',
  border: 'none',
  fontSize: '20px',
  paddingLeft: '1%',
  height: '35px',
  background: 'rgba(255,255,255,0.95)',
  boxShadow: 'inset 0 -2px 1px rgba(0,0,0,0.36)',
}


const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

const KEYS_TO_FILTERS = ['text']

export default class TodoSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: SHOW_ALL,
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  static propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderFooter(completedCount) {
    const { category, idCategory, actions } = this.props
    const { filter } = this.state
    const activeCount = category.present[idCategory].todos.length - completedCount


    if (category.present[idCategory].todos.length) {
      return (
        <TodoFooter completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
          actions={actions}
          idCategory={idCategory} />
      )
    }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  render() {
    const { category, actions, idCategory, editTodoCategory } = this.props
    const { filter } = this.state
    if (!category.present[idCategory]) {
      return null
    }

    const filteredEmails = category.present[idCategory].todos.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    const filteredTodos = category.present[idCategory].todos.filter(TODO_FILTERS[filter])
    const completedCount = category.present[idCategory].todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
    return (
      <div>
        {!this.props.renderEditTodo &&

          <MainSections>
            <AddTodo category={category} actions={actions} idCategory={this.props.idCategory} />
            <SearchInput className="search-input" style={styleSearch} onChange={this.searchUpdated} />
            <SectionTodos>
              {this.state.searchTerm ?
                filteredEmails.map(todo =>
                  <TodoItem key={todo.id} todo={todo} category={category} actions={actions} {...actions} idCategory={idCategory} editTodoComponent={this.props.editTodoComponent} editTodoCategory={editTodoCategory} handleAddTodoText={this.props.handleAddTodoText} />
                ) :
                filteredTodos.map(todo =>
                  <TodoItem key={todo.id} todo={todo} category={category} actions={actions} {...actions} idCategory={idCategory} editTodoComponent={this.props.editTodoComponent} editTodoCategory={editTodoCategory} handleAddTodoText={this.props.handleAddTodoText} />
                )
              }
            </SectionTodos>
            {this.renderFooter(completedCount)}
          </MainSections>
        }
        {this.props.renderEditTodo &&
          <EditTodo id={this.props.editTodoId} category={category} idCategory={idCategory}  {...actions} editTodoComponent={this.props.editTodoComponent} completed={category.present[idCategory].todos[this.props.editTodoId].completed} editTodoCategory={editTodoCategory} />
        }
      </div>
    )
  }
}
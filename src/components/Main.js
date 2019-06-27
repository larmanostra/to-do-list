import * as React from 'react'
import AddTool from './AddTool'

import CategorySection from './CategorySection'
import TodoSection from './TodoSection'
import Header from './Header'
import ProgressBar from './ProgressBar'
import styled from 'styled-components'
import UndoRedo from '../containers/UndoRedo'
import { BrowserRouter as Router } from 'react-router-dom';

const Content = styled.div`
  width: 1200px;
  height: 600px;
  margin: 10px auto;
  box-shadow: 2px -1px 12px 1px rgba(0,0,0,0.36);
`;

const MainSections = styled.div`
  display: flex;
  width: 100%;
  height: 450px;
`;

const Category = styled.div`
  margin-left: 3%;
  margin-right: 1%;
  width: 20%;
`;

const Todos = styled.div`
margin-left: 3%;
margin-right: 3%;
width: 70%;
`;

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCategory: undefined,
      renderEditTodo: false,
      editTodoId: undefined,
      editTodoText: '',
      buttonEditTodo: false,
    }
    this.editIdTodo = this.editIdTodo.bind(this);
    this.editTodoCategory = this.editTodoCategory.bind(this);
    this.editTodoComponent = this.editTodoComponent.bind(this);
    this.handleAddTodoText = this.handleAddTodoText.bind(this);
  }

  handleAddTodoText(text) {
    this.setState({
      editTodoText: text
    });
  }

  editIdTodo(id) {
    this.setState({
      idCategory: id,
    });
  }

  editTodoComponent = (id) => {
    this.setState({
      renderEditTodo: !this.state.renderEditTodo,
      editTodoId: id,
    });
  }

  editTodoCategory() {
    this.setState({
      buttonEditTodo: !this.state.buttonEditTodo,
    });
  }


  render() {
    const { category, actions } = this.props
    return (
      <Router>
      <Content>
          <Header />
          <UndoRedo />
          <ProgressBar category={category} />
          <MainSections>
            <Category>
              <AddTool category={category} actions={actions} />
              <CategorySection category={category} actions={actions} editIdTodo={this.editIdTodo} buttonEditTodo={this.state.buttonEditTodo} editTodoCategory={this.editTodoCategory} editTodoComponent={this.editTodoComponent} renderEditTodo={this.state.renderEditTodo} editTodoText={this.state.editTodoText} editTodoId={this.state.editTodoId} idCategory={this.state.idCategory} />
            </Category>
            <Todos>
              <TodoSection category={category} actions={actions} idCategory={this.state.idCategory} handleAddTodoText={this.handleAddTodoText} editTodoCategory={this.editTodoCategory} editTodoComponent={this.editTodoComponent} renderEditTodo={this.state.renderEditTodo} editTodoId={this.state.editTodoId} />
            </Todos>
          </MainSections>
      </Content>
      </Router>
    )
  }
}
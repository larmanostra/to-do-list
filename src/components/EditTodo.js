import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

import styled from 'styled-components'


const MainSections = styled.div `
display: flex;
width: 97%;
flex-direction: column;
justify-content:  center;
align-items: flex-start;
margin-left: 15px;

> textarea {
    width: 100%;
    height: 230px;
}

*{
    margin-top: 20px;
}

`;

const ButtonSection = styled.div`
display: flex;
width: 100%;
justify-content:  flex-end;
align-items: center;

> button {
    margin: 10px;
}
`;


export default class EditTodo extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            completed: this.props.completed,
            description: this.props.category.present[this.props.idCategory].todos[this.props.id].description,
        }
      }

    static propTypes = {
        editTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired
      }

    handleSave = (id, text) => {
        this.setState(prevState => ({
            text: text,
          }));      
    }

    saveEdit = (idTodo) =>{
        const { idCategory} = this.props
        this.props.editTodo(idCategory,idTodo, this.state.text, this.state.completed, this.state.description)
        this.props.editTodoComponent(idTodo);
        this.props.editTodoCategory();
    }

    handleCancel = (idTodo) => {
        this.props.editTodoComponent(idTodo);
        this.props.editTodoCategory();
    }

    handleChange = () =>{
        this.setState(prevState => ({
            completed: !this.state.completed
          })); 
    }

    handleDescription = event =>{
        this.setState({ description: event.target.value })
    }

 
    render() {
        const { id, category, idCategory} = this.props
        return (
            <MainSections>
                <ButtonSection>
                    <button onClick={() => this.saveEdit(id)}> Save </button>
                    <button onClick={() => this.handleCancel(id)}> Cancel </button>
                </ButtonSection>
                <TodoTextInput text={category.present[idCategory].todos[id].text} editing={this.state.editing} onSave={(text) => this.handleSave(id, text)} />
                <span><input className="toggle"
                     type="checkbox"
                     checked={this.state.completed}
                     onChange={this.handleChange} /> Done</span>
                <textarea value={this.state.description} onChange={this.handleDescription} />
            </MainSections>
        )
      }
    }
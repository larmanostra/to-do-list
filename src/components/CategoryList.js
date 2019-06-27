import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import AddChildCategory from './AddChildCategory'
import ChildTextInput from './ChildTextInput'
import styled, { css } from 'styled-components'
import Modal from 'react-modal';

import AddChild from 'react-icons/lib/fa/plus-square-o'
import DeleteCategory from 'react-icons/lib/md/delete'
import Edit from 'react-icons/lib/fa/edit'
import OpenChilds from 'react-icons/lib/fa/angle-right'
import CloseChilds from 'react-icons/lib/fa/angle-down'
import ChangeCategory from 'react-icons/lib/md/undo'
import { Link } from 'react-router-dom';

const Category = styled.div `
display: flex;
align-items: center;
justify-content: space-between;
height: 30px;
border: 1px solid black;
min-width: 205px;

> p {
  margin 0 3px;
}

> div {
  display: flex;
  align-items: center;
  > p {
    margin 0 3px;
  }
}

`;

const styleLink = {
  fontSize: '20px',
  textDecoration: 'none',
  color: 'black',
}

const styleModal = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    width: '300px',
    height: '100px',
    margin: '200px auto',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(255, 255, 255)',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  }
}

const Buttons = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;

> p {
  margin 0 3px;
  $hover: {
    width: 120%;
    height: 120%;
  }
}

${props => props.primary && css`
display: flex;
align-items: center;
justify-content: space-around;

> button {
  cursor: pointer;
}
  `}
`;


const Element = styled.li`
  list-style-type: none;
`;

const ListChild = styled.ul`
  margin: 0;
`;



export class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addChild: false,
      editing: false,
      renderChild: true,
      modalIsOpen: false,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleStateChild = this.handleStateChild.bind(this);
  }

  handleStateChild(){
    this.setState({
      addChild: false,
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  handleAddChildClick = e => {
    e.preventDefault();
    this.setState({
      addChild: true,
    });
  }

  handleDoubleClick = e =>{
    e.preventDefault()
    this.setState({
      editing: true,
    });
  }

  handleRemoveClick = e => {
    e.preventDefault()
    const { removeChild, deleteNode, parentId, id } = this.props;
    removeChild(parentId, id);
    deleteNode(id);
    this.setState({ modalIsOpen: false });
  }

  renderChild = childId => {
    const { id, category, actions, editIdTodo, editTodoText, buttonEditTodo, renderEditTodo, editTodoComponent, editTodoCategory } = this.props
    return (
      <Element key={childId}>
        {this.state.renderChild &&
          <ConnectedNode id={childId} category={category} parentId={id} editTodoText={editTodoText} actions={actions} editIdTodo={editIdTodo} buttonEditTodo={buttonEditTodo} editTodoComponent={editTodoComponent} editTodoCategory={editTodoCategory} renderEditTodo={renderEditTodo} editTodoId={this.props.editTodoId} idCategory={this.props.idCategory} />
        }
      </Element>
    )
  }

  handleRenderChild = () => {
    this.setState({
      renderChild: !this.state.renderChild 
    });
  }

  handleSave = (id, text) => {
    if(text.length !==0){
      this.props.editNode(id, text)
      this.setState({
        editing: false 
      });
    }
    this.setState({
      editing: false 
    });
  }

  handleOpenTodos = () => {
    if (this.props.renderEditTodo) {
      this.props.editTodoComponent()
      this.props.editTodoCategory();
    }
    this.props.editIdTodo(this.props.id);


  }

  handleEditCategory = () => {
    const { actions } = this.props
    if (this.props.editTodoText.length !== 0) {
      actions.addTodo(this.props.id, this.props.editTodoText, this.props.category.present[this.props.idCategory].todos[this.props.editTodoId].completed,this.props.category.present[this.props.idCategory].todos[this.props.editTodoId].description)
      actions.deleteTodo(this.props.idCategory, this.props.editTodoId)
    }
  }


  render() {
    const { text, childIds, id, actions, buttonEditTodo } = this.props
    console.log(childIds);
    let element
    if (this.state.editing) {
      element = (
          <ChildTextInput text={text}
            editing={this.state.editing}
            onSave={(text) => this.handleSave(id, text)} />
      )
    } else {
      element = (
        <React.Fragment>
          <Link to={`/${text}`} style={styleLink}>
          <Category onClick={this.handleOpenTodos}>
          <div>
            {childIds.length > 0 &&
              <p onClick={this.handleRenderChild}>
                {this.state.renderChild &&
                  <CloseChilds />
                }
                {!this.state.renderChild &&
                  <OpenChilds />
                }
              </p>
            }
            <p>{text.length>=13? text.slice(1,13)+'...' : text}</p>
            <p onClick={this.handleDoubleClick} > <Edit /> </p>
            </div>
            {!buttonEditTodo &&
              <Buttons>
                <p onClick={this.openModal} > <DeleteCategory /> </p>
                <p onClick={this.handleAddChildClick}> <AddChild /> </p>
              </Buttons>
            }
            {buttonEditTodo &&
              <Buttons>
                <p onClick={this.handleEditCategory}> <ChangeCategory /> </p>
              </Buttons>
            }
          </Category>
          </Link>
          <Modal
            style={styleModal}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
            contentLabel="Example Modal">
            <p>Are you sure you want to delete the category and everything associated with it?</p>
            <Buttons primary>
            <button onClick={this.handleRemoveClick}>Yes</button>
            <button onClick={this.closeModal}>Cancle</button>
            </Buttons>
          </Modal>
          <ListChild>
            {this.state.addChild &&
              <AddChildCategory category={this.props.category} actions={actions} id={id} handleStateChild={this.handleStateChild} />
            }
            {(childIds) && childIds.map(this.renderChild)}
          </ListChild>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        {element}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state.category.present[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(CategoryList)
export default ConnectedNode
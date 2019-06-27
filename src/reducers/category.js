import {
  ADD_CATEGORY, ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE,
  EDIT_NODE, ADD_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_CATEGORY, DELETE_TODO, NO_COMPLETE_CATEGORY
} from '../actions'

import undoable from 'redux-undo'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state,
      action.childId]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}


const todos = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: action.completed,
          text: action.text,
          description: action.description,
        }
      ]

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          {
            ...todo,
            text: action.text,
            completed: action.completed,
            description: action.description
          } :
          todo
      )
      case DELETE_TODO:
          return state.filter(todo =>
             todo.id !== action.id
           )
    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    default:
      return state
  }
}


const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        text: action.text,
        completed: true,
        childIds: [],
        todos: [],
        main: action.main,
      
      }
    case ADD_CATEGORY:
      return {
        ...state,
        main: true,
      }
    case COMPLETE_CATEGORY:
      return {
        ...state,
        completed: !state.completed,
      }
    case NO_COMPLETE_CATEGORY:
      return {
        ...state,
        completed: false,
    }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    case EDIT_NODE:
      return {
        ...state,
        text: action.text,
      }
    case ADD_TODO:
      return {
        ...state,
        todos: todos(state.todos, action),
      }
    case DELETE_TODO:
    case EDIT_TODO:
      return {
        ...state,
        todos: todos(state.todos, action),
      }

    case COMPLETE_TODO:
      return {
        ...state,
        todos: todos(state.todos, action),
      }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [...acc, childId, ...getAllDescendantIds(state, childId)]
  ), [])
)

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

const category = (state = {}, action) => {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [nodeId, ...descendantIds])
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}

const undoableTodos = undoable(category)

export default undoableTodos

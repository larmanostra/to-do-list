export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const EDIT_NODE = 'EDIT_NODE'
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const COMPLETE_ALL = 'COMPLETE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const COMPLETE_CATEGORY = 'COMPLETE_CATEGORY'
export const NO_COMPLETE_CATEGORY = 'NO_COMPLETE_CATEGORY'

let nextId = 0

export const createNode = (text, main) => ({
  type: CREATE_NODE,
  text: text,
  nodeId: `new_${nextId++}`,
  main
})

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
})

export const addCategory = (text, nodeId) => (
  {
    type: ADD_CATEGORY,
    text: text,
    nodeId: nodeId,
    main: true,
  }
)

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId,
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
})

export const editNode = (nodeId, text) => ({
  type: EDIT_NODE,
  nodeId,
  text
})

export const completeCategory = (nodeId) => ({
  type: COMPLETE_CATEGORY,
  nodeId,
})

export const noCompleteCategory = (nodeId) => ({
  type: NO_COMPLETE_CATEGORY,
  nodeId,
})

export const addTodo = (nodeId, text, completed, description) => ({ type: ADD_TODO, nodeId, text, completed, description })
export const deleteTodo = (nodeId, id) => ({ type: DELETE_TODO, nodeId, id })
export const editTodo = (nodeId, id, text, completed, description) => ({ type: EDIT_TODO, nodeId, id, text, completed,  description })
export const completeTodo = (nodeId, id) => ({ type: COMPLETE_TODO, nodeId, id })



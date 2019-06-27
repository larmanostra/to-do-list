import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

import styled from 'styled-components'

const MainSections = styled.div`
width: 120px;
margin: 5px auto;
display: flex;
align-items: center;
justify-content: space-between;
`;

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <MainSections>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </MainSections>
)

const mapStateToProps = (state) => ({
  canUndo: state.category.past.length > 0,
  canRedo: state.category.future.length > 0
})

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);
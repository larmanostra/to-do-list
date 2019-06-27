import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Main from '../components/Main'
import * as actions from '../actions'

const Node = ({category, actions}) => (
      <Main category={category} actions={actions} />
)

Node.propTypes = {
  category: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  category: state.category,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)
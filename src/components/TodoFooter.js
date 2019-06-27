import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import styled from 'styled-components'

const Tool = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
color: #969595;
`;

const Element = styled.span`
margin: 10px;
&:hover{
    color: black;
}
&:visited{
  color: black;
}
`;

const A = styled.a`
  color: black;
`;

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

export default class TodoFooter extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onShow: PropTypes.func.isRequired
  }

  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, onShow } = this.props

    return (
      <React.Fragment>
        {(classnames({ selected: filter === selectedFilter })) ?
          <A className={classnames({ selected: filter === selectedFilter })}
          style={{ cursor: 'pointer' }}
          onClick={() => onShow(filter)}>
         {title}
       </A> :
       <a className={classnames({ selected: filter === selectedFilter })}
       style={{ cursor: 'pointer' }}
       onClick={() => onShow(filter)}>
       {title}
       </a>}
      </React.Fragment>
    )
  }

  render() {
    return (
      <Tool>
        {this.renderTodoCount()}
          {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
            <Element key={filter}>
              {this.renderFilterLink(filter)}
            </Element>
          )}
      </Tool>
    )
  }
}
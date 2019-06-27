import React, { Component } from 'react'
import styled from 'styled-components'

const MainSections = styled.div `
width: 1100px;
margin: 5px auto;
border: 2px solid #00000052;
height: 4px;
border-radius: 30px;
display:flex;
`;

const Progress = styled.div`
    height: 5px;
    background: #7b7b7b82;
`;


export default class ProgressBar extends Component {
    
    render() {
    const { category } = this.props
      console.log(category);
    if(!category.present){
      return null
    }

    let key;
    let mass = [];
    for(key in category.present){
      mass.push(key);
            let completedCount = this.props.category.present[key].todos.reduce((count, tod) =>
            tod.completed ? count + 1 : count,
            0
            );
            const activeCount = category.present[key].todos.length - completedCount;
      if (activeCount === 0 && !category.present[key].completed) {
        category.present[key].completed = !category.present[key].completed;
      }
      if (activeCount !== 0 && category.present[key].completed) {
        category.present[key].completed = !category.present[key].completed;
      }
    }

      const widthBlock = 100 / mass.length;
      return (
        <MainSections>
          { mass.map(key => category.present[key].completed && <Progress key={key} style={{ width: `${widthBlock}%` }} />) }
        </MainSections>
      )
    }
  }
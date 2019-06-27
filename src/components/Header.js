import React, { Component } from 'react'
import styled from 'styled-components'

const MainSections = styled.div `
  width: 100%;
  height: 70px;
`;

const Header = styled.div `
    width: 1100px;
    height: 70px;
    display flex;
    align-items: center;
    justify-content: flex-start;
    margin 0 auto;
`;

const Logo = styled.p`
  font-size: 35px;
  margin: 0;
`;


export default class Haeder extends Component {
    
    render() {
      return (
        <MainSections>
            <Header>
                <Logo> To-DO List </Logo>  
            </Header>
       </MainSections>    
      )
    }
  }
import React from 'react';
import styled from 'styled-components';

import Icon from './Icon'
import Form from './Form'
import Links from './Links'
import MobileNavigation from '../MobileNavigation'


const Container = styled.nav`
  height:71px;
  border-bottom: 1px solid rgb(229, 232, 235);
  box-shadow: rgb(14 14 14 / 25%) 0px 0px 8px 0px;
  position:fixed;
  top:0;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  z-index:10000;
  background: #fff;
`

const Navigation =()=>{
  return(
    <>
    <Container>
      <Icon/>
      <Form/>
      <Links/>
    </Container>
    <MobileNavigation/>
    </>
  )
}

export default Navigation

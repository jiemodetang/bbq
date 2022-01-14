import React from 'react'
import styled from 'styled-components';
import {connect} from 'react-redux';

import MobileLinks from './MobileLinks'
import SecondView from './SecondView'

const Container = styled.div`
  background-color:rgb(32, 129, 226);
  height:${({state})=> state ? '100%':'0'};
  position:relative;
  transition:all 0.35s;
  overflow:hidden;
  width:100vw;
  top:72px;
  position:fixed;
  z-index:10000
`



const MobileNavigation =({show})=>{
  return(
    <Container state={show}>
      <MobileLinks/>
      <SecondView/>
    </Container>
  )
}

const mapToState =(state)=>{
  return{
      show:state.mobileNavReducer.show
  }
}

const ConnectedMobileNavigation = connect(mapToState)(MobileNavigation)

export default ConnectedMobileNavigation

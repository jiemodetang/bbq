import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
  position:absolute;
  background-color:red;
  height:100%;
  width:100vw;
  top:0;
  transition:all 0.35s;
  right:${({ state }) => state ? '0vw' : '-100vw'};

`


const SecondView = ({ show }) => {

  return (
    <Container state={show}>

    </Container>
  )
}

const mapStateToProps = (state) => {

  return {
    show: state.mobileLinksReducer.showSecondView
  }
}

const ConnectedSecondView = connect(mapStateToProps)(SecondView)

export default ConnectedSecondView

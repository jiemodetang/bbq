import React,{useState} from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux'

import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import mobileActionCreators from '../../../Redux/ActionCreators/MobileNavActionCreators'

const Container = styled.div`
  display:flex;
  align-items:center;
  color:rgba(14, 14, 14, 0.75);

`
const IconContainer = styled.div`
  margin:5px;
  border-radius:50%;
  border:3px solid rgb(32, 129, 226);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:5px 7px 9px 7px;
  cursor:pointer;
`
const ArrowContainer = styled.div`
  transition:all 0.3s;
  transform:${({state})=> state ? 'rotate(180deg)':'rotate(0deg)' };
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;

  @media only screen and (min-width: 1030px) {
    display:none;
}

`

const Text = styled.div`
  font-size:20px;
  font-weight:600;
  display:none;
  margin-left:5px;
  margin-right:10px;
  @media only screen and (min-width: 1030px) {
    display:block;
}
`


const Icon =({toggle,show})=>{

  return(
    <Container>
      <IconContainer>
        <FilterHdrIcon style={{fontSize:'30px'}}/>
      </IconContainer>
      <ArrowContainer onClick={()=>toggle()} state={show}>
        <KeyboardArrowDownIcon style={{fontSize:'30px'}}/>
      </ArrowContainer>
      <Text>OpenLand</Text>
    </Container>
  )
}

const mapDispatchToProps ={
  toggle:mobileActionCreators.show
}

const mapToState =(state)=>{

  return{
      show:state.mobileNavReducer.show
  }
}

const ConnectedIcon = connect(mapToState,mapDispatchToProps)(Icon)

export default ConnectedIcon

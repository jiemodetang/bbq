
import React from 'react';
import styled from 'styled-components'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {connect} from 'react-redux'

import mobileActionCreators from '../../../Redux/ActionCreators/MobileNavActionCreators'

const Container = styled.div`
  display:flex;
  flex-direction:column;
`

const Items = styled.div`
  font-weight:600;
  letter-spacing:1px;
  font-size:16px;
  width:100%;
  padding:0px 15px;
  margin-top:20px;
  margin-bottom:20px;
  color:white;
  display:flex;
  align-items:center;
  justify-content:space-between;


`

const IconContainer = styled.div`
  padding-right:15px;
`
const ItemContainer = styled.div`
  display:flex;
`


const MobileLinks =({links,next})=>{

  return(
    <Container>
      {
        links.map((item,index)=>{
          return(
            <ItemContainer key={index} onClick={()=>{next(item.payload)}}>
            {
              item.icon
                ?
                <Items>
                  {item.title}
                  <IconContainer>{item.icon}</IconContainer>
                  </Items>
                :
                <Items >{item.title}</Items>
            }
            </ItemContainer>
          )
        })
      }
    </Container>
  )
}

const mapStateToProps = (state)=>{
  return{
      links:state.mobileLinksReducer.linksData
  }
}

const mapDispatchToProps ={
  next:mobileActionCreators.next
}

const ConnectedMobileLinks = connect(mapStateToProps,mapDispatchToProps)(MobileLinks)

export default ConnectedMobileLinks

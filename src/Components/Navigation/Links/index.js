import React from 'react';
import styled from 'styled-components'


const Container= styled.div`
display:none;
margin-left:10px;
width:45%;
@media only screen and (min-width: 1030px) {
  display:block;
}
`
const data = ['Create','user']

const UnorderedList =styled.ul`
  height:100%;
  display:flex;
  align-items:center;
  justify-content:space-around;
  padding-left:0px;
`
const Item = styled.li`

  font-weight:600;
  letter-spacing:1px;
  font-size:16px;
  color:rgba(14, 14, 14, 0.75);
  list-style-type:none;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
`


const Links =()=>{
  return(
    <Container>
      <UnorderedList>
        {
          data.map((item,index)=>{
            return<Item key={index}>{item}</Item>
          })
        }
      </UnorderedList>
    </Container>
  )
}


export default Links

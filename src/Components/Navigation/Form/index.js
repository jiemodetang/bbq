import React,{useState} from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';

const Container = styled.div`

  width:100%;
  @media only screen and (min-width: 1030px) {
    width:50%;
}
`

const Input = styled.input`
  width:100%;
  color:rgba(14, 14, 14, 0.75);
  height:41px;
  border-radius:4px;
  border:1px solid rgb(229, 232, 235);
  outline:none;
  font-size:16px;
  padding-left:40px;
  padding-right:40px;


`

const FormContainer = styled.form`
  position:relative;
`

const IconContainer = styled.div`
    position:absolute;
    left:10px;
    top:8px;
    color:rgba(14, 14, 14, 0.75);
`

const CloseContainer = styled.div`
  position:absolute;
  display:${({state})=> state ? 'block':'none' };
  right:10px;
  top:8px;
  color:rgba(14, 14, 14, 0.75);
`
const SubContainer = styled.div`
  position:relative;
  width:100%;
  display:flex;
  align-items:center;

`


//FUNCTIONALITY NEEDS TO BE REWORKED BUT FOR NOW THE VISUALS ARE CORRECT
const Form =()=>{
  const [state,setState] =useState(false)
  return(
    <Container>
      <FormContainer>
        <label htmlFor="searching"/>
        <SubContainer>
        <IconContainer>
          <SearchIcon style={{fontSize:'27px'}}/>
        </IconContainer>
            <Input type="text" id="searching" name="searching" onClick={()=>setState(!state)}/>
            <CloseContainer state={state}>
              {/* <CloseIcon style={{fontSize:'27px'}}/> */}
            </CloseContainer>
        </SubContainer>
      </FormContainer>

    </Container>
  )
}

export default Form

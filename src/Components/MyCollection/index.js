import React,{useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Container = styled.div`
  margin:120px 210px 20px 210px;
` 

class Collections extends React.Component{
  constructor(props){
    super(props)
  }
  createCollections() {
    this.props.history.push('/collection/create')
  }
   render() {
     return (
      <Container>
        <h3>我的集合</h3>
        <p>创建、策划和管理独特 NFT 的集合以共享和销售</p>
        <Stack spacing={2} direction="row">
          <Button 
            variant="contained"
            onClick={this.createCollections.bind(this)}
          >
            创建一个集合
          </Button>
          <Button variant="outlined">导入只能合约</Button>
        </Stack>

        <div>
          有创建的集合就显示集合，没有就显示占位
        </div>
      </Container>
     )
   }
}

export default Collections;
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
const Container = styled.div`
  margin:120px 210px 20px 210px;
`
const CreateDiv = styled.div`
  margin-top:40px 
` 


function Collections() {
  const [age, setAge] = React.useState('');

  // 改变下拉框选择的值
  const handleChangeType = (event) => {
    setAge(event.target.value);
  };

  // 创建按钮
  const createCollections = () => {

  }

  return (
    <Container>
      <h3>创建一个集合</h3>
      <p>必填字段</p>
      <h4>形象标识</h4>
      <p>此图像也将用于导航</p>

      <h4>名称</h4>
      <TextField fullWidth id="outlined-basic" label="集合名称" variant="outlined" />


      <h4>描述</h4>
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        label="Description"
        multiline
        maxRows={4} 
      />

      <h4>类型</h4>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChangeType}
          >
            <MenuItem value="">
              <em>请选择类型</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <CreateDiv>
        <Button
          variant="contained"
          onClick={createCollections}
        >
          创建
        </Button>
      </CreateDiv>
    </Container>
  )
}

export default Collections;
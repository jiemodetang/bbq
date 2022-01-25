import React from 'react';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Container = styled.div`
  margin:120px 210px 20px 210px;
`

class assets extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <h3>ARTS</h3>
      </Container>
    )
  }
}

export default assets;
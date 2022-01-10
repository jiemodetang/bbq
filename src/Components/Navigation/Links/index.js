import React from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Container = styled.div`
display:none;
margin-left:10px;
width:20%;
@media only screen and (min-width: 1030px) {
  display:block;
}
`
const data = ['Explore', 'user']

const UnorderedList = styled.ul`
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

const Links = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // 跳转路由
  const history = useHistory();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 我的集合
  function handleMyCollection() {
    history.push("/collections");
  }

  // 登出
  function handleLogOut() {
    alert('1')
    handleClose()
  }
  return (
    <Container>
      <UnorderedList>
        {/* {
          data.map((item,index)=>{
            return<Item key={index}>{item}</Item>
          })
        } */}
        <Button
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Explore
      </Button>
      <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleMyCollection}>All Nfts</MenuItem>
          <MenuItem onClick={handleLogOut}>Art</MenuItem>
        </Menu>




      <Button
          id="demo-positioned-button"
          
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Account
      </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleMyCollection}>My Collections</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </UnorderedList>
    </Container>
  )
}


export default Links

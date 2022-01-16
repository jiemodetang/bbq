import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Tp from "./tp.png";
const Container = styled.div`
    margin: 120px 210px 20px 210px;
`;
const CreateDiv = styled.div`
    margin-top: 40px;
`;
const Xh = styled.span`
    color: red;
`;
const Hs = styled.span`
    color: #8a939b;
`;
const TpImg = styled.img`
    width: 160px;
`;

function Collections() {
    const [age, setAge] = React.useState("");

    // 改变下拉框选择的值
    const handleChangeType = (event) => {
        setAge(event.target.value);
    };

    // 创建按钮
    const createCollections = () => {};

    return (
        <Container>
            <Typography variant="h4" gutterBottom component="div">
                创建一个集合
            </Typography>
            <Typography variant="body2" gutterBottom>
                <Xh>*</Xh>
                <Hs>必填字段</Hs>
            </Typography>

            <Typography variant="h5" gutterBottom component="div">
                形象标识<Xh>*</Xh>
            </Typography>
            <Typography component="div">
                <Hs>
                    此图像也将用于导航。推荐 350x350<Xh>*</Xh>
                </Hs>
            </Typography>
            <Typography component="div"  sx={{mt:5}}>

                <TpImg src={Tp} />
            </Typography>

            <h4>名称  <Xh>*</Xh></h4>
            <TextField fullWidth id="outlined-basic" label="集合名称" variant="outlined" />

            <h4>描述</h4>
            <TextField fullWidth id="outlined-multiline-flexible" label="Description" multiline maxRows={4} />

            <h4>类型</h4>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">请选择创建类型</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={handleChangeType}
                        label={''}
                    >
                     
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <CreateDiv>
                <Button variant="contained" onClick={createCollections}>
                    创建
                </Button>
            </CreateDiv>
        </Container>
    );
}

export default Collections;

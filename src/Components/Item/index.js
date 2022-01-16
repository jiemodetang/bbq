import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import jt from './img/jt.png'
import Home from '../Home'

const Container = styled.div`
    // margin: 120px 210px 20px 210px;
`;
const Box1 = styled(Box)`
    display: flex;
`;
export default function Item() {
    return (
        <Container>
            <img src={jt} style={{width:'100%'}}/>
              <Home></Home>
        </Container>
    );
}

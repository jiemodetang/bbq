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

const Container = styled.div`
    margin: 120px 210px 20px 210px;
    min-height:500px
`;
const Box1 = styled(Box)`
    display: flex;
`;
export default function ControlledOpenSelect() {
    const [age, setAge] = React.useState("");
    const [values, setValues] = React.useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false,
    });

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChange1 = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                     输入你的合约地址
                </Grid>
                <Grid item xs={12}>
                您的 ERC721 或 ERC1155 在主网上的联系地址是什么？
                </Grid>
                <Grid item xs={2}>
                    <Box1
                        sx={{
                            "& > :not(style)": { m: 1, minWidth: "120px" },
                        }}
                        noV
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Ethereum</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box1>
                </Grid>
                <Grid item xs={8}>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, minWidth: "460px" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="输入您的 ERC721 或 ERC1155 合约地址" variant="outlined" />
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt:20}}>
                <Grid item xs={2}>
                <Button variant="contained">提交</Button>
                </Grid>
            </Grid>
              
              
        </Container>
    );
}

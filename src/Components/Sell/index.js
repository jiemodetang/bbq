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
    // display: flex;
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
                    价格
                </Grid>
                <Grid item xs={2}>
                    <Box1
                        sx={{
                            "& > :not(style)": { m: 1, minWidth: "120px" },
                        }}
                        noV
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
                        <TextField id="outlined-basic" label="数量" variant="outlined" />
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    期间
                </Grid>
                <Grid item xs={6}>
                    <Box1
                        sx={{
                            "& > :not(style)": { m: 1, minWidth: "120px" },
                        }}
                        noV
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box1>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    费用
                </Grid>
                <Grid item xs={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25ch" }}>
                    <Input
                        id="standard-adornment-weight"
                        value={values.weight}
                        onChange={handleChange1("weight")}
                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
                </FormControl>
                </Grid>
               
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                <Button variant="contained">创建</Button>
                </Grid>
            </Grid>
              
              
        </Container>
    );
}

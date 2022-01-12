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
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const Container = styled.div`
    height: 310px;
    background: #0d2744;
`;
const Box1 = styled.div`
    margin:0 210px;
    height:100%;
    display: flex; 
    justify-content: center; 
     align-items: center;
`;

export default function Footer() {
    return (
        <Container>
            <Box1>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card sx={{ minWidth: 100 ,background:'#0d2744',color:'#fff'}}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    logo
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography>
                            </CardContent>
                           
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                    <Card sx={{ minWidth: 100,background:'#0d2744',color:'#fff' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    logo
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography>
                            </CardContent>
                           
                        </Card>
                    </Grid>
                </Grid>
            </Box1>
        </Container>
    );
}

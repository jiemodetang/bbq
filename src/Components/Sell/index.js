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
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Container = styled.div`
    margin: 120px 210px 20px 210px;
    // display: flex;
`;
const Box1 = styled(Box)`
    display: flex;
`;
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ControlledOpenSelect() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm();
    const chushou = () => {
        handleSubmit(onSubmit);
    };
    const onSubmit = (data) => {
        // TODO
        handleOpen();
        console.log(data, 22);
    };
    console.log(232324);

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                <InputLabel id="demo-simple-select-label">BNB</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange} {...register("type")}>
                                    <MenuItem value={"BNB"}>BNB</MenuItem>
                                    <MenuItem value={"USDT"}>USDT</MenuItem>
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
                            <TextField id="outlined-basic" label="数量" variant="outlined" {...register("num")} />
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
                                <InputLabel id="demo-simple-select-label">6个月</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange} {...register("yue")}>
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
                                // value={values.weight}
                                value={"2.5"}
                                onChange={handleChange1("weight")}
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    "aria-label": "weight",
                                }}
                                placeholder={"服务费"}
                                {...register("feiyong")}
                            />
                            <FormHelperText id="standard-weight-helper-text"></FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 10 }}>
                    <Grid item xs={2}>
                        <Button variant="contained" type="submit" onPress={chushou}>
                            出售
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        1.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        2.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        3.
                    </Typography>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                        <Grid item xs={6}>
                            取消
                        </Grid>
                        <Grid item xs={6}>
                            确认
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Container>
    );
}

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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import $message from 'popular-message';
// 合约
import $web3js from "../../lib/contract/web3";
import numberUtils from "../../utils/numberUtils";
import { formartadd, removeLocalStorage, setLocalStorage, getLocalStorage, div } from "../../utils/index";
// 出售挂单 abi
const creatOrderJson = require("../../lib/contract/creatOrder.json");
const nftContract = require("../../lib/contract/contractAddress");
// 交易 abi
const sellJson = require("../../lib/contract/sell.json");


const Container = styled.div`
   margin: 100px 210px 20px 210px;
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

    const handlerSell = () => {
        handleSubmit(onSubmit);
    };
    const onSubmit = (data) => {
        // TODO 1.调后台接口，接口返回成功打开弹窗 handleOpen(),
        handleOpen();
        // console.log(data, 22);
    };
    const handlerConfirm = () => {
        const nftContractSellAdd = nftContract.default.test.sellContract;
        const nftContractAdd = nftContract.default.test.nftContract;
        const myaddress = getLocalStorage("walletaccount");
        const thisWeb3 = $web3js.getWeb3();
        const nftConst = new thisWeb3.eth.Contract(
            creatOrderJson.abi,
            nftContractAdd,
            {
                from: myaddress,
            }
        );
        nftConst.methods
            .isApprovedForAll(myaddress, nftContractSellAdd)
            .call({ from: myaddress })
            .then((res) => {
                if (!res) {
                    approveNft();
                } else {
                    handleClose();
                }
            });
    }
    const approveNft = () => {
        let getedHash = '';
        const nftContractAdd = nftContract.default.test.nftContract;
        const nftContractSellAdd = nftContract.default.test.sellContract;
        connectMetaMask();
        const web3GetWeb3 = $web3js.getWeb3();
        const myaddress = getLocalStorage("walletaccount");
        const approveConst = new web3GetWeb3.eth.Contract(
            creatOrderJson.abi,
            nftContractAdd,
            {
                from: myaddress,
            }
        );
        let alertMesg;
        approveConst.methods
            .setApprovalForAll(nftContractSellAdd, true)
            .send({ from: myaddress })
            .on("transactionHash", function (hash) {
                console.log('hash', hash);
                $message.info('请耐心等待交易打包，不要退出')
                getedHash = hash;
            })
            .on("receipt", function (receipt) {
                if (receipt.transactionHash === getedHash) {
                    console.log('approve', 'success');
                    if (alertMesg) {
                        alertMesg.destroy();
                    }
                    $message.success('授权成功！')
                }
            })
            .on("error", function (error, receipt) {
                console.log('err', error);
                if (alertMesg) {
                    alertMesg.destroy();
                }
                $message.error(error.message)
            });
    }

    const approveNftCancle = () => {
        let getedHash = '';
        const nftContractAdd = nftContract.default.test.nftContract;
        const nftContractSellAdd = nftContract.default.test.sellContract;
        connectMetaMask();
        const web3GetWeb3 = $web3js.getWeb3();
        const myaddress = getLocalStorage("walletaccount");
        const approveConst = new web3GetWeb3.eth.Contract(
            creatOrderJson.abi,
            nftContractAdd,
            {
                from: myaddress,
            }
        );
        let alertMesg;
        approveConst.methods
            .setApprovalForAll(nftContractSellAdd, false)
            .send({ from: myaddress })
            .on("transactionHash", function (hash) {
                console.log('hash', hash);
                $message.info('请耐心等待交易打包，不要退出')
                getedHash = hash;
            })
            .on("receipt", function (receipt) {
                if (receipt.transactionHash === getedHash) {
                    console.log('approve', 'success');
                    if (alertMesg) {
                        alertMesg.destroy();
                    }
                    $message.success('授权成功！')
                }
            })
            .on("error", function (error, receipt) {
                console.log('err', error);
                if (alertMesg) {
                    alertMesg.destroy();
                }
                $message.error(error.message)
            });
    }
    const connectMetaMask = () => {
        $web3js
            .connectMetaMask()
            .then((res) => {
            })
            .catch((err) => {
                $message.error(err)
            });
    }
    // console.log(232324);

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
                    <Grid item xs={12} style={{ marginTop: '15px' }}>
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
                                    <MenuItem value={10}>1个月</MenuItem>
                                    <MenuItem value={20}>3个月</MenuItem>
                                    <MenuItem value={30}>6个月</MenuItem>
                                </Select>
                            </FormControl>
                        </Box1>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginTop: '15px' }}>
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
                <Grid container spacing={2} sx={{ mt: 1, mb: 5 }}>
                    <Grid item xs={2}>
                        <Button variant="contained" type="submit" onPress={handlerSell}>
                            出售
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Dialog
                open={open}
                fullWidth
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    {"确认挂单"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        1.rr
                    </DialogContentText>
                    <DialogContentText>
                        2.rr
                    </DialogContentText>
                    <DialogContentText>
                        3.rr
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        取消
                    </Button>
                    <Button onClick={handlerConfirm} autoFocus>
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

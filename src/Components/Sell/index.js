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
import { sellItem, increase } from '../../service/bbq'
// 合约
import $web3js from "../../lib/contract/web3";
import numberUtils from "../../utils/numberUtils";
import { formartadd, removeLocalStorage, setLocalStorage, getLocalStorage, getQueryStringRegExp } from "../../utils/index";
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
	const [open1, setOpen1] = React.useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);
	const [open2, setOpen2] = React.useState(false);
	const handleOpen2 = () => setOpen2(true);
	const handleClose2 = () => {
		setToAddress('');
		setOpen2(false);
	}
	const [disableBtn, setDisableBtn] = React.useState(false);
	const [toAddress, setToAddress] = React.useState('');
	const [age, setAge] = React.useState("6");
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

	// sell
	const onSubmit = (data) => {
		// TODO 1.调后台接口，接口返回成功打开弹窗 handleOpen(),
		// sell 挂单参数
		const params = {
			data: {
				itemId: getQueryStringRegExp('id'),
				...data
			},
		};
		sellItem(params).then(res => {
			if (res.code === '0000') {
				// 打开弹窗
				handleOpen1();
			} else if (res.code === '9999') {
				$message.error(res.msg);
			} else {
				$message.error(res.msg);
				setDisableBtn(true);
			}
		})
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
				console.log('res', res);
				if (!res) {
					approveNft();
				} else {
					handleClose1();
					// 改变出售文案
					// 挂单成功之后，按钮状态修改
					setDisableBtn(true);
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
		approveConst.methods
			.setApprovalForAll(nftContractSellAdd, true)
			.send({ from: myaddress })
			.on("transactionHash", function (hash) {
				$message.config({
					top: 50,
					duration: 0
				});
				$message.loading("请耐心等待交易打包，不要退出");
				getedHash = hash;
			})
			.on("receipt", function (receipt) {
				if (receipt.transactionHash === getedHash) {
					console.log('approve', 'success');
					$message.destroy();
					setTimeout(() => {
						$message.success('授权成功！')
					}, 800)

					handleClose1();
					// 挂单成功之后，按钮状态修改
					setDisableBtn(true);
				}
			})
			.on("error", function (error, receipt) {
				console.log('err', error);
				$message.destroy();
				setTimeout(() => {
					$message.error(error.message);
				}, 800)
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
		approveConst.methods
			.setApprovalForAll(nftContractSellAdd, false)
			.send({ from: myaddress })
			.on("transactionHash", function (hash) {
				console.log('hash', hash);
				$message.config({
					top: 50,
					duration: 0
				});
				$message.loading("请耐心等待交易打包，不要退出");
				getedHash = hash;
			})
			.on("receipt", function (receipt) {
				if (receipt.transactionHash === getedHash) {
					console.log('approve', 'success');
					$message.destroy();
					setTimeout(() => {
						$message.success('授权成功！')
					}, 800)
				}
			})
			.on("error", function (error, receipt) {
				$message.destroy();
				setTimeout(() => {
					$message.error(error.message);
				}, 800)
			});
	}
		// 用户没有登录
		const NotLogin = () => {
			if (!getLocalStorage('walletaccount')) {
				window._M.info('请先链接钱包，登录账号')
				return true;
			} else {
				return false;
			}
		}
		// 赠送
		const giveAway = () => {
			if (NotLogin()) return;
			handleOpen2();
		}
		const handleChangeAddr = (event) => {
			setToAddress(event.target.value);
	};
		// 赠送确定
		const handlerConfirmIncase = (event) => {
			incaseTo(toAddress);
		}
		const incaseTo = (toAddress) => {
			let incaseHash = '';
			// const nftContractSellAdd = nftContract.default.test.sellContract;
			const nftContractAdd = nftContract.default.test.nftContract;
			const myaddress = getLocalStorage("walletaccount");
			const incaseWeb3 = $web3js.getWeb3();
			connectMetaMask();
			const incaseConst = new incaseWeb3.eth.Contract(
				creatOrderJson.abi,
				nftContractAdd,
				{
					from: myaddress,
				}
			);
			let tokenId = getQueryStringRegExp('tokenId');
			let itemId =  getQueryStringRegExp('id')
			// let toAddress = '0x89351d3339738Da10428581D05F420248D2c841D';
			console.log('incaseConst', incaseConst);
			incaseConst.methods
				.safeTransferFrom(myaddress, toAddress, tokenId)
				.send({ from: myaddress })
				.on("transactionHash", function (hash) {
					console.log('incaseHash', hash);
					$message.config({
						top: 50,
						duration: 0
					});
					$message.loading("请耐心等待交易打包，不要退出");
					incaseHash = hash;
				})
				.on("receipt", function (receipt) {
					if (receipt.transactionHash == incaseHash) {
						// 调后台确认交易
						incaseSuccess(itemId, toAddress, incaseHash);
					}
				})
				.on("error", function (error, receipt) {
					$message.destroy();
					setTimeout(() => {
						$message.error(error.message);
					}, 800)
				});
		}
	
		// 转赠成功
		const incaseSuccess = (itemId, toAddress, incaseHash) => {
			const params = {
				data: {
					itemId: itemId,
					toAddr: toAddress,
					txHash: incaseHash,
				},
			};
			increase(params).then(res => {
				if (res.code === '0000') {
					$message.destroy();
					setTimeout(() => {
						$message.success('转赠成功');
					}, 800)
					handleClose2();
					setToAddress('');
					// 赠送成功之后，按钮状态修改
					setDisableBtn(true);
				} else {
					$message.destroy();
					setTimeout(() => {
						$message.error(res.msg)
					}, 800)
				
				}
			})
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
								<Select labelId="demo-simple-select-label" id="demo-simple-select" value={2} label="Age" onChange={handleChange} {...register("priceType")}>
									<MenuItem value={"2"}>BNB</MenuItem>
									<MenuItem value={"1"}>USDT</MenuItem>
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
							<TextField id="outlined-basic" label="数量" variant="outlined" {...register("price")} />
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
								<Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange} {...register("deadLine")}>
									<MenuItem value={1}>1个月</MenuItem>
									<MenuItem value={3}>3个月</MenuItem>
									<MenuItem value={6}>6个月</MenuItem>
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
								{...register("reqNo")}
							/>
							<FormHelperText id="standard-weight-helper-text"></FormHelperText>
						</FormControl>
					</Grid>
				</Grid>
				<Grid container spacing={2} sx={{ mt: 1, mb: 5 }}>
					<Grid item xs={4}>
						<Button 
						variant="contained" type="submit" 
						disabled={disableBtn} 
						onPress={handlerSell}>
							出售
              </Button>
							<Button
								disabled={disableBtn}
								variant="contained"
								onClick={giveAway}
								style={{ marginLeft: '25px' }}>
								{" "}
								转赠
              </Button>
					</Grid>
				</Grid>
			</form>
			<Dialog
				open={open1}
				fullWidth
				aria-labelledby="responsive-dialog-title">
				<DialogTitle id="responsive-dialog-title">
					{"确认挂单"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						1. 初始化你的钱包
                    </DialogContentText>
					<DialogContentText>
						2. 批准出售此商品
                    </DialogContentText>
					<DialogContentText>
						3. 确认
          </DialogContentText>
				</DialogContent>
				<DialogActions>
					{/* <Button autoFocus onClick={handleClose}>
						取消
          </Button> */}
					<Button onClick={handlerConfirm} autoFocus>
						确定
          </Button>
				</DialogActions>
			</Dialog>

			<Dialog open={open2} fullWidth fullWidth>
				<DialogTitle>转赠NFT</DialogTitle>
				<DialogContent>
					<DialogContentText>
						请输入转赠此NFT的帐户地址：
        </DialogContentText>
					<TextField
						value={toAddress}
						autoFocus
						margin="dense"
						id="name"
						label="User Address"
						type="text"
						fullWidth
						variant="standard"
						onChange={handleChangeAddr}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose2}>取消</Button>
					<Button onClick={handlerConfirmIncase}>确定</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}

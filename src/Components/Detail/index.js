import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import DiamondIcon from "@mui/icons-material/Diamond";
import qbs from "./image/qbs.png";
import zs from "./image/zs.png";
import yw from "./image/yw.png";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { postDetail, detailItem, BuyItem, BuyItemSuccess, increase, CancelsellItem, deleteItem, getInfos } from "../../service/bbq";
import { getQueryStringRegExp } from "../../utils/index";
import _ from "lodash";
import { getLocalStorage } from "../../utils/index";
import { apiConfig } from "../../service/mmp";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import $message from "popular-message";
import { useHistory } from "react-router-dom";
import $web3js from "../../lib/contract/web3";
import numberUtils from "../../utils/numberUtils";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noDataIMg from "../Img/noData.png";

const creatOrderJson = require("../../lib/contract/creatOrder.json");
const nftContract = require("../../lib/contract/contractAddress");
const sellJson = require("../../lib/contract/sell.json");

const Container = styled.div`
    margin: 100px 210px 20px 210px;
`;
const Img = styled.img`
    width: 100%;
`;
const Button1 = styled(Button)`
    width: 146px;
    height: 50px;
    background: #56adbb !important;
    border-radius: 10px;
    font-weight: 400;
    color: #ffffff !important;
`;
const TopBox = styled.div`
    height: 60px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8a939b;
    line-height: 60px;
    border-bottom: 1px solid #e4e8eb;
    display: flex;
    align-items: center;
`;
const ImgGGOGOGO = styled.img`
    width: 20px;
`;
function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}
const LoadingImg = styled.img`
    width: 190px;
    height: 190px;
`;

const rows = [
	createData("test", 159, 6.0, 24, 4.0),
	createData("test", 237, 9.0, 37, 4.3),
	createData("test", 262, 16.0, 24, 6.0),
	createData("test", 305, 3.7, 67, 4.3),
	createData("test", 356, 16.0, 49, 3.9),
];
const tableListMMP = ["时间",  "来自", "去向", "类型"];
const Detail = () => {
	const [expanded, setExpanded] = React.useState("");
	const [checked, setChecked] = React.useState([]);
	const [data, setData] = React.useState({});
	const [open, setOpen] = React.useState(false);
	const [disableBtn, setDisableBtn] = React.useState(false);
	const [isSelled, setisSelled] = React.useState(false);
	const [toAddress, setToAddress] = React.useState("");
	const handleOpen = () => setOpen(true);
	const history = useHistory();
	const handleClose = () => {
		setToAddress("");
		setOpen(false);
	};
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	React.useEffect(() => {
		const p = ()=>{
			const params = {
				data: {
					id: getQueryStringRegExp("itemId"),
				},
			};
			detailItem(params).then((res) => {
				setData(_.get(res, "data") || {});
			});
		}
		p()
		let time = null 
		time = setInterval(()=>{
			p()
		},5000)
	}, []);

	// 购买成功，重新调用详情，取购买列表数据
	const detailItemList = () => {
		const params = {
			data: {
				id: getQueryStringRegExp("itemId"),
			},
		};
		detailItem(params).then((res) => {
			setData(_.get(res, "data") || {});
		});
	}

	// 用户没有登录
	const NotLogin = () => {
		if (!getLocalStorage("walletaccount")) {
			window._M.warning("请先链接钱包，登录账号");
			return true;
		} else {
			return false;
		}
	};
	// 购买
	const handlerBuy = () => {
		if (NotLogin()) return;
		const params = {
			data: {
				id: getQueryStringRegExp("itemId"),
			},
		};
		BuyItem(params).then((res) => {
			// console.log('res', res);
			if (res.code === "0000") {
				let tokenId = res.data.tokenId;
				let sellAddress = res.data.sellerAddr;
				// let contractAddFromEnd = res.data.nftAddr;;
				let contractAddFromEnd = res.data.nftAddr ? res.data.nftAddr : "0x1CE4d44eA0668B7f38A7759FE8d4dE68B5431273";
				let Val = Number(res.data.price);
				let value = numberUtils.movePointRight(Val, 18);
				// 暂时写死  1---- usdt
				if (res.data.priceType === 1) {
					handlerBuyUseBnb(contractAddFromEnd, sellAddress, tokenId, value);
				} else {
					handlerBuyUseBnb(contractAddFromEnd, sellAddress, tokenId, value);
				}
			} else {
				$message.error(res.msg);
			}
		});
	};
	const handlerBuyUseBnb = (contractAddFromEnd, sellAddress, tokenId, value) => {
		let tradeHash = "";
		const nftContractSellAdd = nftContract.default.test.sellContract;
		const web3GetWeb3 = $web3js.getWeb3();
		const myaddress = getLocalStorage("walletaccount");
		const tradeWeb3 = $web3js.getWeb3();
		connectMetaMask();
		const tradeConst = new tradeWeb3.eth.Contract(sellJson.abi, nftContractSellAdd, {
			from: myaddress,
		});
		tradeConst.methods
			._atomicMatch(contractAddFromEnd, sellAddress, tokenId)
			.send({ from: myaddress, value: value })
			.on("transactionHash", function (hash) {
				console.log("tradehash", hash);
				$message.config({
					top: 50,
					duration: 0
				});
				$message.loading("请耐心等待交易打包，不要退出");
				tradeHash = hash;
			})
			.on("receipt", function (receipt) {
				if (receipt.transactionHash == tradeHash) {
					// 调后台确认交易
					handlerBuySuccess(sellAddress, tokenId, tradeHash);
				}
			})
			.on("error", function (error, receipt) {
				$message.destroy();
				setTimeout(() => {
					$message.error(error.message);
				}, 800)
			});
	};
	// 购买成功
	const handlerBuySuccess = (sellerAddr, tokenId, txHash) => {
		const params = {
			data: {
				sellerAddr: sellerAddr,
				tokenId: tokenId,
				txHash: txHash,
			},
		};
		BuyItemSuccess(params).then((res) => {
			if (res.code === "0000") {
				// 购买成功之后，调 detail ，取交易列表
				detailItemList();
				$message.destroy();
				setTimeout(() => {
					$message.success("购买成功");
				}, 800)
				// 购买和取消出售送成功之后，按钮状态修改
				setDisableBtn(true);
			} else {
				$message.destroy();
				setTimeout(() => {
					$message.error(res.msg);
				}, 800)
			}
		});
	};

	// 取消出售
	const cancleGive = () => {
		if (NotLogin()) return;
		let itemId = getQueryStringRegExp("itemId");
		Cancelsell(itemId);
	};
	// 取消出售成功
	const Cancelsell = (itemId) => {
		const params = {
			data: {
				id: itemId,
			},
		};
		CancelsellItem(params).then((res) => {
			if (res.code === "0000") {
				$message.success("取消出售成功");
				setisSelled(true)
				// 购买和取消出售送成功之后，按钮状态修改
				setDisableBtn(true);
			} else {
				$message.error(res.msg);
				setDisableBtn(true);
			}
		});
	};
	const connectMetaMask = () => {
		$web3js
			.connectMetaMask()
			.then((res) => { })
			.catch((err) => {
				$message.error(err);
			});
	};

const d = () => {
		const c = {
				data: {
						id: getQueryStringRegExp("itemId"),
				},
		};
		deleteItem(c).then((res) => {
				if (res.code == "0000") {
						window._M.success("删除成功");
						history.push('/collection/item?colId='+ getQueryStringRegExp("id"))
				} else {
						window._M.error(res.msg);
				}
		});
};

	return (
		<Container>
			{!getQueryStringRegExp("from") && isSelled && (
				<Box
					sx={{
						textAlign: "right",
					}}
				>
					<Fab
						color="primary"
						aria-label="edit"
						size="small"
						sx={{ ml: 1 }}
						onClick={() => {
							history.push("/collection/create?colId=" + getQueryStringRegExp("itemId") + "&type=item&itemId=" + getQueryStringRegExp("itemId"));
						}}
					>
						<EditIcon />
					</Fab> 

					<Fab color="primary" aria-label="add" size="small" onClick={d} sx={{ mr: 1, ml: 1 }}>
					<DeleteIcon />
				</Fab>
				</Box>
			)}
			<Paper sx={{ p: 20, margin: "auto", maxWidth: 1260, paddingTop: "0px", boxShadow: "none", padding: 0 }}>
				<Grid container spacing={2}>
					<Grid
						item
						xs={4}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Img src={apiConfig.productionUrl + data.itemImage} />
					</Grid>
					<Grid item xs={8} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid sx={{ marginLeft: "30px", marginTop: "20px" }}>
								<Typography gutterBottom variant="subtitle1" component="div" sx={{ color: "#56ADBB", fontSize: "14px" }}>
									{data.memo}
								</Typography>
								<Typography variant="body2" gutterBottom sx={{ color: "#333330", fontSize: "30px", mt: 2, fontWeight: "500" }}>
									#{data.colType}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									拥有者：{data.itemName}
								</Typography>
							</Grid>
							<Grid sx={{ borderRadius: "20px", border: "1px solid #E4E8EB", height: "auto", padding: "10px", marginLeft: "30px", marginTop: "20px" }}>
								<Card sx={{ maxWidth: 600, boxShadow: "none" }}>
									<TopBox>
										<AccessTimeIcon></AccessTimeIcon>
										<Box
											sx={{
												flex: 1,
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
												maxWidth: 400,
											}}
										>
											{data.memo}
										</Box>
										<Box>
											<Tooltip title="延长拍卖10分钟以内的新最高出价剩余的将延长拍卖额外的 10 分钟。" placement="top">
												<ImgGGOGOGO src={yw} style={{ width: "20px", marginRight: "8px" }}></ImgGGOGOGO>
											</Tooltip>
										</Box>
									</TopBox>
									{/* <CardMedia component="img" alt="green iguana" height="140" image="/static/images/cards/contemplative-reptile.jpg" /> */}
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											<Box
												sx={{
													fontSize: "14px",
													color: "#8A939B",
												}}
											>
												最低出价
                                            </Box>
										</Typography>
										<Typography variant="body2" color="text.secondary">
											<Grid container direction="row" justifyContent="flex-start" alignItems="center">
												<DiamondIcon sx={{ color: "#DA3979" }} />

												<Box
													sx={{
														fontSize: "28px",
														color: "#333333",
														fontWeight: 500,
														margin: "0  20px",
													}}
												>
													{data.price}
												</Box>
												{/* <Box>($93,983.40)</Box> */}
											</Grid>
										</Typography>
									</CardContent>
									<CardActions>
										{
											data.owner === getLocalStorage('walletaccount') ?
											<span></span>
											:
											<Button disabled={disableBtn} variant="contained" style={{ marginLeft: "10px" }} onClick={handlerBuy}>
											{" "}
											<ImgGGOGOGO src={qbs} style={{ width: "20px", marginRight: "8px" }} />
												购买
										</Button>
										}
										{
											data.owner === getLocalStorage("walletaccount") ? 
											<Button 
											disabled={disableBtn} 
											variant="contained" 
											onClick={cancleGive} 
											style={{ marginLeft: "25px" }} disableBtn>
											{" "}
											<ImgGGOGOGO src={zs} style={{ width: "20px", marginRight: "8px" }} />
                      取消出售
                    </Button> :
										<span></span>
										}
										
									</CardActions>
								</Card>
							</Grid>
						</Grid>
						{/* <Grid item>
                            <Typography variant="subtitle1" component="div">
                                $19.00
                            </Typography>
                        </Grid> */}
					</Grid>
				</Grid>
			</Paper>
			<div>
				<Accordion style={{ margin: "20px 0 35px" }} defaultExpanded>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
						<Typography>项目活动</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ background: "#FBFDFF", padding: "0" }}>
						{/* table */}
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										{tableListMMP.map((item, index) => (
											<TableCell align={index > 0 ? "right" : ""} key={index}>
												{item}
											</TableCell>
										))}
									</TableRow>
								</TableHead>

								{_.isEmpty(_.get(data, ["orderRespList"], [])) ? (
									''
								) : (
									<TableBody>
										{_.get(data, ["orderRespList"], []).map((row) => (
											<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: "#FBFDFF" }}>
												<TableCell component="th" scope="row">
													{row.date}
												</TableCell>
												<TableCell align="right">{row.from}</TableCell>
												<TableCell align="right">{row.to}</TableCell>
												<TableCell align="right">{row.tradeType == 1?'购买':"转赠"}</TableCell>
											</TableRow>
										))}
									</TableBody>
								)}
							</Table>
						</TableContainer>
						{
							_.isEmpty(_.get(data, ["orderRespList"], [])) &&

							<Box sx={
								{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
									margin: '100px 0'
								}
							}>
								<LoadingImg src={noDataIMg} />
							</Box>
						}
					</AccordionDetails>
				</Accordion>
			</div>
		</Container>
	);
};

export default Detail;

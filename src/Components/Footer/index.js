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
import githubPng from "./img/github.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import HLogo from '../Img/bLogo.png'

import instagram from "./img/instagram.png";
import telegram from "./img/telegram.png";
import tt from "./img/tt.png";

const ua = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);

const imgList = [
	{
		img: githubPng,
		title: "github",
	},
	{
		img: instagram,
		title: "instagram",
	},
	{
		img: telegram,
		title: "telegram",
	},

	{
		img: tt,
		title: "tt",
	},
];
const MyBox = styled(Box)`
    background: #0d2744;
`;
const Box1 = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0d2744;
    width:100%;
`;
const MyLogo = styled.img`
    width: 160px;
    margin-left:20px
`;
export default function Footer() {
	return (
		<MyBox>
			<Container maxWidth={"xl"} sx={{ height: ua ? "auto" : "220px" }}>
				<Box1>
					<Grid container spacing={2}>
						<Grid item xs={ua ? 12 : 6}>
							<Card sx={{ minWidth: 100, background: "#0d2744", color: "#fff", boxShadow: "none" }}>
								<CardContent>
									<Typography variant="h5" component="div">
										<Stack direction="row" spacing={2}>
											{/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
											<Grid item xs={6}>
											<MyLogo src={HLogo}></MyLogo>
                                            </Grid>
										</Stack>
									</Typography>
									<Typography sx={{ mb: 1.5 }} color="#fff" mt={2}>
										<Grid item xs={8}>
											世界上第一个也是最大的加密收藏品和不可替代代币(NFT)的 数字市场。购买、出售和发现独家数字商品。
                                        </Grid>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={ua ? 12 : 6} sx={{ boxShadow: "none" }}>
							<Card sx={{ minWidth: 100, background: "#0d2744", color: "#fff", boxShadow: "none" }}>
								<CardContent>
									<Typography variant="h5" component="div">
										<Box
											sx={{
												mb: 2,
											}}
										>
											加入社区
                                        </Box>
									</Typography>
									<Typography sx={{ mb: 1.5 }} color="text.secondary">
										<Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
											{imgList.map((item, index) => {
												return (
													<Grid item xs={ua ? 2 : 1} key={index}>
														<img src={item.img}></img>
													</Grid>
												);
											})}
										</Grid>
									</Typography>
									<Typography sx={{ mb: 1.5 }} color="#fff">
										<Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
											{["隐私政策", "服务条款"].map((item, index) => {
												return (
													<Grid item xs={ua ? 3 : 2} key={index}>
														{item}
													</Grid>
												);
											})}
										</Grid>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box1>

			</Container>
			<Box1
				sx={{
					height: "88px",
					background: "#0d2744",
					width: "100%",
				}}
			>
				{/* <Divider variant="middle" sx={{ background: "#fcc",color:'#fff' }} /> */}
				<Box sx={{ color: '#fff', height: '88px', lineHeight: '88px' }}>© 2018 - 2022xxxx公司</Box>
			</Box1>
		</MyBox>
	);
}

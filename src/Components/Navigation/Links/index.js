import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import $web3js from "../../../lib/contract/web3";
import { formartadd, removeLocalStorage, setLocalStorage, getLocalStorage, getCookie,setCookie } from "../../../utils/index";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ImageListItem from "@mui/material/ImageListItem";
import sheying from "./image/sheying.png";
import shoucangping from "./image/shoucangping.png";
import suoyou from "./image/suoyou.png";
import yishu from "./image/yishu.png";
import yingyue from "./image/yingyue.png";
import yundong from "./image/yundong.png";
import NEW from "./image/NEW.png";
import ListItemIcon from "@mui/material/ListItemIcon";
import { login, getAllColType } from "../../../service/bbq";
import { connect } from "react-redux";
import { apiConfig } from '../../../service/mmp'
import _ from "lodash";

const ntfList = [
    {
        title: "所有",
        img: suoyou,
        type: ''
    },
    {
        title: "最新",
        img: NEW,
        type: ''
    },
    {
        title: "摄影",
        img: sheying,
        type: ''
    },
    {
        title: "音乐",
        img: yingyue,
        type: ''
    },
    {
        title: "收藏品",
        img: shoucangping,
        type: ''
    },
    {
        title: "艺术",
        img: yishu,
        type: ''
    },
    {
        title: "运动",
        img: yundong,
        type: ''
    },
];

const Container = styled.div`
    display: none;
    margin-left: 5px;
    width: 24%;
    @media only screen and (min-width: 1030px) {
        display: block;
    }
`;
const data = ["Explore", "user"];

const UnorderedList = styled.ul`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: 0px;
`;
const Item = styled.li`
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 16px;
    color: rgba(14, 14, 14, 0.75);
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Links = ({ colTyple, dispatch }) => {
    const [nftType, setNftType] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(null);
    // 登录状态
    const [userState, setUserState] = React.useState(getLocalStorage("walletaccount"));
    // 跳转路由
    const history = useHistory();

    useEffect(() => {
        const params = {
            method: 'get'
        }
        getAllColType(params)
    }, []);
    // EXPLORE nft 类型选择
    const openNftType = Boolean(nftType);
    const handleNftType = (event) => {
        setNftType(event.currentTarget);
    };
    const handleCloseNftType = () => {
        setNftType(null);
    };

    // ACCOUNT 账号信息
    const open = Boolean(userInfo);
    const handleClick = (event) => {
        setUserInfo(event.currentTarget);
    };
    const handleClose = () => {
        setUserInfo(null);
    };

    // type 是 nft 类型为变量
    function handleNftsType(type) {
        history.push("/assets/type");
        handleCloseNftType(null);
    }
    // 我的集合
    function handleList(type) {
        history.push("/");
        dispatch({
            type: 'LINK',
            payload: type
        })

        handleClose();
    }
    // 我的集合
    function handleMyCollection() {
        history.push("/collections");
        handleClose();
    }

    // 登出
    function handleLogOut() {
        removeLocalStorage("walletaccount");
        setUserState(null);
        handleClose();
        history.push("/");
    }

    // 链接钱包
    function connectWallent() {
        $web3js
            .connectMetaMask()
            .then((res) => {
                if (!getLocalStorage("walletaccount")) {
                    loadingData();
                }
            })
            .catch((error) => {
                // this.$toast(this.$t("lang.connectfail") + error);
                console.log(error);
            });
    }

    function loadingData() {
        $web3js.connectWallet().finally(() => {
            const address = $web3js.getCurrWalletAddress();
            //const address = '0x9B7b3021c0D3034F1bC6d9FB11536d0F817AfBBB';
            const params = {
                data: {
                    addr: address,
                },
            };
            login(params).then(res => {
                if (res.code === '0000') {
                    apiConfig.token = _.get(res, ['data', 'token'])
                    window._M.success('链接钱包成功');
                    // 链接钱包成功之后，弹出提示信息
                    setLocalStorage("walletaccount", address);
                    setCookie('token',_.get(res, ['data', 'token']),1)
                    setUserState(address);
                } else {
                    window._M.error(res.msg);
                }
            });
        });
    }

    return (
        <Container>
            <UnorderedList>
                {/* {
          data.map((item,index)=>{
            return<Item key={index}>{item}</Item>
          })
        } */}

                {/* EXPLORE 对应原网站 explore nft类型选择 */}
                <Button
                    id="demo-positioned-button"
                    aria-controls={openNftType ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openNftType ? "true" : undefined}
                    onClick={handleNftType}
                >
                    资源
                </Button>
                <Menu
                    sx={{ top: "55px", left: "-40px" }}
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={nftType}
                    open={openNftType}
                    onClose={handleCloseNftType}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    {ntfList.map((item, index) => {
                        const dom = (
                            <div>
                                <MenuItem onClick={() => {
                                    handleList(item.type)
                                }} key={index}>
                                    <ListItemIcon key={item.img}>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            loading="lazy"
                                            onClick={() => {
                                                // history.push("/collection/detail");
                                            }}
                                        ></img>
                                    </ListItemIcon>
                                    {item.title}
                                </MenuItem>
                            </div>
                        );
                        return dom;
                    })}
                </Menu>

                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <AccountCircleOutlinedIcon sx={{ color: "#7e7e7e" }}></AccountCircleOutlinedIcon>
                </Button>
                <Menu
                    sx={{ top: "55px", left: "-40px" }}
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={userInfo}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <MenuItem onClick={handleMyCollection}>我的集合</MenuItem>
                    <MenuItem onClick={handleLogOut}>退出</MenuItem>
                </Menu>

                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={connectWallent}
                >
                    {!userState ? "链接钱包" : formartadd(getLocalStorage("walletaccount"))}
                </Button>
            </UnorderedList>
        </Container>
    );
};

const mapStateToProps = ({ linkReducer }) => {
    return {
        colTyple: linkReducer.colTyple,
    };
};

export default connect(mapStateToProps)(Links);

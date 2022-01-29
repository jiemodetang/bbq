import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import cl from "./image/cl.png";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import request from "../../utils/axios";
import { getHomeList } from "../../service/bbq";
import { getMyList, deleteC } from "../../service/bbq";
import _ from "lodash";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { apiConfig } from "../../service/mmp";
import noDataIMg from "../Img/noData.png";
import loadImg from "../Img/myloading.gif";

const colNameStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: " #333333",
};

const Container = styled.div`
    margin: 100px 210px 20px 210px;
`;
const MYContainer = styled(Container)`
    margin-top: 120px;
`;
const ConDiv = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: center;
`;

const Item1 = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8a939b;
    line-height: 14px;
`;
const Item2 = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 16px;
`;
const ua = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
const itemData = [
    {
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
    },
    {
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Burger",
        author: "@rollelflex_graphy726",
    },
    {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
        author: "@helloimnik",
    },
    {
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Coffee",
        author: "@nolanissac",
    },
    {
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Hats",
        author: "@hjrc33",
    },
];
const LoadingImg = styled.img`
    width: 90px;
    height: 90px;
`;
const pageSize = 12;
class Collections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            count: 1,
			loading: true,
			lxl:false
        };
    }

    handleChange = (event, value) => {
        this.setState({
            page: value - 1,
        });
    };
    componentDidMount() {
      const f = ()=>{
		const p = {
            data: {
                colType: "",
            },
        };
        this.setState({
            loading: true,
        });
        getMyList(p).then((res) => {
            const data = _.get(res, ["pageInfo", "list"], []);
            const t = _.get(res, ["pageInfo", "total"]);
            this.setState({
                count: Math.ceil(t / pageSize),
                data: _.chunk(data, 12),
                loading: false,
            });
        });
	  }
	  f()
	  let  time = null 
	  time =  setInterval(() => {
		f()
	}, 30000);
    }
    createCollections() {
        this.props.history.push("/collection/create?type=col");
    }
    goDr = () => {
        this.props.history.push("/collection/dr");
    };
    render() {
        return (
            <Container>
                <h3>我的集合</h3>
                <p>创建、策划和管理独特 NFT 的集合以共享和销售</p>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={this.createCollections.bind(this)}>
                        创建一个集合
                    </Button>
                    {/* <Button variant="outlined" onClick={this.goDr}>
                        导入智能合约
                    </Button> */}
                </Stack>
                <div style={{ minHeight: "600px"}}>
                    {this.state.loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "600px",
                            }}
                        >
                            {/* <LoadingImg src={loadImg} /> */}
                        </Box>
                    ) :!_.isEmpty(this.state.data) ? (
                        <ImageList sx={{ height: "100%" }} cols={ua ? 1 : 4} gap={20}>
                            {this.state.data[this.state.page].map((item) => (
                                <ImageListItem
                                    key={item.img}
                                    sx={{
                                        padding: "10px",
                                        background: "#FFFFFF",
                                        boxShadow: "0px 5px 8px 0px rgba(231, 231, 231, 0.6)",
                                        borderRadius: " 20px",
                                        border: "1px solid #E4E8EB",
                                    }}
                                >
                                    <img
                                        src={apiConfig.productionUrl + item.colImage}
                                        alt={item.colName}
                                        loading="lazy"
                                        onClick={() => {
                                            this.props.history.push("/collection/item?colId=" + item.id);
                                        }}
                                        style={{
                                            height: "200px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <ImageListItemBar
                                        // title={item.title}
                                        subtitle={
                                            <Box>
                                                <Box sx={{ width: "100%", borderBottom: "1px solid #ccc" }} pb={2}>
                                                    <Typography align={"center"} sx={colNameStyle}>
                                                        {item.colName}
                                                    </Typography>
                                                    <Typography align={"center"} sx={{ color: "#8A939B" }}>
                                                        {item.memo}
                                                    </Typography>
                                                </Box>
                                                <ConDiv>
                                                    <Typography align={"center"} sx={{ color: "#8A939B" }}>
                                                        {item.itemNums}项目
                                                    </Typography>
                                                </ConDiv>
                                            </Box>
                                        }
                                        position="below"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    ) : (
						<Box sx={{

    justifyContent: 'center',
    display: "flex",
    marginTop: '200px'

						}}>
                        <LoadingImg src={noDataIMg} />

						</Box>
                    )}
                </div>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        margin: " 20px",
                    }}
                >
                    {!_.isEmpty(this.state.data) && <Pagination count={this.state.count} onChange={this.handleChange} />}
                </Box>
            </Container>
        );
    }
}

export default Collections;

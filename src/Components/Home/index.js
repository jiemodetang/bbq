import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
// import request from "../../utils/index";
import { getHomeList,getI } from "../../service/bbq";
import _ from "lodash";
import { connect } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { apiConfig } from "../../service/mmp";



const ua = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
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
const pageSize = 12;
const Home = ({ colTyple }) => {
    const [itemData, setItemData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [count, setCount] = React.useState(1);

    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    const history = useHistory();
    
    useEffect(() => {
        
        const params = {
            data: {
                colType: colTyple,
            },
        };
        getI(params).then((res) => {
            const data = _.get(res, [ "pageInfo", "list"], []);
            const t = _.get(res, [ "pageInfo", "total"]);
            setCount(Math.ceil(t / pageSize));
            setItemData(_.chunk(data, pageSize));
        });
    }, [colTyple]);
    return (
        <MYContainer maxWidth={"xl"}>
            <ImageList sx={{ height: "100%" }} cols={ua ? 1 : 4} gap={20}>
                {!_.isEmpty(itemData) &&
                    itemData[page].map((item) => (
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
                                src={apiConfig.productionUrl + item.itemImage}
                                // srcSet={`${item.colImage}?w=260&h=260&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.colName}
                                loading="lazy"
                                onClick={() => {
                                    history.push("/collection/detail?id=" + item.id);
                                }}
                            />
                            <ImageListItemBar
                                // title={item.title}
                                subtitle={
                                    <Box>
                                        <Box sx={{ width: "100%", borderBottom: "1px solid #ccc" }} pb={2}>
                                            <Grid container rowSpacing={1} sx={{ margin: "12px 0 " }}>
                                                <Grid item xs={6}>
                                                    <Item1>心脏计划</Item1>
                                                </Grid>
                                                <Grid item xs={6} sx={{ textAlign: "right" }}>
                                                    <Item1>最高出价</Item1>
                                                </Grid>
                                                <Grid item xs={6} sx={{ textAlign: "left" }}>
                                                    <Item2>{item.itemName}</Item2>
                                                </Grid>
                                                <Grid item xs={6} sx={{ textAlign: "right" }}>
                                                    <Item2>{item.itemNums}</Item2>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <ConDiv>
                                            {/* <Stack spacing={1} sx={{width:'40%',margin:'auto'}} > */}
                                            <Button
                                                variant="contained"
                                                sx={{ background: "#56ADBB", borderRadius: "10px" }}
                                                onClick={() => {
                                                    // history.push("/home/sell?id=" + item.id);
                                                    history.push("/collection/detail?id=" + item.id);
                                                }}
                                            >
                                                出售
                                            </Button>
                                            {/* </Stack> */}
                                        </ConDiv>
                                    </Box>
                                }
                                position="below"
                            />
                        </ImageListItem>
                    ))}
            </ImageList>
            <Box
                sx={{
                  display:'flex',
                  justifyContent: 'end',
                  margin:' 20px',
              
                  
                }}
            >
                {!_.isEmpty(itemData) && <Pagination count={count} onChange={handleChange} />}
            </Box>
        </MYContainer>
    );
};

const mapStateToProps = ({ linkReducer }) => {
    return {
        colTyple: linkReducer.colTyple,
    };
};

export default connect(mapStateToProps)(Home);

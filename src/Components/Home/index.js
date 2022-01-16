import React from "react";
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
import Container from '@mui/material/Container';

const ua = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
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
    {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
        author: "@arwinneil",
    },
    {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "Basketball",
        author: "@tjdragotta",
    },
    {
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        title: "Fern",
        author: "@katie_wasserman",
    },
    {
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        title: "Mushrooms",
        author: "@silverdalex",
    },
    {
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Tomato basil",
        author: "@shelleypauls",
    },
    {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Sea star",
        author: "@peterlaster",
    },
    {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
        author: "@southside_customs",
    },
];
const Home = () => {
    const history = useHistory();
    return (
        <MYContainer maxWidth={'xl'}>
            <ImageList sx={{  height: "100%" }} cols={ua?1:4} gap={20}>
                {itemData.map((item) => (
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
                            src={`${item.img}?w=260&h=260&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=260&h=260&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            onClick={() => {
                                history.push("/home/detail");
                            }}
                        />
                        <ImageListItemBar
                            // title={item.title}
                            subtitle={
                                <Box>
                                    <Box sx={{ width: "100%", borderBottom: "1px solid #ccc" }} pb={2}>
                                        <Grid container rowSpacing={1} sx={{margin:'12px 0 '}}>
                                            <Grid item xs={6}>
                                                <Item1>心脏计划</Item1>
                                            </Grid>
                                            <Grid item xs={6} sx={{ textAlign: "right" }}>
                                                <Item1>最高出价</Item1>
                                            </Grid>
                                            <Grid item xs={6} sx={{ textAlign: "left" }}>
                                                <Item2>心脏计划 #223</Item2>
                                            </Grid>
                                            <Grid item xs={6} sx={{ textAlign: "right" }}>
                                                <Item2>0.4052</Item2>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <ConDiv>
                                        {/* <Stack spacing={1} sx={{width:'40%',margin:'auto'}} > */}
                                        <Button variant="contained" sx={{ background: "#56ADBB", borderRadius: "10px" }} onClick={()=>{
                                          history.push('/home/sell')
                                        }}>
                                            出价
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
        </MYContainer>
    );
};

export default Home;

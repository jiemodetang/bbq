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
import jp from "./img/jp.png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Pagination from "@mui/material/Pagination";
import { getCollectionItemList, getMineItem, getAllItem, deleteItem, deleteC, postDetail } from "../../service/bbq";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { apiConfig } from "../../service/mmp";
import { getQueryStringRegExp } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import noDataIMg from "../Img/noData.png";

const LoadingImg = styled.img`
width: 190px;
height: 190px;
`;

const colNameStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: " #333333",
};

const Box1 = styled(Box)`
    display: flex;
`;
const ua = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
const MYContainer = styled.div`
    margin-top: 72px;
    height:100%
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
const Item = ({ collectionId }) => {
	const [itemData, setItemData] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [count, setCount] = React.useState(1);
	const [colData, setColData] = React.useState({});

    const handleChange = (event, value) => {
        setPage(value - 1);
    };
    const history = useHistory();
    React.useEffect(() => {
        const params = {
            data: {
                colId: getQueryStringRegExp("colId"),
            },
        };
        getMineItem(params).then((res) => {
            const data = _.get(res, ["pageInfo", "list"], []);
            const t = _.get(res, ["pageInfo", "total"]);
            setCount(Math.ceil(t / pageSize));
            setItemData(_.chunk(data, pageSize));
        });

        const p = {
            data: {
                id: getQueryStringRegExp("colId"),
            },
        };
        postDetail(p).then((res) => {
            const d = _.get(res, "data", {});
            setColData(_.get(res, "data", {}));
        });
    }, []);
    const d = () => {
        const c = {
            data: {
                id: getQueryStringRegExp("colId"),
            },
        };
        deleteC(c).then((res) => {
            if (res.code == "0000") {
                window._M.success("删除成功");
                history.push("/collections");
            } else {
                window._M.error(res.msg);
            }
        });
    };

    return (
        <MYContainer maxWidth={"lg"}>
            <img src={jp} style={{ width: "100%" }} />
            <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ margin: "40px 0" }}>
                <Box sx={{ display: "flex" }}>
                    <Typography variant={"h4"} align={"center"}>
                        {colData.colName}
                    </Typography>
                    <Fab
                        color="primary"
                        aria-label="edit"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => {
                            history.push("/collection/create?type=col&colId=" + getQueryStringRegExp("colId"));
                        }}
                    >
                        <EditIcon />
                    </Fab>
                    <Fab color="primary" aria-label="add" size="small" onClick={d} sx={{ mr: 1, ml: 1 }}>
                        <DeleteIcon />
                    </Fab>
                    <Fab
                        color="primary"
                        aria-label="add"
                        size="small"
                        onClick={() => {
                            history.push("/collection/create?type=item&colId=" + getQueryStringRegExp("colId"));
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Typography variant={"p"} sx={{ maxWidth: "490px", color: "#8A939B" }}>
                        {colData.memo}
                    </Typography>
                </Box>
            </Stack>
            <Divider light sx={{ marginBottom: "60px" }} />
            <Container maxWidth={'lg'}>
                {
                    _.isEmpty(itemData)?
                    <Box sx={
                        {
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                          height:'100%'
                        }
                    }>
                          <LoadingImg src={noDataIMg} /> 
                    </Box>:

           
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
                                alt={item.colName}
                                loading="lazy"
                                onClick={() => {
                                    history.push("/collection/detail?id=0&isItem=true");
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
                                            {/* <Typography align={"center"}>{item.externalLink}</Typography> */}
                                            <Typography align={"center"} sx={{ color: "#8A939B" }}>
                                                {item.memo}
                                            </Typography>
                                        </Box>
                                        <ConDiv>
                                            <Typography align={"center"}  sx={{ color: "#8A939B" }} >{item.itemNums}项目</Typography>
                                        </ConDiv>
                                        <ConDiv>
                                            {/* <Stack spacing={1} sx={{width:'40%',margin:'auto'}} > */}
                                            <Button
                                                variant="contained"
                                                sx={{ background: "#56ADBB", borderRadius: "10px" }}
                                                onClick={() => {
                                                    // history.push("/home/sell?id=" + item.id);
                                                    history.push("/home/sell?id=" + item.id);
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
           
                 }
                  <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    margin: " 20px",
                }}
            >
                {!_.isEmpty(itemData) && <Pagination count={count} onChange={handleChange} />}
            </Box>
            </Container>
        </MYContainer>
    );
};
export default Item;

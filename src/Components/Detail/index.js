import * as React from "react";
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
import { postDetail ,detailItem} from "../../service/bbq";
import {getQueryStringRegExp} from "../../utils/index";
import _ from "lodash";
import { apiConfig } from "../../service/mmp";


const Container = styled.div`
    margin: 120px 210px 20px 210px;
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

const rows = [
    createData("test", 159, 6.0, 24, 4.0),
    createData("test", 237, 9.0, 37, 4.3),
    createData("test", 262, 16.0, 24, 6.0),
    createData("test", 305, 3.7, 67, 4.3),
    createData("test", 356, 16.0, 49, 3.9),
];
const tableListMMP = [
  '事件','价格','来自','去向','日期'
];
const Detail = () => {
    const [expanded, setExpanded] = React.useState("");
    const [checked, setChecked] = React.useState([]);
    const [data, setData] = React.useState([]);
    
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
        const params = {
            data: {
                id:getQueryStringRegExp('id')
            },
        };
        detailItem(params).then(res=>{
            
            setData(_.get(res,'data',{}))
        })
     
    }, [])
    return (
        <Container>
            <Paper sx={{ p: 20, margin: "auto", maxWidth: 1260, paddingTop: "0px", boxShadow: "none",padding:0 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}>
                         <Img src={apiConfig.productionUrl+ data.itemImage} />
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
                                <Card sx={{ maxWidth: 700, boxShadow: "none" }}>
                                    <TopBox>
                                        <AccessTimeIcon></AccessTimeIcon>
                                        <Box
                                            sx={{
                                                flex: 1,
                                            }}
                                        >
                                            销售于美国中部标准时间2022年6月13日凌晨4:30结束
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
                                                    30
                                                </Box>
                                                <Box>($93,983.40)</Box>
                                            </Grid>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button1 size="small">
                                            {" "}
                                            <ImgGGOGOGO src={qbs} style={{ width: "20px", marginRight: "8px" }} /> 出售
                                        </Button1>
                                        <Button1 size="small">
                                            {" "}
                                            <ImgGGOGOGO src={zs} style={{ width: "20px", marginRight: "8px" }} />
                                            赠送
                                        </Button1>
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
                <Accordion sx={{ marginTop: "10px" }} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>项目活动</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ background: "#FBFDFF", padding: "0" }}>
                        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} sx={{ background: "#FBFDFF", margin: "20px 20px" ,borderRadius: '10px'}}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{background: "#fff",}}>
                                <Typography>筛选</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                        {tableListMMP.map((value,index) => {
                                            const labelId = `checkbox-list-label-${value}`;

                                            return (
                                                <ListItem
                                                    key={value}
                                                    secondaryAction={
                                                        <IconButton edge="end" aria-label="comments">
                                                            <CommentIcon />
                                                        </IconButton>
                                                    }
                                                    key={index}
                                                    disablePadding
                                                >
                                                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                        <ListItemIcon>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={checked.indexOf(value) !== -1}
                                                                tabIndex={-1}
                                                                disableRipple
                                                                inputProps={{ "aria-labelledby": labelId }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText id={labelId} primary={value} />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* table */}
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                      {
                                        tableListMMP.map((item,index)=> <TableCell align={index>0?'right':''} key={index}>{item}</TableCell>)
                                      }
                                      
                                                                  
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: "#FBFDFF" }}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Container>
    );
};

export default Detail;

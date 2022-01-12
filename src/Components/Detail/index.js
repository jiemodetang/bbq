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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const Container = styled.div`
    margin: 120px 210px 20px 210px;
`;
const Img = styled.img`
    margin: 120px 210px 20px 210px;
    width: 100%;
`;
const Button1 =  styled(Button)`
        width: 146px;
        height: 50px;
        background: #56ADBB !important;
        border-radius: 10px;
        font-weight: 400;
        color: #FFFFFF !important;
`;
const TopBox =  styled.div`
                height: 60px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #8A939B;
            line-height: 60px;
            border-bottom:1px solid #E4E8EB;

`
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Detail = () => {
    return (
        <Container>
            <Paper sx={{ p: 20, margin: "auto", maxWidth: 1260,paddingTop:'0px',boxShadow:'none'}}>
                <Grid container spacing={2} >
                    <Grid item>
                        <ButtonBase sx={{ width: 414, height: 414, background: "#fcc" }}>
                            <Img
                                src={
                                    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F1Z9291TIBZ6-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644577609&t=96a23c7896d263e3f44db9c59a71f22b"
                                }
                            />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid sx={{marginLeft:'30px',marginTop:'20px'}}>
                                <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: "#56ADBB", fontSize: "14px" }}>
                                    Standard license
                                </Typography>
                                <Typography variant="body2" gutterBottom sx={{ color: "#333330", fontSize: "30px", mt: 2 }}>
                                    Full resolution 1920x1080 • JPEG
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: 1030114
                                </Typography>
                            </Grid>
                            <Grid  sx={{borderRadius:'20px',border: '1px solid #E4E8EB',height:'auto',padding:'10px',marginLeft:'30px',marginTop:'20px'}}>
                                <Card sx={{ maxWidth: 700,boxShadow:'none' }}>
                                    <TopBox>icon  ::销售于美国中部标准时间2022年6月13日凌晨4:30结束</TopBox>
                                    {/* <CardMedia component="img" alt="green iguana" height="140" image="/static/images/cards/contemplative-reptile.jpg" /> */}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            最低出价
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button1 size="small"  >Share</Button1>
                                        <Button1 size="small">Learn More</Button1>
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
      <Accordion sx={{marginTop:'50px'}} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
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

import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// import Paper from '@mui/material/Paper';
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsIcon from "@mui/icons-material/Directions";
import { connect } from "react-redux";


const Container = styled.div`
    width: 100%;
`;

const Input = styled.input`
    width: 100%;
    color: rgba(14, 14, 14, 0.75);
    height: 41px;
    border-radius: 4px;
    border: 1px solid rgb(229, 232, 235);
    outline: none;
    font-size: 16px;
    padding-left: 40px;
    padding-right: 40px;
`;

const FormContainer = styled.form`
    position: relative;
`;

const IconContainer = styled.div`
    position: absolute;
    left: 10px;
    top: 8px;
    color: rgba(14, 14, 14, 0.75);
`;

const CloseContainer = styled.div`
    position: absolute;
    display: ${({ state }) => (state ? "block" : "none")};
    right: 10px;
    top: 8px;
    color: rgba(14, 14, 14, 0.75);
`;
const SubContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
`;

//FUNCTIONALITY NEEDS TO BE REWORKED BUT FOR NOW THE VISUALS ARE CORRECT
const Form = ({ dispatch }) => {
	const [state, setStateSearch] = useState(false);
	const go = () => {
		dispatch({
			type: "SEARCH",
			payload: state,
		});
	}
	return (
		<Container>
			<FormContainer>
				<label htmlFor="searching" />
				<SubContainer>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400, boxShadow: "none", border: "1px solid #e1e1e1" }}>
									<IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
									<InputBase sx={{ ml: 1, flex: 1 }} placeholder="搜索" inputProps={{ "aria-label": "search google maps" }} onChange={(e) => {
										setStateSearch(e.target.value)
									}} />
									<IconButton sx={{ p: "10px" }} aria-label="search" onClick={
										go
									}>
										<SearchIcon />
									</IconButton>
								</Paper>
							</Grid>
						</Grid>
					</Box>

					<CloseContainer state={state}>{/* <CloseIcon style={{fontSize:'27px'}}/> */}</CloseContainer>
				</SubContainer>
			</FormContainer>
		</Container>
	);
};
const mapStateToProps = ({ linkReducer }) => {
	return {
		colTyple: linkReducer.colTyple,
		search: linkReducer.search
	};
};


export default connect(mapStateToProps)(Form);

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import FilterHdrIcon from "@mui/icons-material/FilterHdr";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import mobileActionCreators from "../../../Redux/ActionCreators/MobileNavActionCreators";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import HLogo from '../../Img/hLogo.png'
const Container = styled.div`
    display: flex;
    align-items: center;
    color: rgba(14, 14, 14, 0.75);
    cursor: pointer;
    @media only screen and (min-width: 1030px) {
      min-width:250px
  }
`;
const IconContainer = styled.div`
    margin: 5px;
    border-radius: 50%;
    border: 3px solid rgb(32, 129, 226);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 7px 9px 7px;
`;
const ArrowContainer = styled.div`
    transition: all 0.3s;
    transform: ${({ state }) => (state ? "rotate(180deg)" : "rotate(0deg)")};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (min-width: 1030px) {
        display: none;
    }
`;

const Text = styled.div`
    font-size: 20px;
    font-weight: 600;
    display: none;
    margin-left: 5px;
    margin-right: 10px;
    @media only screen and (min-width: 1030px) {
        display: block;
    }
`;
const MyLogo = styled.img`
    width: 160px;
    margin-left:20px
`;

const Icon = ({ toggle, show }) => {
    const history = useHistory();
    const goHome = () => {
        history.push("/");
    };

    return (
        <Container onClick={goHome}>
            <MyLogo src={HLogo}></MyLogo>
            {/* <Box >
                <Grid   >
                    <Grid item>
                        <IconContainer>
                            <FilterHdrIcon style={{ fontSize: "30px" }} />
                        </IconContainer>
                    </Grid>
                </Grid>
            </Box>
            <ArrowContainer onClick={() => toggle()} state={show}>
                <KeyboardArrowDownIcon style={{ fontSize: "30px" }} />
            </ArrowContainer>

            <Text>Here my logo</Text> */}
        </Container>
    );
};

const mapDispatchToProps = {
    toggle: mobileActionCreators.show,
};

const mapToState = (state) => {
    return {
        show: state.mobileNavReducer.show,
    };
};

const ConnectedIcon = connect(mapToState, mapDispatchToProps)(Icon);

export default ConnectedIcon;

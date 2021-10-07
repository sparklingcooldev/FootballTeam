import { Box, Button, TableCell, TableRow, TextField, Select, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { GetPlayer } from "../redux/actions/TeamOwnerAction";
import { doLogoutUser } from "../redux/actions/FirstAction";
import MyTable from "../components/MyTable";

const TeamOwner = ({ GetPlayer, doLogoutUser, players, user }) => {
    const history = useHistory()
    const hnames1 = ["No", "FirstName", "LastName", "Team", "Price"];
    useEffect(() => {
        GetPlayer(user.id, 0);
    }, [GetPlayer])
    const rows1 = players.map((data, i) => (
        <TableRow key={data.firstname}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{data.firstname}</TableCell>
            <TableCell >{data.lastname}</TableCell>
            <TableCell>{data.team_id.name === "" ? "Free Market" : data.team_id.name}</TableCell>
            <TableCell>{data.price}$</TableCell>
        </TableRow>
    ));
    return (
        <StyledContainer>
            <Box display='flex' justifyContent='flex-end'>
                <Box component='button' margin='20px' onClick={() => { GetPlayer(user.id, 0) }}>My Team</Box>
                <Box component='button' margin='20px' onClick={() => { GetPlayer(user.id, 1) }}>Other Players</Box>
                <Box component='button' onClick={() => doLogoutUser(history)} margin='20px'>Logout</Box>
            </Box>
            <MyTable headerNames={hnames1} body={rows1} />
        </StyledContainer >
    );

};


const StyledContainer = styled(Box)`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const fromStore = (store) => {
    return {
        players: store.TeamOwnerReducer.players,
        user: store.FirstReducer.user
    }
}

export default connect(fromStore, { GetPlayer, doLogoutUser })(TeamOwner)

import { Box, Button, TableCell, TableRow, TextField } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { doLogoutUser } from '../redux/actions/FirstAction'
import { doGetWholeUser, setUserPermission } from "../redux/actions/AdminAction";
import AdminPlayer from "./AdminPlayer";
import AdminTeamOwner from "./AdminTeamOwner";

const Dashboard = ({ doLogoutUser, doGetWholeUser, setUserPermission, user, users, players }) => {
    const history = useHistory()
    const admin_id = "615d21218bfe5e2d5c13c50b";
    const [tablef, setTableF] = useState(0);
    return (
        <StyledContainer>
            <Box display='flex' justifyContent='flex-end'>
                <Box component='button' margin='20px' onClick={() => { setTableF(0) }}>Players</Box>
                <Box component='button' margin='20px' onClick={() => { setTableF(1) }}>Team Owners</Box>
                <Box component='button' margin='20px' onClick={() => { setTableF(2) }}>League Managers</Box>
                <Box component='button' onClick={() => doLogoutUser(history)} margin='20px'>Logout</Box>
            </Box>
            {tablef === 0 && <AdminPlayer />}
            {tablef === 1 && <AdminTeamOwner />}
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
        user: store.FirstReducer.user,
        users: store.AdminReducer.users,
    }
}

export default connect(fromStore, { doGetWholeUser, doLogoutUser, setUserPermission })(Dashboard)
import { Box } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'
import AdminPlayer from "./AdminPlayer";
import AdminTeamOwner from "./AdminTeamOwner";
import AdminLeagueManager from "./AdminLeagueManager";
import { connect } from 'react-redux'
import { doLogoutUser } from "../redux/actions/FirstAction";

const AdminDashboard = ({ doLogoutUser, players }) => {
    const history = useHistory()
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
            {tablef === 2 && <AdminLeagueManager />}
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

export default connect(fromStore, { doLogoutUser })(AdminDashboard)
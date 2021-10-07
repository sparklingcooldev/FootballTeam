import { Box, Button, TableCell, TableRow, TextField, Select, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { AddTeam, DeleteTeam, UpdateTeam, GetTeam } from "../redux/actions/LeagueManagerAction";
import { doLogoutUser } from "../redux/actions/FirstAction";
import MyTable from "../components/MyTable";

const AdminLeagueOwner = ({ AddTeam, DeleteTeam, UpdateTeam, GetTeam, doLogoutUser, teams, refresh, user }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [curdata, setCurData] = useState();
    const history = useHistory()
    useEffect(() => {
        if (refresh) {
            GetTeam(user.id);
        }
    }, [refresh])
    const hnames1 = ["No", "Name", "Operation"];
    const rows1 = teams.map((data, i) => (
        <TableRow key={data.name} onClick={() => { setCurData(data._id); setUserName(data.name) }}>
            <TableCell>{i + 1}</TableCell>
            <TableCell >{data.name}</TableCell>
            <TableCell>
                <Button color='primary' variant="contained" className='text-center' onClick={() => { DeleteTeam(data._id); }}>
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    ));
    return (
        <StyledContainer>
            <Box display='flex' justifyContent='flex-end'>
                <Box component='button' onClick={() => doLogoutUser(history)} margin='20px'>Logout</Box>
            </Box>
            <Box style={{ margin: "auto" }}>

                <Box><TextField type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" /></Box>
                <Box><TextField type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></Box>
                <Box><TextField type="password" onChange={(e) => setPassword1(e.target.value)} placeholder="Confirm Password" /></Box><br />
                <Button color='secondary' variant="contained" className='text-center' onClick={() => {
                    if (!password || !password1 || password !== password1) {
                        alert("correct password");
                        return;
                    }
                    AddTeam(username, password, user.id);
                }}>
                    Add
                </Button>&nbsp;&nbsp;
                <Button color='secondary' variant="contained" className='text-center' onClick={() => { UpdateTeam(curdata, username) }}>
                    Update
                </Button>
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
        teams: store.LeagueManagerReducer.teams,
        refresh: store.LeagueManagerReducer.refresh,
        user: store.FirstReducer.user
    }
}

export default connect(fromStore, { AddTeam, DeleteTeam, UpdateTeam, GetTeam, doLogoutUser })(AdminLeagueOwner)
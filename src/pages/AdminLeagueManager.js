import { Box, Button, TableCell, TableRow, TextField, Select, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { AddLeague, DeleteLeague, UpdateLeague, doGetWholeLeague } from "../redux/actions/AdminAction";
import MyTable from "../components/MyTable";

const AdminLeagueOwner = ({ doGetWholeLeague, UpdateLeague, AddLeague, DeleteLeague, leagues, refresh }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [curdata, setCurData] = useState();
    useEffect(() => {
        if (refresh) {
            doGetWholeLeague();
        }
    }, [refresh])
    const hnames1 = ["No", "Name", "Operation"];
    const rows1 = leagues.map((data, i) => (
        <TableRow key={data.name} onClick={() => { setCurData(data._id); setUserName(data.name) }}>
            <TableCell>{i + 1}</TableCell>
            <TableCell >{data.name}</TableCell>
            <TableCell>
                <Button color='primary' variant="contained" className='text-center' onClick={() => { DeleteLeague(data._id); }}>
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    ));
    return (
        <StyledContainer>
            <Box style={{ margin: "auto" }}>
                <Box><TextField type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" /></Box>
                <Box><TextField type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></Box>
                <Box><TextField type="password" onChange={(e) => setPassword1(e.target.value)} placeholder="Confirm Password" /></Box><br />
                <Button color='secondary' variant="contained" className='text-center' onClick={() => {
                    if (!password || !password1 || password !== password1) {
                        alert("correct password");
                        return;
                    }
                    AddLeague(username, password);
                }}>
                    Add
                </Button>&nbsp;&nbsp;
                <Button color='secondary' variant="contained" className='text-center' onClick={() => { UpdateLeague(curdata, username) }}>
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
        Leagues: store.AdminReducer.Leagues,
        leagues: store.AdminReducer.leagues,
        refresh: store.AdminReducer.refresh,
    }
}

export default connect(fromStore, { AddLeague, DeleteLeague, UpdateLeague, doGetWholeLeague })(AdminLeagueOwner)
import { Box, Button, TableCell, TableRow, TextField, Select, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { AddTeam, DeleteTeam, doGetWholeTeam, doGetWholeLeague, ChangeTeamLeague } from "../redux/actions/AdminAction";
import MyTable from "../components/MyTable";

const AdminPlayer = ({ doGetWholeTeam, doGetWholeLeague, AddTeam, DeleteTeam, ChangeTeamLeague, teams, leagues }) => {
    const [getdata, setGetData] = useState(0);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    useEffect(() => {
        doGetWholeTeam();
        doGetWholeLeague();
        setGetData(0);
    }, [getdata]);
    console.log(teams);
    const hnames1 = ["No", "Name", "League", "Operation"];
    const rows1 = teams.map((data, i) => (
        <TableRow key={data.name}>
            <TableCell>{i + 1}</TableCell>
            <TableCell >{data.name}</TableCell>
            <TableCell>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={data.parent_id._id}
                    onChange={(event) => { ChangeTeamLeague(data._id, event.target.value); setGetData(1) }}
                >
                    <MenuItem value="615d21218bfe5e2d5c13c50b">
                        <em>None</em>
                    </MenuItem>
                    {
                        leagues.map(data => {
                            return <MenuItem value={data._id}>{data.name}</MenuItem>
                        })
                    }
                </Select>
            </TableCell>
            <TableCell>
                <Button color='primary' variant="contained" className='text-center' onClick={() => { DeleteTeam(data._id); setGetData(1) }}>
                    Upgrade LM
                </Button>&nbsp;
                <Button color='primary' variant="contained" className='text-center' onClick={() => { DeleteTeam(data._id); setGetData(1) }}>
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    ));
    return (
        <StyledContainer>
            <Box style={{ margin: "auto" }}>
                <Box><TextField type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Username" /></Box>
                <Box><TextField type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></Box>
                <Box><TextField type="password" onChange={(e) => setPassword1(e.target.value)} placeholder="Confirm Password" /></Box><br />
                <Button color='secondary' variant="contained" className='text-center' onClick={() => {
                    if (password !== password1) {
                        alert("correct password");
                        return;
                    }
                    AddTeam(username, password); setGetData(1)
                }}>
                    Add
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
        teams: store.AdminReducer.teams,
        leagues: store.AdminReducer.leagues
    }
}

export default connect(fromStore, { AddTeam, DeleteTeam, doGetWholeTeam, doGetWholeLeague, ChangeTeamLeague })(AdminPlayer)


// <TableCell align="right">
//                 <Button color={data.permission ? 'primary' : 'secondary'} variant="contained" className='text-center' onClick={() => {
//                     setUserPermission(data.id, !data.permission);
//                     setGetData(1);
//                 }}>
//                     {data.permission ? "Block" : "Allow"}
//                 </Button>
//             </TableCell>
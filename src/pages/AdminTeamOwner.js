import { Box, Button, TableCell, TableRow, TextField, Select, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { AddTeam, DeleteTeam, doGetWholeTeam, doGetWholeLeague, UpdateTeam, ChangeTeamLeague, UpgradeLeague } from "../redux/actions/AdminAction";
import MyTable from "../components/MyTable";

const AdminTeamOwner = ({ doGetWholeTeam, doGetWholeLeague, AddTeam, DeleteTeam, UpdateTeam, ChangeTeamLeague, UpgradeLeague, teams, leagues, refresh }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [money, setMoney] = useState("0");
    const [curdata, setCurData] = useState();
    useEffect(() => {
        if (refresh) {
            doGetWholeTeam();
            doGetWholeLeague();
        }
    }, [refresh])
    console.log(teams);
    const hnames1 = ["No", "Name", "League", "money", "Operation"];
    const rows1 = teams.map((data, i) => (
        <TableRow key={data.name} onClick={() => { setCurData(data._id); setUserName(data.name);setMoney(data.money) }}>
            <TableCell>{i + 1}</TableCell>
            <TableCell >{data.name}</TableCell>
            <TableCell>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={data.parent_id._id}
                    onChange={(event) => { ChangeTeamLeague(data._id, event.target.value) }}
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
            <TableCell >{data.money}</TableCell>
            <TableCell>
                <Button color='primary' variant="contained" className='text-center' onClick={() => { UpgradeLeague(data._id) }}>
                    Upgrade LM
                </Button>&nbsp;
                <Button color='primary' variant="contained" className='text-center' onClick={() => { DeleteTeam(data._id); }}>
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    ));
    return (
        <StyledContainer>
            <Box style={{ margin: "auto" }}>
                <Box><TextField type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" /></Box>
                <Box><TextField type="text" value={money} onChange={(e) => setMoney(e.target.value)} placeholder="Username" /></Box>
                <Box><TextField type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></Box>
                <Box><TextField type="password" onChange={(e) => setPassword1(e.target.value)} placeholder="Confirm Password" /></Box><br />
                <Button color='secondary' variant="contained" className='text-center' onClick={() => {
                    if (!password || !password1 || password !== password1) {
                        alert("correct password");
                        return;
                    }
                    AddTeam(username, password, money);
                }}>
                    Add
                </Button>&nbsp;&nbsp;
                <Button color='secondary' variant="contained" className='text-center' onClick={() => { UpdateTeam(curdata, username, money) }}>
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
        teams: store.AdminReducer.teams,
        leagues: store.AdminReducer.leagues,
        refresh: store.AdminReducer.refresh,
    }
}

export default connect(fromStore, { AddTeam, DeleteTeam, doGetWholeTeam, UpdateTeam, doGetWholeLeague, ChangeTeamLeague, UpgradeLeague })(AdminTeamOwner)
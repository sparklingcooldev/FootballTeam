import { Box, Button, TableCell, TableRow, TextField, Select, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { AddPlayer, DeletePlayer, doGetWholePlayer, doGetWholeTeam, ChangePlayerTeam } from "../redux/actions/AdminAction";
import MyTable from "../components/MyTable";

const AdminPlayer = ({ doGetWholePlayer, AddPlayer, DeletePlayer, doGetWholeTeam, ChangePlayerTeam, players, teams }) => {
    const [getdata, setGetData] = useState();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    useEffect(() => {
        doGetWholePlayer();
        doGetWholeTeam();
        setGetData(0);
    }, [getdata]);
    const hnames1 = ["No", "FirstName", "LastName", "Team", "Operation"];
    const rows1 = players.map((data, i) => (
        <TableRow key={data.firstname}>
            <TableCell>{i + 1}</TableCell>
            <TableCell >{data.firstname}</TableCell>
            <TableCell >{data.lastname}</TableCell>
            <TableCell>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={data.team_id._id}
                    onChange={(event) => { ChangePlayerTeam(data._id, event.target.value); setGetData(1) }}
                >
                    <MenuItem value="615d21218bfe5e2d5c13c50b">
                        <em>None</em>
                    </MenuItem>
                    {
                        teams && teams.map(data => {
                            return <MenuItem value={data._id}>{data.name}</MenuItem>
                        })
                    }
                </Select>
            </TableCell>
            <TableCell><Button color='primary' variant="contained" className='text-center' onClick={() => { DeletePlayer(data._id); setGetData(1) }}>
                Remove
            </Button></TableCell>
        </TableRow>
    ));
    return (
        <StyledContainer>
            <Box style={{ margin: "auto" }}>
                <Box><TextField type="text" onChange={(e) => setFirstName(e.target.value)} /></Box>
                <Box><TextField type="text" onChange={(e) => setLastName(e.target.value)} /></Box><br />
                <Button color='secondary' variant="contained" className='text-center' onClick={() => { AddPlayer(firstname, lastname); setGetData(1) }}>
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
        players: store.AdminReducer.players,
        teams: store.AdminReducer.teams
    }
}

export default connect(fromStore, { doGetWholePlayer, AddPlayer, DeletePlayer, doGetWholeTeam, ChangePlayerTeam })(AdminPlayer)


// <TableCell align="right">
//                 <Button color={data.permission ? 'primary' : 'secondary'} variant="contained" className='text-center' onClick={() => {
//                     setUserPermission(data.id, !data.permission);
//                     setGetData(1);
//                 }}>
//                     {data.permission ? "Block" : "Allow"}
//                 </Button>
//             </TableCell>
import { Box, Button, TableCell, TableRow, TextField, Select, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { AddPlayer, DeletePlayer, UpdatePlayer, doGetWholePlayer, doGetWholeTeam, ChangePlayerTeam, doGetWholeLeague } from "../redux/actions/AdminAction";
import MyTable from "../components/MyTable";

const AdminPlayer = ({ doGetWholePlayer, doGetWholeLeague, UpdatePlayer, AddPlayer, DeletePlayer, doGetWholeTeam, ChangePlayerTeam, players, teams, refresh }) => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [age, setAge] = useState(0);
    const [price, setPrice] = useState(0);
    const [curdata, setCurData] = useState();
    useEffect(() => {
        if (refresh) {
            doGetWholePlayer();
            doGetWholeTeam();
            doGetWholeLeague();
        }
    }, [refresh]);
    const hnames1 = ["No", "FirstName", "LastName", "Country", "Age", "Team", "Price", "Operation"];
    const rows1 = players.map((data, i) => (
        <TableRow key={data.firstname} onClick={() => { setCurData(data._id); setFirstName(data.firstname); setLastName(data.lastname); setCountry(data.country); setAge(data.age); setPrice(data.price) }}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{data.firstname}</TableCell>
            <TableCell >{data.lastname}</TableCell>
            <TableCell >{data.country}</TableCell>
            <TableCell >{data.age}</TableCell>
            <TableCell>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={data.team_id._id}
                    onChange={(event) => { ChangePlayerTeam(data._id, event.target.value) }}
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
            <TableCell>{data.price}$</TableCell>
            <TableCell><Button color='primary' variant="contained" className='text-center' onClick={() => { DeletePlayer(data._id); }}>
                Remove
            </Button></TableCell>
        </TableRow>
    ));
    return (
        <StyledContainer>
            <Box style={{ margin: "auto" }}>
                <Box><TextField type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="firstname" /></Box>
                <Box><TextField type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="lastname" /></Box>
                <Box><TextField type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" /></Box><br />
                <Box><TextField type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" /></Box><br />
                <Box><TextField type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />$</Box><br />
                <Button color='secondary' variant="contained" className='text-center' onClick={() => { AddPlayer(firstname, lastname, country, age, price) }}>
                    Add
                </Button> &nbsp;&nbsp;
                <Button color='secondary' variant="contained" className='text-center' onClick={() => { UpdatePlayer(curdata, firstname, lastname, country, age, price) }}>
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
        players: store.AdminReducer.players,
        teams: store.AdminReducer.teams,
        refresh: store.AdminReducer.refresh
    }
}

export default connect(fromStore, { doGetWholePlayer, AddPlayer, UpdatePlayer, DeletePlayer, doGetWholeLeague, doGetWholeTeam, ChangePlayerTeam })(AdminPlayer)


// <TableCell align="right">
//                 <Button color={data.permission ? 'primary' : 'secondary'} variant="contained" className='text-center' onClick={() => {
//                     setUserPermission(data.id, !data.permission);
//                     setGetData(1);
//                 }}>
//                     {data.permission ? "Block" : "Allow"}
//                 </Button>
//             </TableCell>
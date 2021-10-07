import { Box, Button, TableCell, TableRow, TextField, Select, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import styled from "styled-components"
import { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { GetPlayer, GetOfferCnt, UpdatePlayer, GetUser, ChangeStatus, OfferPlayer, StopOffer, AcceptTerm } from "../redux/actions/TeamOwnerAction";
import { doLogoutUser } from "../redux/actions/FirstAction";
import MyTable from "../components/MyTable";

const TeamOwner = ({ GetPlayer, GetOfferCnt, GetUser, doLogoutUser, UpdatePlayer, ChangeStatus, OfferPlayer, AcceptTerm, StopOffer, players, user, tuser, refresh, offercnt }) => {
    const [tablef, setTableF] = useState(0);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [age, setAge] = useState(0);
    const [price, setPrice] = useState(0);
    const [sellmoney, setSellMoney] = useState(0);
    const [curdata, setCurData] = useState();
    const [criteria, setCriteria] = useState("");
    const history = useHistory();
    useEffect(() => {
        GetUser(user.id);
        GetPlayer(user.id, 0);
        GetOfferCnt(user.id);
    }, [GetPlayer])
    useEffect(() => {
        if (refresh) {
            GetUser(user.id);
            GetPlayer(user.id, tablef, criteria);
            GetOfferCnt(user.id);
        }
    }, [refresh]);
    console.log(tuser);
    const hnames1 = ["No", "FirstName", "LastName", "Country", "Age", "Price", "Team", "SellMoney"];
    if (tablef === 2) {
        hnames1[6] = "Offered Team";
    }
    const rows2 = players.map((data, i) => {
        if (!(data.offered && data.offered.length)) return "";
        return data.offered.map((d, i) => {
            return <TableRow key={d.name}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{data.firstname}</TableCell>
                <TableCell >{data.lastname}</TableCell>
                <TableCell >{data.country}</TableCell>
                <TableCell >{data.age}</TableCell>
                <TableCell>{data.price}$</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{data.sellmoney}$</TableCell>
                <TableCell>
                    <Button color='secondary' variant="contained" className='text-center' onClick={() => { setCurData(data); AcceptTerm(data._id, d._id, user.id) }}>
                        Accept
                    </Button>
                </TableCell>
            </TableRow>
        })
    })
    const rows1 = players.map((data, i) => {
        let flag = 0;
        data.offered.map(d => {
            if (d._id === user.id) flag = 1;
        })
        return (<TableRow key={data.firstname} onClick={() => { setCurData(data); setFirstName(data.firstname); setLastName(data.lastname); setCountry(data.country); setAge(data.age); setPrice(data.price); setSellMoney(data.sellmoney) }}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{data.firstname}</TableCell>
            <TableCell >{data.lastname}</TableCell>
            <TableCell >{data.country}</TableCell>
            <TableCell >{data.age}</TableCell>
            <TableCell>{data.price}$</TableCell>
            <TableCell>{data.team_id.name}</TableCell>
            <TableCell>{data.sellmoney}$</TableCell>
            {tablef === 0 && <TableCell>
                {data.status === "team" && <Button color='primary' variant="contained" className='text-center' onClick={() => { setCurData(data); ChangeStatus(data._id, "market") }}>
                    Add to Market
                </Button>}
                {data.status === "market" && <Button color='secondary' variant="contained" className='text-center' onClick={() => { setCurData(data); ChangeStatus(data._id, "team") }}>
                    Delete from Market
                </Button>}
            </TableCell>
            }
            {tablef === 1 && !flag &&
                <TableCell>
                    <Button color='secondary' variant="contained" className='text-center' onClick={() => {
                        setCurData(data);
                        if (tuser.money < data.sellmoney) {
                            alert("No Money");
                            return;
                        } OfferPlayer(data._id, user.id)
                    }}>
                        Offer
                    </Button>
                </TableCell>
            }
            {tablef === 1 && flag &&
                <TableCell>
                    <Button color='primary' variant="contained" className='text-center' onClick={() => { setCurData(data); StopOffer(data._id, user.id) }}>
                        Stop
                    </Button>
                </TableCell>
            }
        </TableRow>)
    });
    return (
        <StyledContainer>
            <Box display='flex' justifyContent='flex-end'>
                <Box margin='20px'>{tuser && tuser.name}</Box>
                <Box margin='20px'>{tuser && tuser.country}</Box>
                <Box margin='20px'>{tuser && tuser.money}$</Box>
                <Box component='button' margin='20px' onClick={() => { GetPlayer(user.id, 0); setTableF(0) }}>My Team</Box>
                <Box component='button' margin='20px' onClick={() => { GetPlayer(user.id, 1); setTableF(1) }}>Market</Box>
                <Box component='button' margin='20px' onClick={() => { GetPlayer(user.id, 2); setTableF(2) }}>Offered({offercnt})</Box>
                <Box component='button' onClick={() => doLogoutUser(history)} margin='20px'>Logout</Box>
            </Box>
            {tablef === 0 && <Box style={{ margin: "auto" }}>
                <Box><TextField type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="firstname" />&nbsp;
                    <TextField type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="lastname" />&nbsp;
                    <TextField type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" /></Box><br />
                <Box>Age:&nbsp;<TextField disabled style={{ width: "100px" }} type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />&nbsp;
                    Price:&nbsp;<TextField disabled type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                    SellMoney:&nbsp;<TextField type="number" value={sellmoney} onChange={(e) => setSellMoney(e.target.value)} placeholder="Price" /></Box><br />
                <Button color='secondary' variant="contained" className='text-center' onClick={() => { UpdatePlayer(curdata, firstname, lastname, country, sellmoney) }}>
                    Update
                </Button>
            </Box>}
            {tablef === 0 && <MyTable headerNames={hnames1} body={rows1} />}
            {tablef === 1 &&
                <Box >
                    <TextField type="text" style={{ paddingLeft: "30%" }} placeholder="Search" onChange = {(event)=>{setCriteria(event.target.value)}}/>
                    <Button color='primary' variant="contained" className='text-center' onClick={() => { GetPlayer(user.id, tablef, criteria); }}>
                        Search
                    </Button>
                    <MyTable headerNames={hnames1} body={rows1} />
                </Box>}
            {tablef === 2 && <MyTable headerNames={hnames1} body={rows2} />}
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
        user: store.FirstReducer.user,
        tuser: store.TeamOwnerReducer.user,
        refresh: store.TeamOwnerReducer.refresh,
        offercnt: store.TeamOwnerReducer.offercnt
    }
}

export default connect(fromStore, { GetPlayer, GetUser, GetOfferCnt, doLogoutUser, UpdatePlayer, AcceptTerm, ChangeStatus, OfferPlayer, StopOffer })(TeamOwner)

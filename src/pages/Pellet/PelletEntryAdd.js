import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Box, Button } from '@material-ui/core'
import styled from 'styled-components'
import jwtDecode from 'jwt-decode'

import { doGetWholePellet, doGetWholePelletTypes } from '../../redux/actions/PelletAction'

const PelletEntryAdd = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const pellets = useSelector(state => state.PelletReducer.pellets);
    const pelletTypes = useSelector(state => state.PelletReducer.pelletTypes);

    const user = jwtDecode(localStorage.getItem('jwtToken'))
    let uniqueIndex = -1

    const [info, setInfo] = useState(['', '', ''])

    const [quantity, setQuantity] = useState([])
    const [lotSharp, setLotSharp] = useState([])
    const [expDates, setExpDates] = useState([])

    const [validFlags, setValidFlags] = useState({
        verify: [false, false, false],
        pellet: {
            qty: [],
            lot: [],
            exp: [],
        },
    })

    useEffect(() => {
    })

    useEffect(() => {
        dispatch(doGetWholePellet())
        dispatch(doGetWholePelletTypes())
    }, [doGetWholePellet, doGetWholePelletTypes])

    useEffect(() => {
        let tmp = { ...validFlags }
        tmp.pellet.qty = Array(pellets.length).fill(false)
        tmp.pellet.lot = Array(pellets.length).fill(false)
        tmp.pellet.exp = Array(pellets.length).fill(false)
        setValidFlags(tmp)

        let tmpQuantity = [...quantity]
        tmpQuantity = Array(pellets.length).fill('')
        setQuantity(tmpQuantity)

        let tmpLotSharp = [...lotSharp]
        tmpLotSharp = Array(pellets.length).fill('')
        setLotSharp(tmpLotSharp)

        let tmpExpDates = [...expDates]
        tmpExpDates = Array(pellets.length).fill('')
        setExpDates(tmpExpDates)
    }, [pelletTypes])

    const handleQtyInput = (e) => {
        let tmpQuantity = [...quantity]
        tmpQuantity[parseInt(e.target.className)] = e.target.value
        setQuantity(tmpQuantity)

        let tmp = { ...validFlags }
        if (e.target.value !== '') tmp.pellet.qty[parseInt(e.target.className)] = true
        else tmp.pellet.qty[parseInt(e.target.className)] = false
        setValidFlags(tmp)
    }

    const handleLotInput = (e) => {
        const classList = e.target.className.split(' ')
        let tmpLotSharp = [...lotSharp]
        tmpLotSharp[parseInt(classList.at(-1))] = e.target.value
        setLotSharp(tmpLotSharp)

        let tmp = { ...validFlags }
        if (e.target.value !== '') tmp.pellet.lot[parseInt(classList.at(-1))] = true
        else tmp.pellet.lot[parseInt(classList.at(-1))] = false
        setValidFlags(tmp)
    }

    const handleExpDates = (e) => {
        const classList = e.target.className.split(' ')
        let tmpExpDates = [...expDates]
        tmpExpDates[parseInt(classList.at(-1))] = e.target.value
        setExpDates(tmpExpDates)

        let tmp = { ...validFlags }
        if (e.target.value !== '') tmp.pellet.exp[parseInt(classList.at(-1))] = true
        else tmp.pellet.exp[parseInt(classList.at(-1))] = false
        setValidFlags(tmp)
    }

    return (
        <StyledContainer>
            <Box fontSize='20px' fontWeight='600'>Pellet Receipt Data Entry</Box>
            <Box>
                <Box display='flex' alignItems='center'>
                    <Box width='230px'>Date: (MM/DD/YYYY)</Box>
                    <Box component='input' fontSize='14px' width='300px'
                        value={info[0]} onChange={(e) => {
                            let tmp = [...info]
                            tmp[0] = e.target.value
                            setInfo(tmp)

                            let tmpCert = { ...validFlags }
                            if (e.target.value !== '') tmpCert.verify[0] = true
                            else tmpCert.verify[0] = false
                            setValidFlags(tmpCert)
                        }}
                    />
                </Box>
                <Box display='flex' alignItems='center' mt='15px'>
                    <Box width='230px'>Receipt Inv #:</Box>
                    <Box component='input' fontSize='14px' width='300px'
                        value={info[1]} onChange={(e) => {
                            let tmp = [...info]
                            tmp[1] = e.target.value
                            setInfo(tmp)

                            let tmpCert = { ...validFlags }
                            if (e.target.value !== '') tmpCert.verify[1] = true
                            else tmpCert.verify[1] = false
                            setValidFlags(tmpCert)
                        }}
                    />
                </Box>
                <Box display='flex' alignItems='center' mt='15px'>
                    <Box width='230px'>Receipt Verified By: (Name)</Box>
                    <Box component='input' fontSize='14px' width='300px'
                        value={info[2]} onChange={(e) => {
                            let tmp = [...info]
                            tmp[2] = e.target.value
                            setInfo(tmp)

                            let tmpCert = { ...validFlags }
                            if (e.target.value !== '') tmpCert.verify[2] = true
                            else tmpCert.verify[2] = false
                            setValidFlags(tmpCert)
                        }}
                    />
                </Box>
            </Box>
            {pelletTypes.map((each, parentIndex) =>
                <Box key={parentIndex} mt='30px'>
                    <Box display='flex' flexWrap='wrap'>
                        <Box flex='1' fontSize='20px' fontWeight='600'>{each[0].pellet_info[0].name} / Dose :</Box>
                        <Box flex='1' ml='50px' fontSize='20px' fontWeight='600'>Lot # :</Box>
                        <Box flex='1' ml='50px' fontSize='20px' fontWeight='600'>Exp Date :</Box>
                    </Box>
                    <EstradiolInputs>
                        {each.map((eac, childIndex) => {
                            uniqueIndex++
                            return <Box key={uniqueIndex} display='flex' flexWrap='wrap'>
                                <Box flex='1' display='flex' justifyContent='flex-start' alignItems='center'>
                                    <Box width='100px'>{eac.dosage} mg</Box>
                                    <input type='text' className={`${uniqueIndex}`} value={quantity[uniqueIndex]} onChange={handleQtyInput} />
                                    <Box ml='20px'>Qty</Box>
                                </Box>
                                <Box flex='1' ml='50px' component='input' className={`${uniqueIndex}`} value={lotSharp[uniqueIndex]} onChange={handleLotInput} />
                                <Box flex='1' ml='50px' component='input' {...{ type: 'date' }} className={`${uniqueIndex}`} value={expDates[uniqueIndex]} onChange={handleExpDates} />
                            </Box>
                        }
                        )}
                    </EstradiolInputs>
                </Box>
            )}
            <Action mt='30px'>
                <MyButton variant='contained' color='primary' disabled={
                    validFlags.verify.some(e => e === false) ||
                    validFlags.pellet.qty.some(e => e === false) ||
                    validFlags.pellet.lot.some(e => e === false) ||
                    validFlags.pellet.exp.some(e => e === false)
                }>Continue - Recpt Enter</MyButton>
                <MyButton variant='contained' color='secondary' onClick={() => history.goBack()}>Cancel</MyButton>
            </Action>
        </StyledContainer >
    );
}

const Action = styled(Box)`
    >button+button {
        margin-left: 30px;
    }
`

const MyButton = styled(Button)`
    text-transform: none !important;
`

const EstradiolInputs = styled(Box)`
    >div+div {
        margin-top: 15px;
    }
`

const StyledContainer = styled(Box)`
    padding: 20px;
`

export default PelletEntryAdd
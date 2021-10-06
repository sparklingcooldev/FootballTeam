import React from 'react';
import { Box, Table, TableBody, Paper, TableHead, TableCell, TableRow, TableContainer, Button } from "@material-ui/core";
import styled from "styled-components"

const MyTable = ({children, headerNames, body }) => {
    const StyledTableContainer = styled(TableContainer)`
    margin : auto;
    width : 75%!important;
`
    return (
        <StyledTableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {headerNames.map(data => {
                            return <TableCell>{data}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body}
                </TableBody>
            </Table>
        </StyledTableContainer>

    );
}
export default MyTable;
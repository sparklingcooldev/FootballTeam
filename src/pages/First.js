import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'

const First = () => {
    const history = useHistory()
    
    return (
        <Grid container justifyContent='center' className='mt-3'>
            <Grid item>
                <Button color='primary' variant="contained" className='text-center' onClick={() => history.push('/login')}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default First;
import { useEffect, useState } from 'react'
import { Box, Button, TextField, CardContent, CardActions, Card, Avatar } from "@material-ui/core"
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import * as Actions from '../redux/actions/FirstAction'

import DashPNG from '../assets/images/Dash.jpg'
import SocialButton from "../components/SocialButton";

const LoginPg = ({ doGetWholeData, doRegisterUser, doLoginUser, doBlockUser, id, failedCount }) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    useEffect(() => {
        doGetWholeData();
    })

    useEffect(() => {
        if (failedCount === 3) {
            alert("You inputed wrong password 3 more times. User Blocked");
            doBlockUser(username);
        }
    }, [failedCount])

    const handleRegUser = () => {
        var formData = {
            username: username,
            password: password
        }
        doRegisterUser(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = {
            username: username,
            password: password,
        };
        doLoginUser(formData, history)
    }
    const handleSocialLogin = (user) => {
        console.log(user);
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };
    return (
        <StyledContainer padding='12%'>
            <LoginCard>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Box mt={4} display='flex' flexDirection='column' alignItems='center'>
                            <UAvatar src={DashPNG} />
                            <Box>
                                <TextField
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text"
                                />
                            </Box>
                            <Box>
                                <TextField
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                />
                            </Box>
                            {/* <SocialButton
                                provider="facebook"
                                appId="YOUR_APP_ID"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                            >
                                Login with Facebook
                            </SocialButton> */}
                        </Box>
                    </CardContent>
                    <CardActions align="right">
                        <Button type='submit' style={{ marginLeft: 'auto' }} size='small' color='primary' variant="contained">Login</Button>
                        <Button onClick={handleRegUser.bind(this)} style={{ marginRight: 'auto' }} size='small' color='secondary' variant="contained">Register</Button>
                    </CardActions>
                </form>
            </LoginCard>
        </StyledContainer>
    );
}

const UAvatar = styled(Avatar)`
    width: 70px !important;
    height: 70px !important;
    border: 2px solid lightgrey;
    box-shadow: 1px 1px 1px 1px solid red;
    margin-bottom: 20px;
`

const LoginCard = styled(Card)`
    margin-top: 0px;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
`

const StyledContainer = styled(Box)``

const fromStore = (store) => {
    return {
        id: store.FirstReducer.id,
        failedCount: store.FirstReducer.failedCount
    }
}

LoginPg.propTypes = {
}

export default connect(fromStore, Actions)(LoginPg)
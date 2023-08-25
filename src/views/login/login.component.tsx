import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export interface ExternalActionProps {
    login: (data: { username: string, password: string, grant_type: string }) => void;
}

export interface ExternalProps {
    loginAttemptFailed: boolean,
    isLoggedIn: boolean
}

const EmptyError = {
    userName: {
        isError: false,
        text: "",
    },
    password: {
        isError: false,
        text: "",
    }
};

export function LoginPage(props: ExternalActionProps & ExternalProps) {
    const { loginAttemptFailed, isLoggedIn, login } = props;
    const [error, setError] = useState<any>(EmptyError);

    if (isLoggedIn) {
        window.location.href = process.env.REACT_APP_BASE_HREF || '/bosch-aic';
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let userName = data.get('userName')?.toString();
        let password = data.get('password')?.toString();
        let errorNew: any = {};
        let isInvalid = false;

        if (!userName || userName.trim().length === 0) {
            errorNew.userName = {
                isError: true,
                text: 'User name is mandatory'
            }

            isInvalid = true;
        }

        if (!password || password.trim().length === 0) {
            errorNew.password = {
                isError: true,
                text: 'Password is mandatory'
            }

            isInvalid = true;
        }

        setError(errorNew);

        if (!isInvalid) {
            login({ username: userName as string, password: password as string, grant_type: 'password'});
        }
    };

    return (
        <React.Fragment>
            <div style={{backgroundImage: 'url(../../assets/login_background.png)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundSize: '100% auto'}}>
                <Grid>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Paper elevation={10} sx={{ padding: '1rem' }}>
                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="userName"
                                            label="Username"
                                            name="userName"
                                            autoComplete="userName"
                                            autoFocus
                                            error={error != null && error.userName && error.userName.isError}
                                            helperText={error != null && error.userName && error.userName.isError && error.userName.text}
                                            onChange={e => {
                                                setError({
                                                    userName: {
                                                        isError: false,
                                                        text: ""
                                                    },
                                                    password: error.password
                                                });
                                            }}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            error={error != null && error.password && error.password.isError}
                                            helperText={error != null && error.password && error.password.isError && error.password.text}
                                            onChange={e => {
                                                setError({
                                                    userName: error.userName,
                                                    password: {
                                                        isError: false,
                                                        text: ""
                                                    }
                                                });
                                            }}
                                        />
                                        {loginAttemptFailed && (
                                            <p style={{ color: '#d32f2f', marginBottom: 0 }}>Invalid credentials</p>
                                        )}
                                        <div style={{textAlign: 'center'}}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2, background: '#202342' }}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </Box>
                                </Paper>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Grid>
            </div>
        </React.Fragment >
    );
}

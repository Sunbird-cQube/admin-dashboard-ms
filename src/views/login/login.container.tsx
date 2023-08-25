
import { connect } from 'react-redux';
import { LoginPage } from './login.component';
import { login } from '../../api/user/userAction';

const mapDispatchToProps = {
    login
};

const mapStateToProps = (state: any) => ({
    loginAttemptFailed: state.userPage.loginAttemptFailed,
    isLoggedIn: state.userPage.isLoggedIn
});

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
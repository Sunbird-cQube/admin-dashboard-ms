import AppHeader from './app-header.component';
import { connect } from 'react-redux';
import { logout } from '../../api/user/userAction';

const mapDispatchToProps = {
    logout
};

const mapStateToProps = (state: any) => ({
    userId: state.userPage.userId,
    userName: state.userPage.userName,
    role: state.userPage.role,
    isLoggedIn: state.userPage.isLoggedIn
});

export const AppHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(AppHeader);

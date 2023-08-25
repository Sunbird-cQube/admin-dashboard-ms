import AppRoot from './app-root.component';
import { connect } from 'react-redux';
import { logout } from '../../api/user/userAction';

const mapDispatchToProps = {
    logout
};

const mapStateToProps = (state: any) => ({
    userId: state.userPage.userId,
    muid: state.userPage.muid,
    userName: state.userPage.userName,
    role: state.userPage.role
});

export const AppRootContainer = connect(mapStateToProps, mapDispatchToProps)(AppRoot);
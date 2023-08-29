
import { connect } from 'react-redux';
import GuardedRoute from './app-router-guard-component';

const mapDispatchToProps = {
};

const mapStateToProps = (state: any) => ({
    isLoggedIn: state.userPage.isLoggedIn
});

export const AppGuardedRoute = connect(mapStateToProps, mapDispatchToProps)(GuardedRoute);
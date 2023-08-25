
import { connect } from 'react-redux';
import { HomePage } from './home.component';

const mapDispatchToProps = {
};

const mapStateToProps = (state: any) => ({});

export const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);
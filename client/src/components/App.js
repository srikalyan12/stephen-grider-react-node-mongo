import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './../actions';
import Landing from './Landing';

import Header from './Header';
// const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' component={Landing} exact />
            <Route path='/survey' component={Dashboard} exact />
            <Route path='/survey/new' component={SurveyNew} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};
export default connect(null, mapDispatchToProps)(App);

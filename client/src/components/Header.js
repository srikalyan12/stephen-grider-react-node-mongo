import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Payments from './Payments';
class Header extends Component {
  renderUser(auth) {
    switch (auth) {
      case null:
        return <div> Loading...</div>;
      case false:
        return (
          <li>
            <a href='/auth/google'>Login With Google</a>
          </li>
        );

      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0 10px' }}>Credits: {auth.credits}</li>
            <li>
              <a href='/api/logout'>LogOUT</a>
            </li>
          </>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            className='left brand-logo'
            to={this.props.auth ? '/survey' : '/'}
          >
            Emaily
          </Link>
          <ul className='right'>{this.renderUser(this.props.auth)}</ul>
        </div>
      </nav>
    );
  }
}

const mapStatetoProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStatetoProps, null)(Header);

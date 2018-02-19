
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

class OktaNav extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.setUser = this.setUser.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    console.log('authenticating');
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }

    if (authenticated) {
      this.setUser(this.login);
    }
  }

  setUser(loginFn) {
    Promise.all([this.getUser(), this.getIdToken()])
    .then(function(values) {
      loginFn({details: values[0], id: values[1]})
    })
  }

  async getUser() {
    const user = await this.props.auth.getUser();
    return user;
  }
  async getIdToken() {
    const id = await this.props.auth.getIdToken();
    return id;
  }

  componentDidMount() {
    // console.log('this.props.user.id', this.props.user.id)
  }

  // componentDidUpdate() { // currently, reenabling this will run setUser infinitely
  //   this.checkAuthentication();
  // }

  login(userInfo) {
    this.props.login(userInfo);
  }

  logout() {
    console.log('trying to log out');
    this.props.auth.logout();
    window.location.reload();
  }

  render() {
    console.log('props', this.props)
    if (this.state.authenticated === null) return null;

    const okta = this.state.authenticated ?
      <button onClick={this.logout} className="btn btn-secondary" type="button">Logout {this.props.user.details ? this.props.user.details.email : null}</button> :
      <button onClick={this.props.auth.login} className="btn btn-secondary" type="button">Login / Signup</button>;

    const links = this.state.authenticated ? (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to='/protected' className="nav-link">Protected</Link>
        </li>
        <li className="nav-item active">
          <Link to='/anotherprotected' className="nav-link">Also Protected</Link>
        </li>
      </ul>
      ) : (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to='/about' className="nav-link">Public Facing Link</Link>
        </li>
      </ul>)

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <Link to='/' className="navbar-brand"><img src="/logo-transparent.png" style={{ height: '35px' }} /></Link><br/>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {links}

            {okta}
          </div>

        </nav>
      </div>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */
import { connect } from 'react-redux';
import { login } from '../store/user';

const mapState = ({ user }) => ({ user });
const mapDispatch = ({ login });

export default withAuth(connect(mapState, mapDispatch)(OktaNav))

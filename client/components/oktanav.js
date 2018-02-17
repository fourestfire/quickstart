
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;

    const okta = this.state.authenticated ?
      <button onClick={this.props.auth.logout} className="btn btn-secondary" type="button">Logout</button> :
      <button onClick={this.props.auth.login} className="btn btn-secondary" type="button">Login</button>;

    const links = this.state.authenticated ? (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to='/protected' className="nav-link">Protected</Link>
        </li>
        <li className="nav-item active">
          <Link to='/protected' className="nav-link">Another Link</Link>
        </li>
      </ul>
      ) : <ul className="navbar-nav mr-auto"><Link to='/about' className="nav-link">About</Link></ul>

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <Link to='/' className="navbar-brand">Home</Link><br/>
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
});

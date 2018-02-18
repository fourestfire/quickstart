import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Signup, About, Campus, UserHome, OktaNav, OktaLogin, Protected, AnotherProtected, Home} from './components'
import {me} from './store'
import { receiveCampuses } from './store/campus';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

function onAuthRequired({history}) {
  history.push('/login');
}

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router>
        <Security issuer='https://dev-870179.oktapreview.com/oauth2/default'
                  client_id='0oae1z17dvF0tdWhU0h7'
                  redirect_uri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired} >
          <Route path='/' exact={true} component={Home} />
          <Route path='/about' component={About} />
          <SecureRoute path='/protected' component={Protected} />
          <SecureRoute path='/anotherprotected' component={AnotherProtected} />
          <Route path='/login' render={() => <OktaLogin baseUrl='https://dev-870179.oktapreview.com' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      // dispatch(me()) // not needed right now with okta setup
      dispatch(receiveCampuses())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

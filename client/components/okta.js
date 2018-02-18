import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';

class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      logo: '/logo-transparent.png',
      registration: {
        parseSchema: function(schema, onSuccess, onFailure) {
           // handle parseSchema callback
           onSuccess(schema);
        },
        preSubmit: function (postData, onSuccess, onFailure) {
           // handle preSubmit callback
           onSuccess(postData);
        },
        postSubmit: function (response, onSuccess, onFailure) {
            // handle postsubmit callback
           onSuccess(response);
        }
      },
      labels: {
        'primaryauth.title': 'Okta Quickstart Login',
      },
      features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
         registration: true // REQUIRED
      },
      idps: [
        {type: 'FACEBOOK', id: '$Your_FB_IDP_ID_Here'},
        {type: 'GOOGLE', id: '$Your_GOOGLE_IDP_ID_Here'}
      ]
    });
    this.widget.renderEl({el}, this.onSuccess.bind(this, this.props.onSuccess), this.props.onError);
  }

  onSuccess(fn, res){ // wrapper function so we can do something with the user details we get back
    var args = [].slice.call(arguments);
    console.log('user details', args[1].user.profile)
    this.props.login(args[1].user.profile); // sends user details to store
    fn(res); // actually runs the original success function
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    console.log('props', this.props)
    return <div />;
  }
}

/* -------------------<   CONTAINER   >-------------------- */
import { connect } from 'react-redux';
import { login } from '../store/user';

const mapState = null;
const mapDispatch = ({ login });

export default connect(mapState, mapDispatch)(OktaSignInWidget)

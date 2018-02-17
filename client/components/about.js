/* -------------------<   COMPONENT   >-------------------- */
import React from 'react';
import { Link } from 'react-router-dom';
import {OktaNav} from './'

class About extends React.Component {
  render () {
    return (
      <div>
        <OktaNav />
        <br />
        <main role="main" className="container">
          <div className="row">
            <div className="col-md-8 blog-main">
              <div className="blog-post">
                <h2 className="blog-post-title"> About Okta Quickstart</h2>
                <p>This a simple SPA template that uses Okta for login and registration.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

export default connect()(About);


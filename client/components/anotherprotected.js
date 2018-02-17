/* -------------------<   COMPONENT   >-------------------- */
import React from 'react';
import { Link } from 'react-router-dom';
import {OktaNav} from './'

class AnotherProtected extends React.Component {

  componentDidMount () {
    this.props.receiveCampuses();
  }

  render () {
    return (
      <div>
        <OktaNav />
        <br />
        <main role="main" className="container">
          <div className="row">
            <div className="col-md-8 blog-main">
              <div className="blog-post">
                <h2 className="blog-post-title"> Another list of protected data </h2>
                <p>
                  {
                    this.props.campuses.allCampuses.map(campus => {
                      return (<li key={campus.id}>Place {campus.id}:&nbsp;&nbsp;
                        {campus.name}
                        </li>)
                    })
                  }
                </p>
                <hr />
                <p>Microdosing pariatur single-origin coffee, freegan woke humblebrag mlkshk sed cloud bread quis. +1 deep v mlkshk shoreditch, art party craft beer intelligentsia health goth ennui godard non plaid.</p>
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
import { receiveCampuses } from '../store/campus';

const mapState = ({ campuses }) => ({ campuses });
const mapDispatch = ({ receiveCampuses });

export default connect(mapState, mapDispatch)(AnotherProtected);


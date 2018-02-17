/* -------------------<   COMPONENT   >-------------------- */
import React from 'react';
import { Link } from 'react-router-dom';
import {OktaNav} from './'

class Protected extends React.Component {

  componentDidMount () {
    this.props.receiveCampuses();
  }

  render () {
    return (
      <div>
        <OktaNav />
        <p> protected: things that are going on </p>
          <p>
            {
              this.props.campuses.allCampuses.map(campus => {
                return (<li key={campus.id}>Place {campus.id}:&nbsp;&nbsp;
                  {campus.name}
                  </li>)
              })
            }
          </p>
      </div>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { receiveCampuses } from '../store/campus';

const mapState = ({ campuses }) => ({ campuses });
const mapDispatch = ({ receiveCampuses });

export default connect(mapState, mapDispatch)(Protected);


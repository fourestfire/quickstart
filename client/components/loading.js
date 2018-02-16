/* -------------------<   COMPONENT   >-------------------- */
import React from 'react';

class Loading extends React.Component {

  render () {
    return (
      <div>
        <p> loading </p>
      </div>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ campuses }) => ({ campuses });
const mapDispatch = ({ });

export default connect(mapState, mapDispatch)(Loading);


/* -------------------<   COMPONENT   >-------------------- */
import React from 'react';
import { Link } from 'react-router-dom';
import {OktaNav} from './'

class Home extends React.Component {

  componentDidMount () {
    this.props.receiveCampuses();
  }

  render () {
    return (
      <div>
        <OktaNav />
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-4">Okta Quickstart</h1>
            <p className="lead">React-Redux / Express / Postgres project quickstarter using Okta for login and registration.</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Quinoa gochujang seitan justo. Flexitarian brunch ad, sriracha edison bulb irony disrupt kitsch blog butcher roof party. Live-edge freegan leggings fam salvia labore. Kale chips lyft glossier ramps dolor lo-fi YOLO tofu sartorial chillwave letterpress. Vaporware consequat echo park listicle pickled cliche. </p>
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Tumeric bespoke pabst fanny pack cupidatat kale chips man bun irure bushwick thundercats brooklyn. Photo booth glossier cillum, excepteur street art veniam sunt pour-over marfa. Cornhole PBR&B ad elit dolore, gluten-free austin pop-up gentrify. Shoreditch actually flannel XOXO est, retro locavore cray. </p>
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Culpa activated charcoal post-ironic cillum proident adipisicing. Dolor wayfarers aliquip, synth lomo waistcoat raclette. Franzen flexitarian cray 90's, lyft health goth roof party disrupt. Man braid sunt heirloom shoreditch 90's fanny pack. Messenger bag cray elit vape cold-pressed.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { receiveCampuses } from '../store/campus';

const mapState = ({ campuses }) => ({ campuses });
const mapDispatch = ({ receiveCampuses });

export default connect(mapState, mapDispatch)(Home);


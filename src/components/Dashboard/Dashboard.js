import React, { Component } from 'react';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import WebsitesBoxContainer from './DashboardComponents/WebsitesBoxContainer';
import { Link } from 'react-router';
import LogoutButtonContainer from './DashboardComponents/LogoutButtonContainer'
require("../../Basic.less");


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.setState({ projects: this.props.projects });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ projects: newProps.projects });
  }

  logout() {
    browserHistory.push('/login');
  }

  addNewProject() {
    console.log('THIS IS SUPPOSED TO ADD A NEW PROJECT');
    axios.get('/addNewProject')
      .then((response) => {
        console.log(response.data, 'THIS IS THE RESPONSE AFTER ADDING A NEW PROJECT');
        this.props.addNewProject('Default Project ' + response.data.newSequenceNumber, '2 doge for u', 1337);
      });
  }

  render() {
    return (
      <div className="App">
        <AppBar
          title="XyClone | Dashboard"
          className='AppBar-EditorPage'
          iconElementRight={ <LogoutButtonContainer /> }
        />

        <div className="websitesBox-container">
          {
            this.state.projects.map((project, key) => {
              return ( <WebsitesBoxContainer key={key} project={project} /> )
            })
          }
          <span>
            <RaisedButton
              label="+"
              onClick={ this.addNewProject.bind(this) }
            />
          </span>
        </div>
      </div>
    );
  }
}

export default Dashboard;

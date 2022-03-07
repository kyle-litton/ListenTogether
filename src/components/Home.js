import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import { addToken, setUsername, setIsOwner } from "../actions/userAction"
import '../styles/Home.css';
import logo from '../logo.png'
import $ from "jquery";
  
  
class Home extends Component {

  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (hashParams.access_token) {
      this.props.addToken(hashParams.access_token);
    } 
  }
  
  getUsername(){
   $.ajax({
      url: "https://api.spotify.com/v1/me/",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.token);
      },
      success: data => {
          this.props.setUsername(data.display_name);
      },
    });
  }

  createGroup(){
    this.props.setIsOwner(true);
    this.props.history.push('/start');
  }

  joinGroup(){
    this.props.setIsOwner(false);
    this.props.history.push('/start');
  }

  render() {
    return (
      <div className="Home">
        <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo"/>
          {!this.props.token && (
            <a
              className="Home-btn"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.props.token && (
            <div className="Home-btnDiv">
                {this.getUsername()}
                <p className="Home-text">Create a new group that friends can join.</p>
                <button className="Home-createBtn" onClick={this.createGroup.bind(this)}>Create a Group</button>
                <p className="Home-text">Join a group that already exists.</p>
                <button className="Home-joinBtn" onClick={this.joinGroup.bind(this)}>Join a Group</button>
                
            </div>
          )}
          <p className="Home-p">
            Created By Kyle Litton. <a className="Home-credit" href='https://github.com/kyle-litton/ListenTogether'>View Source</a>
          </p>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addToken,
      setUsername,
      setIsOwner
    },
    dispatch
  );
};

const mapStateToProps = state => {
    return {
      token: state.userReducer.token,
      username: state.userReducer.username
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(Home);
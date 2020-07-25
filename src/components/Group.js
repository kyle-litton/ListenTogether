import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import { hasLoaded } from "../actions/uiActions";
import '../styles/Group.css';
import topLeft from '../topLeft.png';
import topRight from '../topRight.png';
import Player from './Player.js';
import SpotifyPlayer from 'react-spotify-web-playback';
import $ from "jquery";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

class Group extends Component{

    state = {
      data: [],
      intervalIsSet:false,
      ownerToken: "",
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      userUri: [],
      ownerPlaying: [],
      uri: "",
      sync: false,
      position: 0
    }

    componentDidMount() { 
      this.getDataFromDb();   
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval });
        }
        if(this.state.data.length>0){
          let curGroup = this.state.data.find(element => element.group === this.props.group);
          this.setState({ownerToken:curGroup.ownerToken});
          this.getCurrentlyPlaying(this.state.ownerToken);
        }
        window.onbeforeunload = function() {
          this.onUnload();
          return "";
        }.bind(this);
        this.props.hasLoaded(true);
      }
    
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
        this.props.hasLoaded(false);
      }

    componentDidUpdate(){
        // Keep members tracks synced
        if(!this.props.isOwner && this.state.ownerPlaying.length !== 0){
          console.log("CUR URI: " + this.state.userUri[0]);

          if(this.state.userUri.length===0){
            this.getURI(this.props.token);
          }        
          else if(this.state.userUri[0] !== this.state.uri && this.state.sync){
            this.SyncSongs(this.props.token);
          }
          
        }
    }
    
      getDataFromDb = () => {
        fetch('https://listen-together-api.herokuapp.com/Groups/getData')
          .then((data) => data.json())
          .then((res) => this.setState({ data: res }));
      };

      displayOwner(){
        let curGroup = this.state.data.find(element => element.group === this.props.group);
        return curGroup.ownerName;
      }

      SyncSongs(token){
        $.ajax({
          url: "https://api.spotify.com/v1/me/player/play",
          type: "PUT",
          data: JSON.stringify({"uris":this.state.ownerPlaying, "position_ms":this.state.position}),
          beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: () => {
            this.getURI(this.props.token);
            this.setState({sync:false});
            console.log("Songs Synced");
          }
        });
      }

      getURI(token){
        $.ajax({
          url: "https://api.spotify.com/v1/me/player",
          type: "GET",
          beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: data => {
            if(typeof data !== 'undefined'){
              if(data?.item){
                this.setState(
                {
                  userUri : [data.item.uri]
                }
              )
              }else{
                this.setState(
                  {
                    userUri : ["Not Playing"]
                  }
                )
              }             
            }
          }
        });
      }

      // TODO change to componentDidUpdate
      getCurrentlyPlaying(token) {
          $.ajax({
            url: "https://api.spotify.com/v1/me/player",
            type: "GET",
            beforeSend: xhr => {
              xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
              if(typeof data !== 'undefined'){
                
                const newSong = [data.item.uri];
                  if(data.item.uri !== this.state.uri){
                  this.setState({
                    item: data.item,
                    uri : data.item.uri,
                    ownerPlaying : newSong,
                    sync: true,
                    position: data.progress_ms
                  });
                }
              }
              else if(!this.props.isOwner){
                confirmAlert({
                  title: 'No Music Playing',
                  message: 'The group leader needs to start playing music to begin.',
                  buttons: [{label: 'OK'}]
                });
              }
            }
          });
      }

      render() {

        if(!this.props.isLoaded){
          return(
          <div className="Group">
            <header className="Group-header">
            <h1 className="Group-title">Listen Together</h1>
                <img src={topLeft} className="Group-logoLeft" alt="logo"/>
                <img src={topRight} className="Group-logoRight" alt="logo"/>
            <div className="loader"></div>
            </header>
          </div>
          )
        }
        if(this.props.isLoaded && this.state.data.length === 0){
          return(
          <div className="Group">
            <header className="Group-header">
            <h1 className="Group-title">Listen Together</h1>
            <img src={topLeft} className="Group-logoLeft" alt="logo"/>
            <img src={topRight} className="Group-logoRight" alt="logo"/>

            <p className="Group-curGroup">Loading...</p>
            <div className="loader"></div>
          
            <p className="Home-p">
            Created By Kyle Litton. <a className="Home-credit" href='https://github.com/jkl1999/ListenTogether'>View Source</a>
            </p>
            </header>
            
          </div>
          )
        }
        else{
          if(this.props.isLoaded && !this.props.username){
            return(
              <div className="Group">
                <header className="Group-header">
                <h1 className="Group-title">Listen Together</h1>
                    <img src={topLeft} className="Group-logoLeft" alt="logo"/>
                    <img src={topRight} className="Group-logoRight" alt="logo"/>
                <h3 className="Group-loadError">Something Went Wrong</h3>
                <a
              className="Group-tryAgain"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Try Again
            </a>
                </header>
              </div>
              )
          }
          if(!this.props.isOwner){
            return (
              <div className="Group">
                <header className="Group-header">
                <h1 className="Group-title">Listen Together</h1>
                <img src={topLeft} className="Group-logoLeft" alt="logo"/>
                <img src={topRight} className="Group-logoRight" alt="logo"/> 
                {this.getCurrentlyPlaying(this.props.ownerToken)}
                <div className='Group-player'>
                    {console.log(this.state.uri)}
                    <Player
                      item={this.state.item}
                      uri={this.state.uri}
                      />
                      <br></br>
                      <br></br>
                      <SpotifyPlayer
                      styles={{
                        loaderColor: '#1db954',
                        sliderColor: '#1db954',
                      }}
                      autoPlay
                      play={true}
                      showSaveIcon={true}
                      token={this.props.token}          
                      name = "Listen Together"
                      />;
                  </div>
                <p className="Home-p">
                Created By Kyle Litton. <a className="Home-credit" href='https://github.com/jkl1999/ListenTogether'>View Source</a>
                </p>
                </header>
                
              </div>
            );
          }
          if(this.props.isOwner){
            return (
              <div className="Group">
                <header className="Group-header">
                <h1 className="Group-title">Listen Together</h1>
                <img src={topLeft} className="Group-logoLeft" alt="logo"/>
                <img src={topRight} className="Group-logoRight" alt="logo"/>
  
                <p className="Group-curGroup">{'Current Group: ' + this.props.group}</p>
                {this.getCurrentlyPlaying(this.props.token)}           
                  <div className='Group-player'>
                    <Player
                      item={this.state.item}
                      uri={this.state.uri}
                      />
                      <br></br>
                      <br></br>
                      <SpotifyPlayer
                      styles={{
                        loaderColor: '#1db954',
                        sliderColor: '#1db954',
                      }}
                      autoPlay
                      play={true}
                      showSaveIcon={true}
                      token={this.props.token}          
                      name = "Listen Together"
                      />;
                  </div>
                <p className="Home-p">
                Created By Kyle Litton. <a className="Home-credit" href='https://github.com/jkl1999/ListenTogether'>View Source</a>
                </p>
                </header>
                
              </div>
            );
          }        
        }
      }


}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      hasLoaded
    },
    dispatch
  );
};

const mapStateToProps = state => {
    return {
      isLoaded: state.uiReducer.isLoaded,
      group: state.userReducer.group,
      token: state.userReducer.token,
      username: state.userReducer.username,
      isOwner: state.userReducer.isOwner,
      ownerToken: state.userReducer.ownerToken
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Group);
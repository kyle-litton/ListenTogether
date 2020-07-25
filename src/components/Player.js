import React from "react";
import "../styles/Player.css";
import device from '../assets/devices.png';

const Player = props => {
  const backgroundStyles = {
    backgroundImage:`url(${
      props.item.album.images[0].url
    })`,
  };

  if(props.uri!==""){
    return (
      <div className="App">  
        <div className="main-wrapper">
          <div className="now-playing__img">   
            <img src={props.item.album.images[0].url} alt=""/>
          </div>
          <div className="background" style={backgroundStyles} />{" "}
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="App">
        <div className="main-wrapper">
          <p className="instructions">Press    <img src={device} className="device" alt="device"/>  , Then select "Listen Together" to play music.</p>
          <div className="background" style={backgroundStyles} />{" "}
        </div>
      </div>
    );
  }
}
  


export default Player;
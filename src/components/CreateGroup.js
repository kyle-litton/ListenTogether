import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { setGroup, setOwnerToken } from "../actions/userAction";
import '../styles/CreateGroup.css';
import logo from '../logo.png'
import $ from "jquery";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

class CreateGroup extends Component{

    state = {
      data: [],
      intervalIsSet:false
    }

    componentDidMount() {    
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval });
        }
    
      }
    
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
      }
    
      getDataFromDb = () => {
        fetch('https://listen-together-api.herokuapp.com/Groups/getData')
          .then((data) => data.json())
          .then((res) => this.setState({ data: res }))
          .then(console.log(this.state.data));
      };

      handleGroup = () => {
        let groupList = this.state.data.map((data) => data.groupName);
        if(groupList.includes(this.props.group))
        {
          if(this.props.isOwner){
            confirmAlert({
              title: 'Group Already Exists',
              message: 'Enter a name that is not already taken.',
              buttons: [{label: 'OK'}]
            });
          }else{
            this.props.setOwnerToken(this.state.data.find(x => x.groupName===this.props.group).ownerToken);
            this.props.history.push('/group');
          }
          
        }
        else{
        if(this.props.isOwner){

          $.ajax({
            url: "https://listen-together-api.herokuapp.com/Groups/putData",
            type: "POST",
            data: JSON.stringify({
              groupName: this.props.group,
              ownerName: this.props.username,
              ownerToken: this.props.token 
            }),
            contentType: 'application/json; charset=UTF-8',
            success: () => {
              console.log("New Group Made: " + this.props.group);
              this.props.setOwnerToken(this.props.token);
              this.props.history.push('/group');
            },
            error: () => {
              confirmAlert({
                title: `Error Creating Group ${this.props.group}`,
                message: 'Try Again',
                buttons: [{label: 'OK'}]
              })
            }
          });

            
          }
          else{
            confirmAlert({
              title: 'Group Does Not Exist',
              message: 'Make sure you spelled the name of the group correctly.',
              buttons: [{label: 'OK'}]
            });
          }
        }
          
      }

      handleInput = (event) => {
        this.props.setGroup(event.target.value);
      }

      render() {
        return (
          <div className="Create">
            <header className="Create-header">
            <img src={logo} className="Create-logo" alt="logo"/>
            
            <p className="Create-p">{this.props.isOwner ? 'Create Group Name' : 'Enter Group Name'}</p>

            <form className="Create-form">
                <input className='input'
                  type='text'
                  placeholder='Enter Name Here'
                  onChange={this.handleInput}
                />
             </form>
             <br></br>
             <button className="Create-startBtn" onClick={this.handleGroup.bind(this)}>{this.props.isOwner ? 'Start Group' : 'Join Group'}</button>

             <p className="Home-p">
            Created By Kyle Litton. <a className="Home-credit" href='https://github.com/jkl1999/ListenTogether'>View Source</a>
            </p>
            </header>
            
          </div>
        );
      }


}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setGroup,
      setOwnerToken
    },
    dispatch
  );
};

const mapStateToProps = state => {
    return {
      group: state.userReducer.group,
      token: state.userReducer.token,
      username: state.userReducer.username,
      isOwner: state.userReducer.isOwner,
      ownerToken: state.userReducer.ownerToken
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom'
import './Login.css'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios';
class Login extends PureComponent {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    let loggedIn = true;
    if (!token) {
      loggedIn = false
    }
    this.state = {
      loggedIn ,
      username: "",
      password: "",
      checkUser : true,
      checkPass : true 
    }
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      checkPass : true ,
      checkUser : true
    })
  }
  onSubmit = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3001/api/user')
      .then(res => {
        console.log(res.data)
        const data = res.data;
        const { username , password } = this.state;
        let checkUser = data.filter(ele => {
          return ele.username === username
        })
        if (!checkUser.length) {
          this.setState({
            checkUser : false
          })
          return;
        }
        if(checkUser[0].password !== password ) {
          this.setState({
            checkPass : false
          })
          return;
        }
        localStorage.setItem('token' , checkUser[0].username)
        this.setState({
          loggedIn : true
        })
        console.log(this.state.loggedIn)
      }).catch(err => {
        console.log(err);
      })
      
  }
  render() {
    const { checkPass , checkUser , loggedIn } = this.state;
    let classNameUser = 'alert alert-warning display';
    let classNamePass = 'alert alert-warning display';
    if(!checkUser) {
      classNameUser = 'alert alert-warning';
    }
    if(!checkPass){
      classNamePass = 'alert alert-warning';
    }
    if (loggedIn) {
      return <Redirect to="/giveaway" />
    }
    return (
      <div className="Login">
        <div className="wrapper-login">
          <div className="child-login">
            <h2>Old Book Give Away</h2>
            <div className={classNameUser} role="alert">
              Username doesn't exists !!!
            </div>
            <div className={classNamePass} role="alert">
              Oop, Wrong Password !!!
            </div>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.onChange}
                placeholder="Username"
                required />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                required />
              <button className="btn btn-primary">Log In</button>
            </form>

            <p>Or</p>
            <div>
              <a href="/login/forgot">
                Forgot your password
            </a>
            </div>
          </div>
          <div className="sign-in">
            <p>You don't have account </p>
            <a href="/signin">Sign In</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
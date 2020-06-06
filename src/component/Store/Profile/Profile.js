import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom'
class MyProfile extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      logout : false
    }
  }
  Logout = () => {
    localStorage.clear('token');
    this.setState({
      logout : true
    })   
  }
  render() { 
    const { logout } = this.state;
    if(logout) {
      return <Redirect to="/"/>
    }
    return ( 
      <div className="myProfile">
            <div className="avatar">
              <img src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/73244435_2997608627131456_2957342681333760000_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=G-KGxZGnds0AX8twITo&_nc_ht=scontent.fhan2-3.fna&oh=67c0862a7d6d6d1eef1bff12a6ef85f4&oe=5EFE8FBC" alt="avatar" />
              <div>
                <div className="name"><h6>{localStorage.getItem('token')}</h6></div>
                <div className="edit">Change Profile</div>
              </div>
            </div>
            <button onClick={this.Logout} className="Logout btn btn-light">Log Out</button>
            <div className="information">
              <div>
                <a href="/store">My Store</a>
              </div>
              <div>
                <a href="/store/profile">Profile</a>
              </div>
            
              <div>
                <a href="#">Address</a>
              </div>
              <div>
                <a href="#">Address</a>
              </div>
            </div>
            <div className="Coin">
              <div>
                <img src="https://cdn.glitch.com/64ad03e4-513c-419f-a8ab-9f609f227983%2Fmoney.png?v=1591279036449" alt="coin" />
                <a href="#">Borrow</a>
              </div>
              <div>
                <img src="https://cdn.glitch.com/64ad03e4-513c-419f-a8ab-9f609f227983%2Falarm.png?v=1591279383388" alt="coin" />
                <a href="#">Notification</a>
              </div>
              <div>
                <img src="https://cdn.glitch.com/64ad03e4-513c-419f-a8ab-9f609f227983%2Fmoney.png?v=1591279036449" alt="coin" />
                <a href="#">Shoppe wallet</a>
              </div> <div>
                <img src="https://cdn.glitch.com/64ad03e4-513c-419f-a8ab-9f609f227983%2Falarm.png?v=1591279383388" alt="coin" />
                <a href="#">Shoppe Coin</a>
              </div>
            </div>
          </div>
     );
  }
}
 
export default MyProfile;
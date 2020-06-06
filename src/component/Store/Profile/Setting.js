import React, { PureComponent } from 'react';
class Setting extends PureComponent {
  render() { 
    return ( 
      <div className="ProfileSetting">
        <div className="setting">
          <div>
            <h4 className="left">My Profile</h4>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <div className="eachRow">
            <p className="left">Username</p>
            <p>phikhanhcr</p>
          </div>
          <div className="eachRow">
            <p className="left">Name</p>
            <input className="textBox" type="text" />
          </div>
          <div className="eachRow">
            <p className="left">Address</p>
            <p>phikhanhcr</p>
          </div>
          <div className="eachRow">
            <p className="left">Shop name</p>
            <p>phikhanhcr</p>
          </div>
          <div className="eachRow radioBox">
            <p className="left">Sex</p>
            <input type="radio" name="sex" id="male" />
            <p htmlFor="male">Male</p>
            <input type="radio" name="sex" id="female" />
            <p htmlFor="female">Female</p>
          </div>
          <div className="eachRow">
            <p className="left">Username</p>
            <p>phikhanhcr</p>
          </div>
          <button className="btn btn-outline-info"> Save </button>
        </div>
        <div className="image">
          <img src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/73244435_2997608627131456_2957342681333760000_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=G-KGxZGnds0AX8twITo&_nc_ht=scontent.fhan2-3.fna&oh=67c0862a7d6d6d1eef1bff12a6ef85f4&oe=5EFE8FBC" />
          <input className="avatar-uploader" type="file" accept=".jpg,.jpeg,.png" />
          <button className="btn btn-outline-info">Change Avatar</button>
        </div>
      </div>
    );
  }
}
 
export default Setting;
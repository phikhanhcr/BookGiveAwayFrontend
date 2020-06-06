import React, { PureComponent } from 'react';
import '../Store.css'
import MyProfile from './Profile';
import Setting from './Setting';

class SettingProfile extends PureComponent {
  render() {

    return (
      <div className="MyStore">
        <div className="wrapperStore">
          <MyProfile />
          <Setting />
        </div>
      </div>
    );
  }
}

export default SettingProfile;
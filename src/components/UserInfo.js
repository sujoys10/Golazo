import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = (props) => {
  return(
    <Link to={`/user/${props.user.uid}`}>
    <div className="userInfo">
      <div className="avatar">
        <img src={props.user.avatar} alt={props.user.name} />
      </div>
      <div className="user__content">
          <div className="userInfo__name">
            {props.user.name}
          </div> 
      </div>
    </div>
    </Link>
  )
};

export default UserInfo;
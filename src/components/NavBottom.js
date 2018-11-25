import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

const NavBottom = (props) =>(
    <div className="navBottom">
        <NavLink to="/dashboard" className="navBottom__item">
            <i className="fas fa-home"></i></NavLink>
        <NavLink to="/trending" className="navBottom__item">
            <i class="fas fa-fire"></i></NavLink>
        <NavLink to={`/user/${props.currentUser.uid}`} className="navBottom__item">
            <i class="far fa-user"></i></NavLink>
    </div>

)

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth
    }
}

export default connect(mapStateToProps)(NavBottom);
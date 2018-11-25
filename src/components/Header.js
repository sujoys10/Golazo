import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogOut } from '../actions/auth';
import SearchBox from './SearchBox';

class Header extends React.Component{
    constructor(props){
        super(props);
    } 
    render(){
        return(
            <div className="header__container">
                <div className="header">
                    <NavLink to="/dashboard" className="header__title">Golazo</NavLink>
                    <SearchBox />
                    <div className="user">
                       <NavLink to={`/user/${this.props.currentUser.uid}`} className="header__user"><i class="far fa-user"></i></NavLink>
                       <button className="logout__button" onClick={() => {this.props.dispatch(startLogOut())}}>log out</button> 
                    </div>
                </div>   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth
    }
}

export default connect(mapStateToProps)(Header);
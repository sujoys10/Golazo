import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConnections } from '../actions/users';
import UserInfo from './UserInfo';

class Connections extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.props.match.params.connection === 'followers'){
            this.props.fetchData(this.props.user.followers);
        }else{
            this.props.fetchData(this.props.user.followings);
        }
    }
    render(){
        return(
            <div className="connection">
                <div className="connection__header">
                    <p className="connection__title">{this.props.match.params.connection}</p>
                    <Link className="back" to={`/user/${this.props.user.uid}`}>GO BACK</Link>
                </div>
                
                <div className="connecitons__name"> 
                    {(Object.keys(this.props.connection).length !== 0) && 
                        this.props.connection.map(user => {
                            return(
                                <div>
                                    <UserInfo user={user}/>
                                </div>
                            )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.users,
        connection: state.userConnection
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchConnections(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
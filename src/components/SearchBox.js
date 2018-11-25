import React from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { findUsers } from '../actions/users';
import  UserInfo  from './UserInfo';

class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:'',
            output: false
        }
    }
    handleClickOutside = () =>{
        this.setState({output: false});
        this.state.text = '';
    }

    handleOnClick = () =>{
        this.setState({output: false});
        this.state.text = '';
    }
    render(){
    return(
        <div className="searchBox">
            <input 
                type="text" 
                placeholder="search fellows..."
                value={this.state.text}
                onChange={(e)=> {
                    this.setState({text:e.target.value});
                    this.props.findUsers(e.target.value);            
                    this.setState({output:true});
                }}
            /> 
            <div className="searchResult" tabIndex="0" style = {{display: this.state.output ? 'block':'none' }}>
                {this.props.users && Object.keys(this.props.users).length !== 0 && 
                 this.props.users.map(user => {
                     return(
                         <div className="user__intro"
                            onBlur={this.handleOnBlur} 
                            onClick={this.handleOnClick}  
                         >
                          <UserInfo user={user} />                              
                         </div>
                     )
                 })
                 }
            </div>
        </div>
    )
   }
}
    

const mapStateToProps = (state) => {
    return{
        users: state.searchedData
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        findUsers: (input) => dispatch(findUsers(input))
    }
}
SearchBox = onClickOutside(SearchBox);
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
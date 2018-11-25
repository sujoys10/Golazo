import React from 'react';
import UserForm from './UserForm';
import { editUser } from '../actions/auth';
import { connect } from 'react-redux';

class EditUserDetails extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
            return(
                <div className="editUser"> 
                    <UserForm 
                        user={this.props.currentUser}
                        onSubmit={(updates) => {
                            this.props.dispatch(editUser(this.props.currentUser.uid, updates));
                            setTimeout(() => {
                                this.props.history.push(`/user/${this.props.currentUser.uid}`)},2000 );
                            
                    }} />
                </div>
            ) 
        }
}
const mapStateToProps = (state) => {
    return{
        currentUser: state.currentUser
    }
}
     
export default connect(mapStateToProps)(EditUserDetails);
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { usersFetchData, addFollower, addFollowing, removeFollower, removeFollowing } from '../actions/users';

class UserProfile extends React.Component{
    constructor(props){
        super(props); 
    }

    componentWillMount(){
        this.props.fetchData(`/api/user/${this.props.match.params.uid}`);                 
    }
      
 
    onFollow = () =>{
        if(this.props.user.followers.includes(this.props.currentUser.uid)){
            this.props.removeFollower(this.props.user.uid, this.props.currentUser.uid);
            this.props.removeFollowing(this.props.currentUser.uid, this.props.user.uid);
            
        }else{
            this.props.addFollower(this.props.user.uid, this.props.currentUser.uid);
            this.props.addFollowing(this.props.currentUser.uid,this.props.user.uid);  
        }  
    } 

    
    render(){
            if (this.props.hasErrored) {
                return <p>Sorry! There was an error loading the items</p>;
            }
            if (this.props.isLoading) {
                return <LoadingPage />;
            }
            
            return(
                <div className="userProfile">
                    <div>
                        
                        { Object.keys(this.props.user).length !== 0 && 
                            <div className="user__details">
                                <div className="user__dp">
                                    <div className="dp__container">
                                       <img src={this.props.user.avatar} alt={this.props.user.name}/>
                                    </div>
                                </div>
                                <div className="user__description">
                                    <p className="user__name">{this.props.user.name}</p>
                                                    
                                    <ul className="user__numbers">
                                     <li className="item"><span className="item__number">{Object.keys(this.props.user.posts).length}</span>posts</li>
                                     <Link to={`/f/${this.props.user.name}/followers`}><li className="item"><span className="item__number">{this.props.user.followers.length}</span>followers</li></Link>
                                     <Link to={`/f/${this.props.user.name}/following`}><li className="item"><span className="item__number">{this.props.user.followings.length}</span>following</li></Link>
                                    </ul>
                                    <div className="user__button">
                                        {(this.props.currentUser.uid === this.props.user.uid) ?
                                            <button className="ef__button"><Link to={`/editUser/${this.props.user.uid}`}>Edit Profile</Link></button> :
                                            <button 
                                            className="ef__button"
                                            onClick={this.onFollow}>
                                            {this.props.user.followers.includes(this.props.currentUser.uid)? 'Following': 'Follow'}
                                        </button>
                                    }
                                    </div>
                                </div>
                            </div>
                       }
                        
                    </div>
                    <div className="user__bio">
                       <p>{this.props.user.bio}</p>
                    </div>
                    <div>
                        { <h3 className="gallery-header">POSTS</h3> }
                        <div className="userContent">
                        {this.props.user.posts && this.props.user.posts.map((post) =>{
                            return(
                                <div className="userPost">
                                    <Link to={`/p/${this.props.user.name}/${post._id}`}><img src={post.content}/></Link>
                                </div>                      
                            );
                        })
                        }
                      
                        </div>
                    </div>
                </div>
            )
    }       
}


const mapStateToProps = (state) =>{
     return{ 
         currentUser: state.auth,
         user: state.users,
         hasErrored: state.userHasErrored,
         isLoading: state.userIsLoading
     }
};
 
 const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(usersFetchData(url)),
        addFollower: (user, follower) => dispatch(addFollower(user, follower)),
        addFollowing: (user, following) =>dispatch(addFollowing(user, following)),
        removeFollower: (user, follower) => dispatch(removeFollower(user, follower)),
        removeFollowing: (user, following) => dispatch(removeFollowing(user, following))
    };
};  
    
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


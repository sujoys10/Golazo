import React from 'react';
import { findPost } from '../actions/post';
import { connect } from 'react-redux';
import PostListItem from './PostListItem';

class UserPost extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchPost(this.props.match.params.pid);
    }
   
    render(){
        return(
            <div className="user__Post">
                { this.props.post.length === 1 && 
                    <PostListItem {...this.props.post[0]} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        post : state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchPost: (id) => dispatch(findPost(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPost);

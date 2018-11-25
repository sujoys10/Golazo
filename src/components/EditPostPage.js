import React from 'react';
import PostForm from './AddImageForm';
import { editPost, startRemovePost, findPost } from '../actions/post';
import { connect } from 'react-redux';

class EditPost extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
            {this.props.post && 
                <div className="editPost">
                <PostForm 
                  post={this.props.post}
                   onSubmit={(post) => {
                        this.props.editPost(this.props.post._id, post);
                        setTimeout(() => {
                            this.props.history.go(-1)},2000 ); 
                        }}
                        />
                <button
                    className="removeButton" 
                    onClick={() =>{
                        this.props.removePost(this.props.post._id);
                        this.props.history.push('/dashboard');
                    }  
                }>Remove</button>       
            </div>
            }
        </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return{
        post: state.posts.find(post => post._id === props.match.params.id),
        isLoading: state.postIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        editPost: (id, update) => dispatch(editPost(id, update)),
        removePost: (id) => dispatch(startRemovePost(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
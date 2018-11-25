import React from 'react';
import PostForm from './AddImageForm';
import { startAddPost } from '../actions/post';
import { connect } from 'react-redux';

const AddPost = (props) => {
    return(
        <div className="addPost">
            <h3>Add Post</h3>
            <PostForm onSubmit={(post) => {
               props.dispatch(startAddPost(post));
               props.history.push('/dashboard');
            }}/>
        </div>
    );
};

export default connect()(AddPost);
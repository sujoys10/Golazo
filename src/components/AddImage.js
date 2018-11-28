import React from 'react';
import ImageForm from './AddImageForm';
import { startAddPost } from '../actions/post';
import { connect } from 'react-redux';

const AddImage = (props) => {
    return(
        <div className="addPost">
            <h3 className="postForm__header">Add Post</h3>
            <ImageForm onSubmit={(post) => {
               props.dispatch(startAddPost(post)).then(() => {
                props.history.push('/dashboard');
               })
            }}/>
        </div>
    );
};

export default connect()(AddImage);
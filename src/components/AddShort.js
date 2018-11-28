import React from 'react';
import { startAddPost } from '../actions/post';
import { connect } from 'react-redux';
import ShortForm from './ShortForm';

const AddShort = (props) => {
    return(
        <div className="addPost">
            <h3 className="postForm__header">Add Short</h3>
            <ShortForm onSubmit={(post) => {
                props.dispatch(startAddPost(post)).then(() => {
                    props.history.push('/dashboard');
                })
            }}/>
        </div>
    );
};

export default connect()(AddShort);
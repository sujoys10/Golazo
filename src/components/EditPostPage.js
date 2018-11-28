import React from 'react';
import ImageForm from './AddImageForm';
import ShortForm from './ShortForm';
import { editPost, startRemovePost } from '../actions/post';
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
              {(this.props.post.category === 'image')?
                <div>
                    <h3 className="postForm__header">Edit your post</h3>
                    <ImageForm 
                        post={this.props.post}
                        onSubmit={(post) => {
                                this.props.editPost(this.props.post._id, post).then(()=>{
                                    this.props.history.go(-1);
                                })
                                /* setTimeout(() => {
                                    this.props.history.go(-1)},2000 ); */ 
                                }}
                    />
                </div>
                :
                <div>
                    <h3 className="postForm__header">Edit your short</h3>
                    <ShortForm 
                        post={this.props.post}
                        onSubmit={(post) => {
                            {console.log(post)}
                                this.props.editPost(this.props.post._id, post).then(()=>{
                                    this.props.history.go(-1);
                                })     
                            }}
                    />
                </div>
             }
                
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
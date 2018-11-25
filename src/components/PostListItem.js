import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { connect } from 'react-redux';
import { startAddComment, startAddLike, startRemoveLike } from '../actions/post';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';


 class PostListItem extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             isliked: false,
             likes: this.props.likes,
             commentVisibilty: 'none',
             commentButtonVisibilty: 'block'
         }
     }
     
     componentDidMount(){
        if(this.props.likes.includes(this.props.user.uid)){
            this.setState(() => ({isliked:true}));
        }
    }
    
     
    onClickedLike = () =>{
       if(this.state.isliked === false){
           this.props.dispatch(startAddLike(this.props._id));
           this.setState(()=>({isliked:true}));
       } else{
           this.props.dispatch(startRemoveLike(this.props._id));
           this.setState(()=>({isliked:false}));
       } 
    }

    sortComments = (comments) => {
        comments.sort((a,b) => {
            return (Date.parse(b.createdAt) - Date.parse(a.createdAt))
        });
        return comments;
    }

    moreComments = () => {
        if(this.state.commentVisibilty === 'none'){
            this.setState({commentVisibilty: 'block', commentButtonVisibilty: 'none'})
        }else{
            this.setState({commentVisibilty: 'none', commentButtonVisibilty: 'block'})
        }

    }
 
     render(){
        return(
            <div className="post">
                <div className="post__header">
                    <UserInfo user={this.props.author}
                       time={this.props.createdAt}/>
                
                    {
                        (this.props.user.uid === this.props.author.uid)?
                        <Link to={`/editPost/${this.props._id}`} className="post__edit">
                        <i class="far fa-edit"></i></Link>:''    
                    }

                </div>
                <div className="post__caption">{this.props.caption}</div>
                <img src={this.props.content} className="post__content"/>
                <div className="post__extra">
                    <div className="post__lc">
                        <button className="post__button"
                            onClick={this.onClickedLike}
                        >{this.state.isliked? <i className="fas fa-futbol"></i> : <i className="far fa-futbol"></i>}
                        </button>    
                        <button className="post__button"
                            onClick={this.moreComments}><i className="far fa-comment"></i>
                        </button>
                    </div>
                   
                    {this.props.likes.length !== 0 && <p className="post__like">{this.props.likes.length} {this.props.likes.length === 1? 'like':'likes'}</p>}
            
                   
                    {this.props.comments && <CommentList comments={this.sortComments(this.props.comments).slice(0,2)}/>}
                    <div style={{display: this.state.commentVisibilty}}>
                       { this.props.comments.length > 2 && <CommentList comments={this.sortComments(this.props.comments).slice(2)}/>}
                    </div>
                    { this.props.comments.length > 2 && <button style={{display: this.state.commentButtonVisibilty}} className = "commentLink" onClick={this.moreComments}>view all {this.props.comments.length} comments</button>}
                    <CommentForm className="commentForm" onSubmit={(comment) => {
                        this.props.dispatch(startAddComment(this.props._id, comment));
                    }} />    
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps)(PostListItem);



            
import React from 'react';
import moment from 'moment';
import { firebase } from '../firebase/firebase';

export default class CommentFrom extends React.Component{
   constructor(props){
       super(props);
        this.state = {
            text:'',
            author: firebase.auth().currentUser.uid,
            createdAt: moment()
        }
    }
        onCommentChange = (e) =>{
           const text = e.target.value;
           this.setState({ text });
        }
        onSubmit = (e) => {
            e.preventDefault();
            this.props.onSubmit({
                text: this.state.text,
                author: this.state.author,
                createdAt:this.state.createdAt.valueOf()
            });
            this.state.text = "";
        }
        render(){
            return(
                <div>
                    <form className="commentForm">
                        <textarea
                          className="commentBox"
                          placeholder="Add a comment..."
                          value={this.state.text}
                          onChange={this.onCommentChange}
                        >
                        </textarea>
                        <button className="comment__button" onClick={this.onSubmit}>Add</button>
                    </form>
                </div>
            )
        }
    
}
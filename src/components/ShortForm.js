import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class Short extends React.Component {
    constructor(props){
    super(props);
    this.state = {
       count:200,
       author: {uid : props.postedBy.uid, name: props.postedBy.name, avatar: props.postedBy.avatar},
       category: props.post? props.post.category:'short',
       caption: props.post? props.post.caption:'',
       tags: props.post? props.post.tags:[],
       createdAt:props.post? moment(props.post.createdAt): moment(),
       submitB: 'Post'
    }
    }
    ontextChange = (e) =>{
        const texts = e.target.value;
         const max = 200;
         this.setState({count:max-texts.length});
         this.setState(() => ({ caption:texts }), () => this.addTag());
    };

    addTag = () => {
        const tags = this.state.caption.match(/#\w+/g);
        this.setState(() => ({ tags }));
            
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log({
            author: this.state.author,
            category: this.state.category,
            caption: this.state.caption,
            tags : this.state.tags,
            createdAt : this.state.createdAt.valueOf()
        });
        this.props.onSubmit({
            author: this.state.author,
            category: this.state.category,
            caption: this.state.caption,
            tags : this.state.tags,
            createdAt : this.state.createdAt.valueOf()
        });
        this.setState({submitB: 'Posting...'});
    }
    
    render() {
      return (
        <div>
            <form className="postForm">
                <textarea 
                    className="textBox"
                    type="text"
                    maxlength="200"
                    rows="6"
                    value={this.state.caption} 
                    onInput={this.ontextChange}
                >
                </textarea>
                <p className="character_counter">{this.state.count} characters left</p>
                <button className="submit" disabled={!this.state.caption} onClick={this.onSubmit}>{this.state.submitB}</button>
            </form>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    console.log(state.currentUser);
    return{
        postedBy:state.currentUser
    }
};
export default connect(mapStateToProps)(Short);
  
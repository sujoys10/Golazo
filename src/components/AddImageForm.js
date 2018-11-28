import React from 'react';
import moment from 'moment';
import { storage } from '../firebase/firebase';
import { connect } from 'react-redux';

class PostForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            percentage: 0,
            author: {uid : props.postedBy.uid, name: props.postedBy.name, avatar: props.postedBy.avatar},
            category: props.post? props.post.category:'image',
            caption: props.post? props.post.caption:'',
            content: props.post? props.post.content:null,
            tags: props.post? props.post.tags:[],
            createdAt:props.post? moment(props.post.createdAt): moment(),
            submitB: 'Post'
        }
    }
    onCaptionChange = (e) => {
        const caption = e.target.value;
        this.setState(() => ({ caption }));
        this.addTag();
    };
    
    addTag = () => {
        const tags = this.state.caption.match(/#\w+/g);
        this.setState(() => ({ tags }));
            
    }

    onContentChange = (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref('images/' + file.name);
   
        const metadata = {
        contentType: 'image/jpeg',
        };
        const task = storageRef.put(file, metadata);
        
        task.on('state_changed', (snapshot) =>{
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            this.setState(() => ({percentage}));
        },
        (error) => {
            console.log(error);
        },
        () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                this.setState(() => ({ content : url}));
            });
        });
    };


    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            author: this.state.author,
            category: this.state.category,
            caption: this.state.caption,
            content : this.state.content,
            tags : this.state.tags,
            createdAt : this.state.createdAt.valueOf()
        });
        this.setState({submitB: 'Posting...'});
    }
    render(){
        return(
            <div>
                <div className="previewImage" style={{ display : this.state.content === null? 'none': 'block' }}>
                    <img src={this.state.content}/>
                </div>
                <form className="postForm">
                    <input 
                        type="file"
                        onChange={this.onContentChange}
                    />
                    <textarea
                        className="textBox"
                        type="text"
                        placeholder="Write something about it..."
                        autoFocus
                        value={this.state.caption}
                        onChange={this.onCaptionChange}
                    >
                    </textarea>
                    <progress className="progressBar"value={this.state.percentage} max="100" id="uploader"></progress>
                    <button className="submit" disabled={!this.state.content} onClick={this.onSubmit}>{this.state.submitB}</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state.currentUser);
    return{
        postedBy:state.currentUser
    }
};
export default connect(mapStateToProps)(PostForm);
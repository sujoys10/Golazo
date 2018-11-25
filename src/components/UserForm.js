import React from 'react';
import { storage } from '../firebase/firebase';

class UserForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar : props.user ? props.user.avatar : '',
            name : props.user ? props.user.name : '',
            bio : props.user ? props.user.bio : '',
            submit : 'Update'
        }
    }
    onAvatarChange = (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref('userAvatar/' + file.name);
   
        const metadata = {
        contentType: 'image/jpeg',
        };
        const task = storageRef.put(file, metadata);
        
        task.on('state_changed', (snapshot) =>{
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
            console.log(error);
        },
        () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                this.setState(() => ({ avatar : url}));
            });
        });
    };

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };
    onBioChange = (e) => {
        const bio = e.target.value;
        this.setState(() => ({ bio }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            name : this.state.name,
            avatar : this.state.avatar,
            bio : this.state.bio
        });
        this.setState({submit: 'Updating...'});
    };

    render(){
        return(
            <div>
                <div className="previewImage-user">
                    <img src={this.state.avatar}/>
                </div>
                <form className="postForm">
                    <input
                        type="file"
                        onChange={this.onAvatarChange} 
                    />
                    <input
                        className="textBox"
                        type="text"
                        placeholder="Your Name"
                        value={this.state.name}
                        onChange={this.onNameChange}
                    />
                    <textarea
                        className="textBox"
                        type="text"
                        placeholder="write about your love of football"
                        value={this.state.bio}
                        onChange={this.onBioChange} >
                    </textarea>
                    <button className="submit" onClick={this.onSubmit}>{this.state.submit}</button>
                </form>
            </div>
        )
    }
}

export default UserForm;
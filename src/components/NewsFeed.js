import React from 'react';
import { connect } from 'react-redux';
import PostListItem from './PostListItem';
import visiblePosts from '../selectors/posts';

class NewsFeed extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="newsFeed">
                {this.props.posts && this.props.posts.map((post) =>{
                    return(
                        <PostListItem 
                        key={post._id}
                        {...post}
                        />
                    );
                })
                }
                </div>
            )
        }
}

const mapStateToProps = (state) => {
    return{
        posts: visiblePosts(state.posts, state.filters)
    }
}


export default connect(mapStateToProps)(NewsFeed);
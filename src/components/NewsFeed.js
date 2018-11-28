import React from 'react';
import { connect } from 'react-redux';
import PostListItem from './PostListItem';
import LoadingPage from './LoadingPage';
import visiblePosts from '../selectors/posts';
import { startSetPost } from '../actions/post';

class NewsFeed extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
     this.props.setPost();   
    }

    render(){
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <LoadingPage style={{width: 'initial'}}/>;
        }
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
        posts: visiblePosts(state.posts, state.filters),
        hasErrored: state.postHasErrored,
        isLoading: state.postIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setPost: () => dispatch(startSetPost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
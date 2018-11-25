import React from 'react';
import { trendingHashtag } from '../actions/extras';
import { connect } from 'react-redux';
import LoadingPage from './LoadingPage';
import PostListItem from './PostListItem';


class TrendingPosts extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchTrendingHashtag(this.props.tag);
    }

    render(){
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <LoadingPage style={{width: 'initial'}}/>;
        }
        return(
            <div>
                <h3 className="trending__header">#{this.props.tag}</h3>
                <div className="postList">
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        posts: state.posts,
        hasErrored: state.postHasErrored,
        isLoading: state.postIsLoading
});

const mapDispatchToProps = (dispatch) => ({
    fetchTrendingHashtag : (tag) => dispatch(trendingHashtag(tag))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPosts);
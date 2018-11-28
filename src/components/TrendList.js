import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class TrendList extends React.Component{
    constructor(){
        super();
        this.state = {
            trending : []
        }
    }

    componentWillMount(){
        axios
            .get('/api/posts/trending')
            .then(res => {
                this.setState({ trending : res.data})
            });
    }
    render(){
           return(
                    <div className="trendList">
                       <p className="trendList__header">Trending hashtags</p>
                       { this.state && this.state.trending.map(tag => {
                           return(
                            <div>
                                <Link to={`/posts/${tag._id.substr(1)}`}><b className="tagName">{tag._id}</b></Link>
                                <p className="tagCount">{`${tag.count} posts` }</p>
                            </div>
                           )
                       })}
                    </div>
                )
            }
}


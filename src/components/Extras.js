import React from 'react';
import TrendingPosts from './TrendingPosts';
import TrendList from './TrendList';

const Extras = (props) => (
    <div className="extras">
        <div className="left__col">
            <TrendingPosts 
                tag={props.match.params.tag}
            />
        </div>
        <div className="right__col">
            <TrendList />
        </div>
    </div>
);

export default Extras;
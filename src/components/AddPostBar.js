import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="addPostBar">
        Add Post ...
    
        <Link to="/addPost"><button className="addPost__button">Image</button></Link>
    </div>
);



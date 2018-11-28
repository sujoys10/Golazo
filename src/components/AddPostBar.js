import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="addPostBar">
        Add Post ...
    
        <Link to="/addImage"><button className="addPost__button">Image</button></Link>
        <Link to="/addShort"><button className="addPost__button">Short</button></Link>
    </div>
);



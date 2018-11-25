import React from 'react';
import { Link } from 'react-router-dom';

const CommentListItem = (props) =>(
    <div className="comment">
      <Link to={`/user/${props.author.uid}`}>
         <h5 className="author__name">{props.author.name}</h5>
      </Link>
      <div className="comment__text">
        {props.text}
      </div>
    </div>
);

export default CommentListItem;
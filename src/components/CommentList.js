import React from 'react';
import CommentListItem from './CommentListItem';

const CommentList = (props) =>(
   <div>
       {props.comments.map(comment =>{
           return(
               <CommentListItem 
                 key = {comment._id}
                 {...comment}
               />
           )
       })}
   </div>
);

export default CommentList;



export const postHasErrored = (state = false, action) => {
    switch(action.type){
        case 'POST_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;    
    }
}

export const postIsLoading = (state = false, action) => {
    switch (action.type) {
        case 'POST_IS_LOADING':{
            return action.isLoading;
        }   
        default:
            return state;
    }
}
const postReducerDefaultState = [];
export const postReducer = (state = postReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_POST':{
            return[
                action.post,
                ...state
            ]
        }
        case 'FIND_POST':
            return action.post
        case 'RESET_POST':{
            return [];  
        }   
        case 'REMOVE_POST':
            return state.filter(post => post._id !== action.id)
        case 'EDIT_POST':
            return state.map(post => {
                if (post._id === action.id){
                   return{
                       ...post,
                       ...action.updates
                   };
                }else{
                    return post;
                }
            });
        case 'LIKE_POST':
           return state.map(post => {
               if(post._id === action.id){
                   return{
                      ...post,
                      likes:[...post.likes,action.likedBy]     
                   }
               }else{
                   return post;
               }
           });
        case 'UNLIKE_POST':
            return state.map(post => {
                if(post._id === action.id){
                    return {
                        ...post,
                        likes : post.likes.filter(liker => liker !== action.likedBy)
                    }
                }else{
                    return post;
                }
            })   
        case 'ADD_COMMENT':
           return state.map(post => {
               if(post._id === action.pid){
                   return{
                       ...post,
                       comments:[...post.comments,action.comment]
                   }
               }else{
                   return post;
               }
           });
        case 'SET_POST':
              return action.posts;
        case 'HASHTAG_POST':
              return action.posts;           
        default:
              return state;        
    }
};


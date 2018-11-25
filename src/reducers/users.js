

export const userHasErrored = (state = false, action) => {
    switch(action.type){
        case 'USER_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;    
    }
}

export const userIsLoading = (state = false, action) => {
    switch (action.type) {
        case 'USER_IS_LOADING':{
            return action.isLoading;
        }   
        default:
            return state;
    }
}

export const users = (state = {}, action) => {
    switch (action.type) {
        case 'USERS_FETCH_DATA_SUCCESS':{
            return action.users;
        }

        case 'EDIT_USER':
                if(state.uid === action.uid){
                    return{
                        ...state,
                        ...action.updates
                    }
                }else{
                    return state;
                }        
        case 'ADD_FOLLOWER':
                if(state.uid === action.user){
                    return{
                        ...state,
                        followers:[...state.followers, action.follower]
                    }
                }else{
                    return state;
                }    
        case 'ADD_FOLLOWING':
                if(state.uid === action.user){
                    return{
                        ...state,
                        followings:[...state.followings, action.following]
                    }
                }else{
                    return state;
                }
        case 'REMOVE_FOLLOWER':
                if(state.uid === action.user){
                    return{
                        ...state,
                        followers: state.followers.filter(user => user !== action.follower)
                    }
                }else{
                    return state;
                }
        case 'REMOVE_FOLLOWING':
                if(state.uid === action.user){
                    return{
                        ...state,
                        following: state.followings.filter(user => user !== action.following)
                    }
                    
                }else{
                    return state;
                }    
        default:
            return state;
    }
}

export const userConnectionReducer = (state={}, action) =>{
    switch(action.type){
        case 'FETCH_CONNECTIONS':
            return action.connections;  
        default:
            return state;    
    }
}

export const searchReducers = (state={}, action) =>{
    switch(action.type){
        case 'FIND_USERS':
            return action.users;    
        default:
            return state;    
    }
}
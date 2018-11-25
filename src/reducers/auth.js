export const authReducer = (state = {}, action) => {
    switch (action.type){
        case 'LOGIN':
            return {
                uid : action.uid,
                name : action.name,
                avatar: action.avatar
            };  
        case 'LOGOUT':
            return {};    
        default :
            return state;    
    }
};

export const currentUserReducer = (state = {}, action) => {
    switch (action.type){
        case 'FETCH_CURRENT_USER_DATA_SUCCESS':
            return action.user; 
         case 'EDIT_USER':
                if(state.uid === action.uid){
                    return{
                        ...state,
                        ...action.updates
                    }
                }else{
                    return state;
                }  
        default: 
            return state;
    }
}

export const userHasErrored = (state = false, action) => {
    switch(action.type){
        case 'USERS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;    
    }
}

export default authReducer;


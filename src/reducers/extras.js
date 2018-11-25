const extraReducerDefaultState = [];

const extraReducer = (state = extraReducerDefaultState, action) => {
    switch(action.type){
        case 'HASHTAG_POST':
            return action.posts;
        default:
            return state;      
    }
}

export default extraReducer;
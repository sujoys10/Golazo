import axios from 'axios';

export const userHasErrored = (bool) => ({
    type: 'USER_HAS_ERRORED',
    hasErrored: bool
});

export const userIsLoading = (bool) => ({
    type: 'USER_IS_LOADING',
    isLoading: bool
});

export const usersFetchDataSuccess = (users) => ({
    type: 'USERS_FETCH_DATA_SUCCESS',
    users
});

 export const usersFetchData = (url) => {
    return (dispatch) => {
        dispatch(userIsLoading(true));
        axios
            .get(`${url}?timestamp=${new Date().getTime()}`)
            .then(res => {
                if(!res){
                    throw Error(res.statusText)
                }
                dispatch(userIsLoading(false));
                return res.data;    
            })
            .then(users => {
                dispatch(usersFetchDataSuccess(users))
            })
            .catch(() => dispatch(userHasErrored(true)));
    }
}

export const resetUser = () =>({
    type: 'RESET_USER',
});

export const addFollower = (id, follower) => {
    return(dispatch) => {
        axios
        .post(`/api/user/${id}/addFollower`, {follower})
        .then(() => {
            dispatch({
                type: 'ADD_FOLLOWER',
                user:id,
                follower
            })
        })
    }
}

export const addFollowing = (uid, following) => dispatch => {
    axios
        .post(`/api/user/${uid}/addFollowing`, {following})
        .then(() => {
            dispatch({
                type: 'ADD_FOLLOWING',
                user:uid,
                following
            })
        })
}

export const removeFollower = (id, follower) => dispatch =>{
    axios
        .post(`/api/user/${id}/removeFollower`, {follower})
        .then(() => {
            dispatch({
                type: 'REMOVE_FOLLOWER',
                user:id,
                follower
            })
        })
}

export const removeFollowing = (uid, following) => dispatch =>{
    axios
        .post(`/api/user/${uid}/removeFollowing`, {following})
        .then(() => {
            dispatch({
                type: 'REMOVE_FOLLOWING',
                user:uid,
                following
            })
        })
} 

export const fetchConnections = (connections) =>{
    return(dispatch) => {
        const uids = connections.join(',');
        axios
            .get(`/api/user/a/${uids}`)
            .then(res => {
                dispatch({
                    type: 'FETCH_CONNECTIONS',
                    connections: res.data
                  })
            }).catch(err =>{
                console.log(err);
            })
    }
}

export const findUsers = (input) => {
    return(dispatch) => {
        axios
            .get(`/api/user/search/${input}`)
            .then(res => {
                dispatch({
                    type: 'FIND_USERS',
                    users: res.data
                  })
            }).catch(err =>{
                console.log(err);
            })
    }
}
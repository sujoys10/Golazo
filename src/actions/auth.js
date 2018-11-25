import { firebase, googleAuthProvider } from '../firebase/firebase';
import axios from 'axios';

export const startLogIn = () =>{
    return (dispatch) => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
                .then(result => {
                    const profile = result.user;
                    const user = {
                        uid : profile.uid,
                        name : profile.displayName,
                        avatar : profile.photoURL
                    }
                    if(result.additionalUserInfo.isNewUser){
                        axios.post(`/api/user`, user)
                            .then((res) => {
                                dispatch(fetchCurrentUserDataSuccess(res.data));
                            });
                    }
        });
    };
 };

export const startLogOut = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

export const login = (uid, name, avatar) => ({
    type: 'LOGIN',
    uid,
    name,
    avatar
});

export const editUser = (uid, updates) =>{
    return(dispatch) => {
        axios
           .post(`/api/user/${uid}/edit`, updates)
           .then((res) =>{
                if(!res){
                    throw Error(res.statusText)
                }
               
               dispatch({
                   type: 'EDIT_USER',
                   uid,
                   updates
               })
            });
    }  
};

export const userHasErrored = (bool) => ({
    type: 'USER_HAS_ERRORED',
    hasErrored: bool
});

export const userIsUpdated = (bool) => ({
    type: 'USER_IS_UPDATING',
    isUpdated: bool
});

export const fetchCurrentUserDataSuccess = (userData) => ({
    type: 'FETCH_CURRENT_USER_DATA_SUCCESS',
    user : userData
});

 export const fetchCurrentUserData = (url) => {
    return (dispatch) => {
        axios
            .get(url)
            .then(res => {
                if(!res){
                    throw Error(res.statusText)
                }
                
                return res.data;    
            })
            .then(user => {
                dispatch(fetchCurrentUserDataSuccess(user))
            })
            .catch(() => dispatch(userHasErrored(true)));
    }
}


export const logout = () => ({
    type: 'LOGOUT'
});


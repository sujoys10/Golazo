import axios from 'axios';

export const postHasErrored = (bool) => ({
    type: 'POST_HAS_ERRORED',
    hasErrored: bool
});

export const postIsLoading = (bool) => ({
    type: 'POST_IS_LOADING',
    isLoading: bool
});

const addPost = (post) => ({
    type: 'ADD_POST',
    post
});

export const startAddPost = (postData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            category ='',
            content ='',
            caption ='',
            tags = [],
            author = '',
            createdAt = 0,
            likes = [],
            comments = []
        } = postData;

        const post = {category, content, caption, tags, author, createdAt, likes, comments};
     return axios
            .post(`/api/posts/${uid}`, post)
            .then(res => {
                const x = {
                    ...res.data,
                    author
                }
                dispatch(addPost(x));
                }
               );
    };
}

const setPost = (posts) => ({
    type: 'SET_POST',
    posts
});


export const startSetPost = () => {
    return (dispatch) => {
        dispatch(postIsLoading(true));
        return axios
                  .get('/api/posts')
                  .then((res) =>{
                    if(!res){
                        throw Error(res.statusText)
                    }
                    dispatch(postIsLoading(false));
                    const posts = [];
                    res.data.forEach((childSnapshot) => {
                      posts.push(childSnapshot);
                    });
                    dispatch(setPost(posts));
                }).catch(() => {
                    dispatch(postHasErrored(true))
                });
            }
}


export const resetPost = () => {
    return{
        type: 'RESET_POST'
    }
}

export const findPost = (id) => {
    return (dispatch) => {
        return axios
                .get(`/api/posts/p/${id}`)
                .then(res => {
                    dispatch({
                        type: 'FIND_POST',
                        post: res.data
                    })
                }).catch(err => {
                    console.log(err);
                })
    }
}

const removePost = (id) => ({
    type : 'REMOVE_POST',
    id
});

export const startRemovePost = (id) => {
    return (dispatch) => {
        
        return axios
                .delete(`/api/posts/${id}`, id)
                .then(() => {
                    dispatch(removePost(id));
                });
    }
}



export const editPost = (id, updates) => {
    return (dispatch) => {
        return axios
                 .post(`/api/posts/${id}/edit`, updates)
                 .then(res => {
                     dispatch({
                         type: 'EDIT_POST',
                         id,
                         updates
                     })
                 })
                 .catch(err => {
                     console.log(err);
                 });
    }
}

const likePost = (id,uid) => ({
    type: 'LIKE_POST',
    id,
    likedBy : uid
});

export const startAddLike = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return axios
                .post(`/api/posts/${id}/like`, {uid:uid})
                .then(res => dispatch(likePost(id, uid)))
    }
}

const unlikePost = (id,uid) => ({
    type: 'UNLIKE_POST',
    id,
    likedBy : uid
});

export const startRemoveLike = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return axios
                .post(`/api/posts/${id}/unlike`, {uid:uid})
                .then(res => dispatch(unlikePost(id, uid)))
    }
}



const addComment = (pid, comment) => ({
    type: 'ADD_COMMENT',
    pid,
    comment});

export const startAddComment = (pid, CommentData = {}) => {
    return (dispatch, getState) => {
        const {
            text='',
            author='',
            createdAt=0
        } = CommentData;
        const comment = { text, author, createdAt};
        axios
            .post(`/api/posts/${pid}/comments`, comment)
            .then(res => {
                const author = getState().currentUser;
                const newComment = {...res.data, author};
                dispatch(addComment(pid, newComment));
            })
            .catch(err => {
                console.log(err);
            })
    }
}


import axios from 'axios';
import {postHasErrored, postIsLoading} from './post';


export const trendingHashtag = (hashtag) => {
    return (dispatch) => {
        dispatch(postIsLoading(true));
        return axios
                  .get(`/api/posts/tag?hashtag=${hashtag}`)
                  .then((res) =>{
                    if(!res){
                        throw Error(res.statusText)
                    }
                    dispatch(postIsLoading(false)); 
                    const posts = [];
                    res.data.forEach((childSnapshot) => {
                      posts.push(childSnapshot);
                    });
                    dispatch({
                        type: 'HASHTAG_POST',
                        posts
                    });
                }).catch(() => {
                    dispatch(postHasErrored(true))
                });
            }
}
import moment from 'moment';

const getVisiblePosts = (posts, { text }) => {
    return posts.filter(post => {
      //  console.log(post);
        const textMatch = post.caption.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    }).sort((a,b) =>{
        return b.createdAt - a.createdAt;
    })
}

export default getVisiblePosts;
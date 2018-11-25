const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..' , 'public');
const port = process.env.PORT || 5000;

const user = require('./routes/api/user');
const index = require('./routes/api/index');
const posts = require('./routes/api/posts');
const comments = require('./routes/api/comments');

//BodyParser middileware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(publicPath));

 //db config
const db = require('./config/keys').mongoURI;

//connect to db
mongoose
   .connect(db, {useNewUrlParser: true})
   .then(() => console.log('Mongoose connected...'))
   .catch(err => console.log(err));

//Use Routes
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "https://golazo.herokuapp.com/");
   res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use('/api/user', user);
app.use('/api/posts', index);
app.use('/api/posts', posts);
app.use('/api/posts', comments);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is Up!!');
});
const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostRouter = require('./blog-post-router')

app.use(morgan('common'));

app.use(express.static('public'));

app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`App is listening on port ${process.env.PORT || 8080}`);
});
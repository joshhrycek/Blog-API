const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');
console.log(BlogPosts)

BlogPosts.create("Title 1", "Content 1", "Bill", "Jan 12th 2019")
BlogPosts.create("Title 2", "Content 2", "Dave", "Feb 24th 2019")
BlogPosts.create("Title 3", "Content 3", "Ol'Greg", "March 8th 1989")

function verifyInfo(req, res, next) {
    const requiredFields = ['title', 'content', 'author']
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message)
            return res.status(400).send(message);
        }
    }
    next()
}

function verifyId(req, res, next) {
    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id} must match)`;
        console.error(message)
        return res.status(400).send(message);
    }
    next()
}


router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

router.post('/', [jsonParser, verifyInfo], (req, res) => {
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author)
    res.status(201).json(item)
});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted Blog Post \`${req.params.id}\``);
    res.status(204).end();
});

router.put('/:id', [jsonParser, verifyInfo, verifyId], (req, res) => {
    console.log(`Updating blog post \`${req.params.id}\``);
    
    const updatedItem = BlogPosts.update({
        title: req.body.title,
        content: req.body.content,
        id: req.params.id
    });
    
    res.status(204).end()
});

module.exports = router;
const express = require('express');
const postController = require('./controllers/post');

const app = express();
const port = 3010;

app.get('/posts', async (req, res) => {
    const result = await postController.getPosts(req.query.sort, req.query.page);
    res.send(result);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

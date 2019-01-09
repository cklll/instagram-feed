const express = require('express');
const next = require('next');

const postController = require('./controllers/post');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const port = process.env.PORT || 3000;
        // eslint-disable-next-line no-console
        console.log(`Environment port is ${process.env.PORT} and final port is ${port}`);
        const server = express();
        server.use(express.static('public'));

        server.get('/api/posts', async (req, res) => {
            const result = await postController.getPosts(req.query.sort, req.query.page);
            res.send(result);
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
            if (err) {
                throw err;
            }
            // eslint-disable-next-line no-console
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        // eslint-disable-next-line no-console
        console.error(ex.stack);
        process.exit(1);
    });

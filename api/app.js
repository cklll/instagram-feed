const express = require('express');
const app = express();
const port = 3010;

app.get('/', (req, res) => res.send({
    hello: 'word',
}));

app.listen(port, () => console.log(`Listening on port ${port}!`));

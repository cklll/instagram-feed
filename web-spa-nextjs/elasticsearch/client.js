const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    hosts: [
        process.env.ES_CLIENT_URL,
    ],
});

client.cluster.health({}, (err, resp) => {
    // eslint-disable-next-line no-console
    console.log('-- Client Health --', resp);
});

module.exports = client;

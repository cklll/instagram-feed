const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({ 
    hosts: [
        process.env.ES_CLIENT_URL,
    ],
});

client.cluster.health({}, (err, resp, status) => {
    console.log("-- Client Health --", resp);
});

module.exports = client;  

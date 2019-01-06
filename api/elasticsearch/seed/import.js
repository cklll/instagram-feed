const esClient = require('../client');
const postMappings = require('../mappings/post').default;
const postData = require('../seed/data.json');

(async () => {
    console.log('deleting post index');
    try {
        await esClient.indices.delete({ index: 'post' })
        console.log('success', '\n');
    } catch (error) {
        if (error.body.error.type !== 'index_not_found_exception') {
            console.log('UNKNOWN ERROR');
            return;
        } else {
            console.log('post index does not exist');
        }
    }

    console.log('creating post index');
    await esClient.indices.create({
        index: 'post',
        body: {
            mappings: postMappings,
        },
    });
    console.log('success', '\n');

    console.log(`importing ${postData.length} post data`);
    const bulkBody = postData.reduce((acc, item) => {
        acc.push({ index:  { _index: 'post', _type: '_doc', _id: Number(item.id) } },)
        acc.push({
            ...item,
            id: Number(item.id),
            hash_tags: undefined,
        });
        return acc;
     }, []);
    const resp = await esClient.bulk({
        body: bulkBody,
    });

    if (resp.errors) {
        resp.items.filter(item => Boolean(item.index.error)).forEach((item) => {
            console.log(item.index.error);
        });
        throw new Error('UNKNOWN ERROR');
    }
    
    console.log(`success; took ${resp.took}`, '\n');
})();

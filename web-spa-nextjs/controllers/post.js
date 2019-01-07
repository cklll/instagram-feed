const esClient = require('../elasticsearch/client');
const _ = require('lodash');

const _mapEsPostsToResponse = (esPosts) => {
    return esPosts.hits.hits.map((hit) => {
        const { _source: item } = hit;
        return _.pick(item, [
            'id', 'short_code', 'like_count', 'comment_count', 'caption', 'taken_at', 'media_urls', 'username'
        ]);
    });
}

const getPosts = async (sortType = 'recent', page = 1) => {
    const PAGE_SIZE = 10;
    const fromOffset = (page - 1) * PAGE_SIZE;

    let esPostsResult = [];
    if (sortType === 'hot') {

    } else {
        esPostsResult = await esClient.search({
            index: 'post',
            body: {
                from: fromOffset,
                size: PAGE_SIZE,
                sort: [
                    { taken_at: { order: 'desc' } },
                ],
            },
        });
    }

    return _mapEsPostsToResponse(esPostsResult);
}

module.exports = {
    getPosts,
};

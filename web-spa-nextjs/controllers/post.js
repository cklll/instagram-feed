const _ = require('lodash');

const esClient = require('../elasticsearch/client');

// eslint-disable-next-line no-underscore-dangle
const _mapEsPostsToResponse = (esPosts) => {
    // TODO refactor
    if (!esPosts || !esPosts.hits || !esPosts.hits.hits) {
        return [];
    }

    return esPosts.hits.hits.map((hit) => {
        const { _source: item } = hit;
        return _.pick(item, [
            'id', 'short_code', 'like_count', 'comment_count', 'caption', 'taken_at', 'media_urls', 'username',
        ]);
    });
};

const getPosts = async (sortType = 'recent', page = 1) => {
    const PAGE_SIZE = 10;
    const fromOffset = (page - 1) * PAGE_SIZE;

    let esPostsResult = [];
    if (sortType === 'hot') {
        esPostsResult = await esClient.search({
            index: 'post',
            body: {
                track_scores: true,
                from: fromOffset,
                size: PAGE_SIZE,
                sort: {
                    _script: {
                        type: 'number',
                        script: {
                            lang: 'painless',
                            // log(likeCount) + ((time_diff in ms)/45000000)
                            source: 'Math.log10(doc["like_count"].value) + (doc["taken_at"].value.millis - 1134028003000L) / 45000000',
                        },
                        order: 'desc',
                    },
                },
            },
        });
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
};

module.exports = {
    getPosts,
};

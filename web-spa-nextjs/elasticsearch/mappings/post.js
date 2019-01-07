const mappings = {
    _doc: {
        dynamic: 'strict',
        properties: {
            id: { type: 'long' },
            short_code: { type: 'text' },
            like_count: { type: 'long' },
            comment_count: { type: 'long' },
            caption: { type: 'text' },
            taken_at: {
                type: 'date',
                format: 'epoch_second',
            },
            media_urls: {
                type: 'text',
                fields: {
                    keyword: {
                        type: 'keyword',
                        ignore_above: 256,
                    },
                },
            },
            username: { type: 'text' },
        },
    },
};

exports.default = mappings;

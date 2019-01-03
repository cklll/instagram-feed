const esClient = require('../client');

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
            mappings : {
                _doc : {
                    properties : {
                        id : { type : 'long' },
                        short_code : { type : 'text' },
                        like_count : { type : 'long' },
                        comment_count : { type : 'long' },
                        hash_tags : { type : 'long' },
                        caption : { type : 'text' },
                        taken_at : {
                            type: 'date',
                            format: 'epoch_second',
                        },
                        media_urls : { type : 'long' },
                        username : { type : 'text' },
                    },
                },
            },
        },
    });
    console.log('success', '\n');

    // console.log('importing data');
    // await esClient.bulk({
    //     index: 'post',

    //     body: [
    //       // action description
    //       { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
    //        // the document to index
    //       { title: 'foo' },
    //       // action description
    //       { update: { _index: 'myindex', _type: 'mytype', _id: 2 } },
    //       // the document to update
    //       { doc: { title: 'foo' } },
    //       // action description
    //       { delete: { _index: 'myindex', _type: 'mytype', _id: 3 } },
    //       // no document needed for this delete
    //     ]
    //   });

    // "like_count": 64984,
    // "comment_count": 64984,
    // "caption": "The king on a walkabout.\n-\n\ud83c\udfa5 @primuscat\n-\n@meowed #cat #majestictail #9gag",
    // "id": "1948017988724710605",
    // "short_code": "BsIwAoqAdzN",
    // "hash_tags": [
    //     "majestictail",
    //     "cat",
    //     "9gag"
    // ],
    // "taken_at": 1546441881,
    // "media_urls": [
    //     "https://instagram.fhkg1-1.fna.fbcdn.net/vp/a3d5c71dafd314fcd1538eca9181d88c/5C2FCFBF/t50.2886-16/49787800_945798905624870_7435423322428407808_n.mp4?_nc_ht=instagram.fhkg1-1.fna.fbcdn.net"
    // ],
    // "username": "9gag"
    // console.log('success', '\n');
})();

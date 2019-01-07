import React from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';
import utils from '../utils';

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log(utils);
        this.state = {
            posts: props.posts,
        };
    }

    render() {
        const { posts } = this.state;
        const postComponents = posts.map((post) => {
            const mediaComponents = post.media_urls.map((url) => {
                if (utils.getMediaType(url) === 'MP4') {
                    return (
                        <video width="320" height="240" controls>
                            <source src={url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    );
                }
                if (utils.getMediaType(url) === 'JPG') {
                    return (
                        <img src={url} alt={`img for ${post.id}`} />
                    );
                }
                return <p>UNKNOWN MEDIA TYPE</p>;
            });
            return (
                <section key={post.id}>
                    <p>{ post.username }</p>
                    { mediaComponents }
                    { post.media_urls.map(url => <p>{ url }</p>) }
                    <p>{ post.caption }</p>
                    <p>{ post.comment }</p>
                    <p>{ post.taken_at }</p>
                </section>
            );
        });
        return (
            <div>
                { postComponents }
            </div>
        );
    }
}

HomePage.getInitialProps = async () => {
    const posts = await api.getPosts('recent', 1);
    return {
        posts,
    };
};

HomePage.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id:	PropTypes.number.isRequired,
        like_count: PropTypes.number.isRequired,
        short_code: PropTypes.string.isRequired,
        comment_count: PropTypes.number.isRequired,
        caption: PropTypes.string.isRequired,
        taken_at: PropTypes.number.isRequired,
        media_urls: PropTypes.arrayOf(PropTypes.string).isRequired,
        username: PropTypes.string.isRequired,
    })).isRequired,
};

export default HomePage;

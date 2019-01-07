import React from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';
import Media from '../components/Media';

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            posts: props.posts,
        };
    }

    render() {
        const { posts } = this.state;
        const postComponents = posts.map((post) => {
            const mediaComponents = post.media_urls
                .map(url => (
                    <Media url={url} />
                ));
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
        id: PropTypes.number.isRequired,
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

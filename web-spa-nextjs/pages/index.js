import React from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';
import utils from '../utils';
import Media from '../components/Media';

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.lastLoadedPage = 1;
        this.state = {
            isLoading: false,
            posts: props.posts,
        };
    }

    loadMorePosts = async () => {
        this.lastLoadedPage += 1;
        await utils.setStatePromise(this, {
            isLoading: true,
        });

        const newLoadedPosts = await api.getPosts('recent', this.lastLoadedPage);
        // TODO check if the new loaded post already exist if this.state.posts
        this.setState(prevState => ({
            posts: [
                ...prevState.posts,
                ...newLoadedPosts,
            ],
            isLoading: false,
        }));
    }

    render() {
        const { posts, isLoading } = this.state;
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
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={this.loadMorePosts}
                >
                    Load More
                </button>
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

import React from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';
import utils from '../utils';

import Media from './Media';

class PostList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.lastLoadedPage = 1;
        this.state = {
            isLoading: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.sortType !== props.sortType) {
            return {
                posts: props.initialPosts,
                sortType: props.sortType,
            };
        }
        return null;
    }

    loadMorePosts = async () => {
        this.lastLoadedPage += 1;
        await utils.setStatePromise(this, {
            isLoading: true,
        });
        const { sortType } = this.state;
        const newLoadedPosts = await api.getPosts(sortType, this.lastLoadedPage);
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
                    <div className="post__title-row">
                        <h2 className="post__username-title">
                            <a
                                href={`https://www.instagram.com/${post.username}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="post__username-link"
                            >
                                { post.username }
                            </a>
                        </h2>
                        <p className="post__taken-at">
                            <a
                                href={`https://www.instagram.com/p/${post.short_code}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="post__taken-at-link"
                            >
                                { post.taken_at }
                            </a>
                        </p>
                    </div>
                    { mediaComponents }
                    <div className="post__statistics-row">
                        <p className="post__like-count-container">
                            <span className="like-count__emoji">Likes: </span>
                            <span className="like-count">{ post.like_count }</span>
                        </p>
                        <p className="post__comment-count-container">
                            <span className="comment-count__emoji">Comments: </span>
                            <span className="comment-count">{ post.comment_count }</span>
                        </p>
                    </div>
                    <p>{ post.caption }</p>
                </section>
            );
        });
        return (
            <main>
                { postComponents }
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={this.loadMorePosts}
                >
                    Load More
                </button>
            </main>
        );
    }
}

/* eslint-disable react/no-unused-prop-types */
// https://github.com/yannickcr/eslint-plugin-react/issues/1751
PostList.propTypes = {
    initialPosts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        like_count: PropTypes.number.isRequired,
        short_code: PropTypes.string.isRequired,
        comment_count: PropTypes.number.isRequired,
        caption: PropTypes.string.isRequired,
        taken_at: PropTypes.number.isRequired,
        media_urls: PropTypes.arrayOf(PropTypes.string).isRequired,
        username: PropTypes.string.isRequired,
    })).isRequired,
    sortType: PropTypes.string.isRequired,
};
/* eslint-enable react/no-unused-prop-types */

export default PostList;

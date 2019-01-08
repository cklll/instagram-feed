import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import api from '../services/api';
import utils from '../utils';

import Media from './Media';
import Caption from './Caption';

class PostList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.sortType !== props.sortType) {
            return {
                posts: props.initialPosts,
                sortType: props.sortType,
                endOfPosts: false,
                lastLoadedPage: 1,
            };
        }
        return null;
    }

    loadMorePosts = async () => {
        const { lastLoadedPage } = this.state;
        await utils.setStatePromise(this, {
            isLoading: true,
        });
        const { sortType } = this.state;
        const newLoadedPosts = await api.getPosts(sortType, lastLoadedPage + 1);
        // TODO check if the new loaded post already exist if this.state.posts
        this.setState(prevState => ({
            posts: [
                ...prevState.posts,
                ...newLoadedPosts,
            ],
            isLoading: false,
            endOfPosts: newLoadedPosts.length === 0,
            lastLoadedPage: lastLoadedPage + 1,
        }));
    }

    render() {
        const { posts, isLoading, endOfPosts } = this.state;
        const postComponents = posts.map((post) => {
            const mediaComponents = post.media_urls
                .map(url => (
                    <Media key={url} url={url} />
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
                                { moment(post.taken_at * 1000).fromNow() }
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
                    <Caption caption={post.caption} />
                </section>
            );
        });
        return (
            <main>
                { postComponents }
                <div className="post-list__load-more-container">
                    { !endOfPosts && (
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={this.loadMorePosts}
                            className="button button--load-more"
                        >
                            Load More
                        </button>
                    )}
                    { endOfPosts && (
                        <p className="post-list__no-more-remarks">Sorry, No more posts available.</p>
                    )}
                </div>
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

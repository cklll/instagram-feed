import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import api from '../services/api';

import Header from '../components/Header';
import PostList from '../components/PostList';

class HomePage extends React.PureComponent {
    render() {
        const { posts, sortType } = this.props;
        return (
            <React.Fragment>
                <Head>
                    <title>My Instagram Feed</title>
                    <link rel="stylesheet" href="/app.css" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>
                <Header activeSortType={sortType} />
                <PostList
                    initialPosts={posts}
                    sortType={sortType}
                />
            </React.Fragment>
        );
    }
}

HomePage.getInitialProps = async ({ query }) => {
    const AVAILABLE_SORT_TYPES = {
        recent: 'recent',
        hot: 'hot',
    };
    const sortTypeFromQuery = query.sort;
    const sortType = AVAILABLE_SORT_TYPES[sortTypeFromQuery] || 'recent';
    const posts = await api.getPosts(sortType, 1);
    return {
        posts,
        sortType,
    };
};

HomePage.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    sortType: PropTypes.string.isRequired,
};

export default HomePage;

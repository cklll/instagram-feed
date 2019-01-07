import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Header = ({ activeSortType }) => (
    <header>
        <nav>
            <ul>
                <li className={activeSortType === 'recent' ? 'active' : ''}>
                    <Link href="/?sort=recent">
                        <a>New</a>
                    </Link>
                </li>
                <li className={activeSortType === 'hot' ? 'active' : ''}>
                    <Link href="/?sort=hot">
                        <a>Hot</a>
                    </Link>
                </li>
            </ul>
        </nav>
        <style jsx>
            {
                `
                    ul {
                        text-align: center;
                    }
                    li {
                        display: inline-block;
                        margin: 0 20px;
                    }
                    .active {
                        background-color: yellow;
                    }
                `
            }
        </style>
    </header>
);

Header.propTypes = {
    activeSortType: PropTypes.string.isRequired,
};

export default Header;

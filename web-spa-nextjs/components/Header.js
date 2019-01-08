import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Header = ({ activeSortType }) => (
    <header className="header">
        <nav>
            <ul className="nav__list-container">
                <li className={activeSortType === 'recent' ? 'nav__list-item nav__list-item--active' : 'nav__list-item'}>
                    <Link href="/?sort=recent">
                        <a>New</a>
                    </Link>
                </li>
                <li className={activeSortType === 'hot' ? 'nav__list-item nav__list-item--active' : 'nav__list-item'}>
                    <Link href="/?sort=hot">
                        <a>Hot</a>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
);

Header.propTypes = {
    activeSortType: PropTypes.string.isRequired,
};

export default Header;

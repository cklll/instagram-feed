import React from 'react';
import PropTypes from 'prop-types';

const Caption = ({ caption }) => {
    const hashTahRegex = /(#[^\s]+)/g;
    const usernameRegex = /(@[^\s]+)/g;
    const masterRegex = /(#[^\s]+)|(@[^\s]+)/g;
    // TODO \n not replaced with <br />
    const splitCaptions = caption.split(masterRegex).filter(Boolean);

    const captionWithLinked = splitCaptions.map((captionPart, index) => {
        if (hashTahRegex.test(captionPart)) {
            return (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index}>
                    <a
                        // create a config for instagram url prefix
                        href={`https://www.instagram.com/explore/tags/${captionPart.slice(1)}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        { captionPart }
                    </a>
                </span>
            );
        }
        if (usernameRegex.test(captionPart)) {
            return (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index}>
                    <a
                        href={`https://www.instagram.com/${captionPart.slice(1)}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        { captionPart }
                    </a>
                </span>
            );
        }
        return (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index}>
                { captionPart }
            </span>
        );
    });
    return (
        <p>{ captionWithLinked }</p>
    );
};

Caption.propTypes = {
    caption: PropTypes.string.isRequired,
};

export default Caption;

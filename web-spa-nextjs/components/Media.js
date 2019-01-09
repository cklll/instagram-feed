import React from 'react';
import PropTypes from 'prop-types';

import utils from '../utils';

const Media = ({ url }) => {
    if (utils.getMediaType(url) === 'MP4') {
        return (
            <video
                className="post__media post__media--video"
                width="320"
                height="240"
                controls
            >
                <source src={url} type="video/mp4" />
                The file is not found or your browser does not support the video tag.
            </video>
        );
    }
    if (utils.getMediaType(url) === 'JPG') {
        return (
            <img
                className="post__media post__media--image"
                src={url}
                alt={url}
            />
        );
    }
    return (
        <p>
            UNKNOWN MEDIA TYPE:
            { url }
        </p>
    );
};

Media.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Media;

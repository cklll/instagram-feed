const getMediaType = (url) => {
    if (url.indexOf('mp4?') !== -1) {
        return 'MP4';
    }
    if (url.indexOf('jpg?') !== -1) {
        return 'JPG';
    }
    return null;
};

const setStatePromise = (component, state) => (
    new Promise(resolve => component.setState(state, resolve))
);

export default {
    getMediaType,
    setStatePromise,
};

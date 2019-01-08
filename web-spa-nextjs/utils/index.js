const getMediaType = (url) => {
    if (url.endsWith('mp4')) {
        return 'MP4';
    }
    if (url.endsWith('jpg')) {
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

const getMediaType = (url) => {
    if (/\.mp4/i.test(url)) {
        return 'MP4';
    }
    if (/\.jpg/i.test(url)) {
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

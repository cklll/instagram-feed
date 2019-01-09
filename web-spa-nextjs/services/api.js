import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

// eslint-disable-next-line no-underscore-dangle
const _parseResponse = async (response) => {
    const body = await response.text();

    if (!response.ok) {
        let errorObj;
        try {
            errorObj = JSON.parse(body);
        } catch (e) {
            errorObj = { message: body, status: response.status };
            throw errorObj;
        }
        throw errorObj;
    }

    try {
        return JSON.parse(body);
    } catch (e) {
        return body;
    }
};

// eslint-disable-next-line no-underscore-dangle
const _parseParamsToQueryString = (params) => {
    const result = Object
        .entries(params)
        .filter(([, value]) => !(Array.isArray(value) && value.length === 0))
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value
                    .map(item => `${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`)
                    .join('&');
            }

            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');

    return result
        ? `?${result}`
        : '';
};

// eslint-disable-next-line no-underscore-dangle
const _req = async (method, url, params = {}) => {
    // TODO not clean
    // server and client sides
    const API_PREFIX = process.env.API_PREFIX || getConfig().publicRuntimeConfig.API_PREFIX;

    const reqUrl = (method === 'GET')
        ? API_PREFIX + url + _parseParamsToQueryString(params)
        : API_PREFIX + url;
    const response = await fetch(reqUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseJson = await _parseResponse(response);
    return responseJson;
};

export default {
    getPosts: async (sortType, page) => _req('GET', 'posts', { sort: sortType, page }),
};

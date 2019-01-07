module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
    },
    "env": {
        "node": true,
        "browser": true,
    },
    "rules": {
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-filename-extension": 0,
        "jsx-a11y/media-has-caption": ["off"],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": ["Link"],
            "specialLink": ["hrefLeft", "hrefRight"],
            "aspects": ["invalidHref", "preferButton"],
        }],
    },
};

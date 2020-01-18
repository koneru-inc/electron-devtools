module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    root: true,
    plugins: ['prettier', 'svelte3'],
    overrides: [
        {
            files: ['**/*.svelte'],
            processor: 'svelte3/svelte3',
        },
        {
            files: ['**/*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 0,
                '@typescript-eslint/explicit-function-return-type': 0,
            },
        },
    ],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
    },
    settings: {
        'svelte3/ignore-styles': attributes => attributes.lang === 'scss',
    },
};

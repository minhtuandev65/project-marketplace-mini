module.exports = {
    env: { es2020: true, node: true },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        allowImportExportEverywhere: true
    },
    plugins: [],
    rules: {
        'no-console': 1,
        'no-extra-boolean-cast': 0,
        'no-lonely-if': 1,
        'no-unused-vars': 1,
        'no-trailing-spaces': 1,
        'no-multiple-empty-lines': 1,
        'linebreak-style': 0,
        'no-unexpected-multiline': 'warn',
        'prettier/prettier': ['error', { endOfLine: 'auto' }]
    }
}

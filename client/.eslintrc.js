module.exports = {
    root: true,
    ignorePatterns: ['projects/**/*'],
    overrides: [
        {
            files: ['*.ts'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@angular-eslint/recommended',
                'plugin:@angular-eslint/template/process-inline-templates',
                'plugin:prettier/recommended',
            ],
            plugins: ['unused-imports'],
            rules: {
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        type: 'attribute',
                        prefix: 'coded',
                        style: 'camelCase',
                    },
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        type: 'element',
                        prefix: 'coded',
                        style: 'kebab-case',
                    },
                ],
                'unused-imports/no-unused-imports': 'error',
                'no-console': ['error', { allow: ['warn', 'error'] }],
            },
        },
        {
            files: ['*.html'],
            extends: [
                'plugin:@angular-eslint/template/recommended',
                'plugin:@angular-eslint/template/accessibility',
            ],
            rules: {},
        },
        {
            files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
            parserOptions: {
                project: './tsconfig.spec.json',
            },
            extends: ['plugin:jasmine/recommended'],
            plugins: ['jasmine'],
            env: {
                jasmine: true,
            },
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
    ],
};

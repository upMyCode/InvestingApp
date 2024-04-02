module.exports = {
	root: true,
	extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier', 'plugin:react-hooks/recommended'],
	overrides: [],
	parserOptions: {
		project: ['./tsconfig.json'],
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
	rules: {
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		'simple-import-sort/exports': 'error',
		'no-unmodified-loop-condition': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/consistent-type-assertions': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: 'react',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '@**',
						group: 'external',
						position: 'after',
					},
					{
						pattern: '*',
						group: 'external',
						position: 'after',
					},                                                                                     
				],
				pathGroupsExcludedImportTypes: ['react'],
				'newlines-between': 'always',
				groups: ['external', 'builtin', 'index', 'sibling', 'parent', 'internal', 'object', 'type'],
			},
		],
	},
};

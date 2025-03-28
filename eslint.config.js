import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import typescript from 'typescript-eslint';

const SRC_GLOB = '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}';
const TYPESCRIPT_GLOB = '**/*.{ts,cts,mts,tsx}';
const CODE_STYLE_GLOB = '**/*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,json}';

const ERROR = 'error';
const WARN = 'warn';
const OFF = 'off';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: [
			'**/node_modules/**/*',
			'.vscode/**/*',
			'.rollup.cache/**/*',
			'vite.config.ts.*',
			'vitest.config.ts.*',
		],
	},

	// #region ecmascript
	{
		files: [SRC_GLOB],
		languageOptions: {
			ecmaVersion: 2023,
			globals: { ...globals.node },
			sourceType: 'module',
		},
		rules: {
			'array-callback-return': ERROR,
			'capitalized-comments': [
				WARN,
				'never',
				{
					block: { ignorePattern: '.*' },
					line: {
						ignoreConsecutiveComments: true,
						ignorePattern: '[A-Z]*:.*',
					},
				},
			],
			complexity: [WARN, 15],
			'constructor-super': ERROR,
			'default-case': WARN,
			'default-case-last': WARN,
			'default-param-last': WARN,
			eqeqeq: WARN,
			'for-direction': ERROR,
			'func-style': [WARN, 'declaration', { allowArrowFunctions: true }],
			'getter-return': [ERROR, { allowImplicit: true }],
			'grouped-accessor-pairs': WARN,
			'max-classes-per-file': [WARN, { ignoreExpressions: true, max: 1 }],
			'max-params': [WARN, 5],
			'no-async-promise-executor': ERROR,
			'no-case-declarations': ERROR,
			'no-class-assign': ERROR,
			'no-compare-neg-zero': ERROR,
			'no-cond-assign': ERROR,
			'no-const-assign': ERROR,
			'no-constant-binary-expression': ERROR,
			'no-constant-condition': ERROR,
			'no-control-regex': ERROR,
			'no-debugger': WARN,
			'no-delete-var': ERROR,
			'no-dupe-args': ERROR,
			'no-dupe-class-members': ERROR,
			'no-dupe-else-if': ERROR,
			'no-dupe-keys': ERROR,
			'no-duplicate-case': ERROR,
			'no-empty': ERROR,
			'no-empty-character-class': ERROR,
			'no-empty-pattern': ERROR,
			'no-empty-static-block': ERROR,
			'no-ex-assign': ERROR,
			'no-extra-boolean-cast': ERROR,
			'no-extra-label': WARN,
			'no-fallthrough': ERROR,
			'no-func-assign': ERROR,
			'no-global-assign': ERROR,
			'no-import-assign': ERROR,
			'no-invalid-regexp': ERROR,
			'no-irregular-whitespace': ERROR,
			'no-lonely-if': WARN,
			'no-loss-of-precision': ERROR,
			'no-misleading-character-class': ERROR,
			'no-mixed-spaces-and-tabs': [WARN, 'smart-tabs'],
			'no-new-native-nonconstructor': ERROR,
			'no-new-symbol': OFF,
			'no-new-wrappers': WARN,
			'no-nonoctal-decimal-escape': ERROR,
			'no-obj-calls': ERROR,
			'no-octal': ERROR,
			'no-prototype-builtins': ERROR,
			'no-redeclare': ERROR,
			'no-regex-spaces': ERROR,
			'no-return-await': WARN,
			'no-self-assign': ERROR,
			'no-self-compare': WARN,
			'no-setter-return': ERROR,
			'no-shadow-restricted-names': ERROR,
			'no-sparse-arrays': ERROR,
			'no-this-before-super': ERROR,
			'no-throw-literal': ERROR,
			'no-undef': ERROR,
			'no-undef-init': WARN,
			'no-unexpected-multiline': ERROR,
			'no-unneeded-ternary': WARN,
			'no-unreachable': ERROR,
			'no-unreachable-loop': WARN,
			'no-unsafe-finally': ERROR,
			'no-unsafe-negation': ERROR,
			'no-unsafe-optional-chaining': ERROR,
			'no-unused-labels': WARN,
			'no-unused-private-class-members': WARN,
			'no-unused-vars': WARN,
			'no-useless-backreference': ERROR,
			'no-useless-catch': ERROR,
			'no-useless-computed-key': WARN,
			'no-useless-escape': ERROR,
			'no-useless-return': ERROR,
			'no-var': ERROR,
			'no-with': ERROR,
			'object-shorthand': WARN,
			'prefer-arrow-callback': WARN,
			'prefer-const': WARN,
			'prefer-exponentiation-operator': WARN,
			'prefer-promise-reject-errors': WARN,
			'prefer-regex-literals': WARN,
			'prefer-rest-params': WARN,
			'prefer-spread': WARN,
			'prefer-template': WARN,
			'quote-props': [WARN, 'as-needed'],
			quotes: [
				WARN,
				'single',
				{
					allowTemplateLiterals: false,
					avoidEscape: true,
				},
			],
			radix: [WARN, 'as-needed'],
			'require-atomic-updates': WARN,
			'require-await': ERROR,
			'require-unicode-regexp': WARN,
			'require-yield': ERROR,
			'use-isnan': ERROR,
			'valid-typeof': ERROR,
			yoda: WARN,
		},
	},
	// #endregion

	// #region typescript
	typescript.configs.strict[0],
	{
		files: [TYPESCRIPT_GLOB],
		languageOptions: {
			parserOptions: {
				emitDecoratorMetadata: true,
				project: ['tsconfig.json'],
			},
		},
		rules: {
			...typescript.configs.strict[1].rules,
			...typescript.configs.strict[2].rules,
			'@typescript-eslint/consistent-type-imports': [
				WARN,
				{
					fixStyle: 'inline-type-imports',
					prefer: 'type-imports',
				},
			],
			'@typescript-eslint/explicit-function-return-type': OFF,
			'@typescript-eslint/explicit-module-boundary-types': OFF,
			'@typescript-eslint/interface-name-prefix': OFF,
			'@typescript-eslint/no-empty-function': WARN,
			'@typescript-eslint/no-empty-interface': [
				ERROR,
				{ allowSingleExtends: true },
			],
			'@typescript-eslint/no-empty-object-type': OFF,
			'@typescript-eslint/no-explicit-any': OFF,
			'@typescript-eslint/no-extraneous-class': OFF,
			'@typescript-eslint/no-floating-promises': [
				WARN,
				{
					ignoreIIFE: true,
					ignoreVoid: true,
				},
			],
			'@typescript-eslint/no-namespace': [
				WARN,
				{ allowDeclarations: true },
			],
			'@typescript-eslint/no-non-null-assertion': OFF,
			'@typescript-eslint/no-redundant-type-constituents': ERROR,
			'@typescript-eslint/no-unsafe-function-type': OFF,
			'@typescript-eslint/no-unused-vars': [
				WARN,
				{
					args: 'after-used',
					argsIgnorePattern: '^_.*',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_.*',
					destructuredArrayIgnorePattern: '^_.*',
					ignoreRestSiblings: true,
					vars: 'local',
					varsIgnorePattern: '^_.*',
				},
			],
			'@typescript-eslint/no-use-before-define': [
				ERROR,
				{
					classes: false,
					enums: true,
					functions: false,
					ignoreTypeReferences: true,
					typedefs: true,
					variables: true,
				},
			],
			'@typescript-eslint/no-wrapper-object-types': WARN,
			'@typescript-eslint/sort-type-constituents': [
				WARN,
				{
					checkIntersections: true,
					checkUnions: true,
					groupOrder: [
						'named',
						'keyword',
						'operator',
						'literal',
						'function',
						'import',
						'conditional',
						'object',
						'tuple',
						'intersection',
						'union',
						'nullish',
					],
				},
			],
		},
	},
	// #endregion

	// #region prettier
	{
		files: [CODE_STYLE_GLOB],
		...prettier,
		rules: { 'prettier/prettier': WARN },
	},
	// #endregion
];

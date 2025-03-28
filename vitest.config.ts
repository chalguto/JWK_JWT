import type { UserConfigExport } from 'vitest/config';

export default {
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{spec,test}.?(c|m)[jt]s?(x)'],
		reporters: ['verbose'],
		setupFiles: ['@testing-library/jest-dom/vitest'],
	},
} satisfies UserConfigExport;

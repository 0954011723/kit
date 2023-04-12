// 需要檢查的 adapter 清單。 `version` 用於安裝 adapter 指定的版本，adapter-auto 會依 peerDependency 所描述的版本來安裝 SvelteKit 相容的最新版本。
export const adapters = [
	{
		name: 'Vercel',
		test: () => !!process.env.VERCEL,
		module: '@sveltejs/adapter-vercel',
		version: '2'
	},
	{
		name: 'Cloudflare Pages',
		test: () => !!process.env.CF_PAGES,
		module: '@sveltejs/adapter-cloudflare',
		version: '2'
	},
	{
		name: 'Netlify',
		test: () => !!process.env.NETLIFY,
		module: '@sveltejs/adapter-netlify',
		version: '2'
	},
	{
		name: 'Azure Static Web Apps',
		test: () => process.env.GITHUB_ACTION_REPOSITORY === 'Azure/static-web-apps-deploy',
		module: 'svelte-adapter-azure-swa',
		version: '0.13'
	}
];

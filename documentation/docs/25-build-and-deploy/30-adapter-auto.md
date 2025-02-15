---
title: Zero-config 部署
---

當您使用 `npm create svelte@latest` 建立新的 SvelteKit 專案時，預設會安裝 [`adapter-auto`](/packages/adapter-auto)。
該轉接器在部署時會自動安裝和使用支援目前環境的轉接器：
```
npm create svelte@latest`
```

- [`@sveltejs/adapter-cloudflare`](/documentation/docs/25-build-and-deploy/60-adapter-cloudflare.md) 用於 [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [`@sveltejs/adapter-netlify`](/documentation/docs/25-build-and-deploy/80-adapter-netlify.md) 用於 [Netlify](https://netlify.com/)
- [`@sveltejs/adapter-vercel`](/documentation/docs/25-build-and-deploy/90-adapter-vercel.md) 用於 [Vercel](https://vercel.com/)
- [`svelte-adapter-azure-swa`](https://github.com/geoffrich/svelte-adapter-azure-swa) 用於 [Azure Static Web Apps](https://docs.microsoft.com/zh-tw/azure/static-web-apps/)

建議在確定目標環境後，將相應的轉接器安裝到 `devDependencies` 中，因為這會將轉接器新增到`鎖定檔`中並稍微改進 CI 的安裝時間。

## 特定環境設定

要新增設定選項（例如：[`adapter-vercel`](/documentation/docs/25-build-and-deploy/90-adapter-vercel.md) 和 [`adapter-netlify`](/documentation/docs/25-build-and-deploy/80-adapter-netlify.md) 中的 `{ edge: true }`），必須安裝基礎轉接器( `underlying adapter`)，`adapter-auto` 不會使用任何選項。

## 加入社群轉接器

您可以編輯 [adapters.js](/packages/adapter-auto/adapters.js) 並開啟取回 (pull) 請求來增加對其他轉接器的 Zero-config 支援。

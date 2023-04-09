## 前置處理器

前置處理器會在將 `.svelte` 檔案傳遞給編譯器之前轉換檔案。例如： 某個 `.svelte` 檔案使用 TypeScript 和 PostCSS，必須先被轉換成 JavaScript 和 CSS，以便 Svelte 編譯器能夠處理。
有許多可用的 [前置處理器](https://sveltesociety.dev/tools#preprocessors) ，Svelte 團隊維護以下兩種官方前置處理器。

### `vitePreprocess`

`vite-plugin-svelte` 提供 [`vitePreprocess`](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/preprocess.md) 功能，利用 Vite 進行前置處理。
使它能夠處理 Vite 支援的程式語言類型：TypeScript、PostCSS、SCSS、Less、Stylus 和 SugarSS。
為了方便起見，它從 `@sveltejs/kit/vite` 套件中重新匯出，如果使用 TypeScript 專案則預設值會包含以下程式碼：

```js
// svelte.config.js
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
  preprocess: [vitePreprocess()]
};
```

### `svelte-preprocess`

`svelte-preprocess` 具有 `vitePreprocess` 中找不到的附加功能，例如： Pug、Babel 和全區風格的支援。
但 `vitePreprocess` 更快且只需較少的設定，因此預設使用它。請注意，SvelteKit 不支援 CoffeeScript。

需要安裝 `svelte-preprocess`，並將其添加到您的[`svelte.config.js`](https://github.com/sveltejs/svelte-preprocess/blob/main/docs/usage.md#with-svelte-config)。
```
npm install --save-dev svelte-preprocess
``` 
之後再 [安裝相應的套件](https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md)，例如： `sass`或 `less`
```
npm install -D sass
```
```
npm install -D less
```
## 整合程式

[Svelte Adders](https://sveltesociety.dev/templates#adders) 可以使用單個命令設定許多不同的複雜整合，如 Tailwind、PostCSS、Storybook、Firebase、GraphQL、mdsvex 等等。
請參閱 [sveltesociety.dev](https://sveltesociety.dev/) 獲取可用於 Svelte 和 SvelteKit 的範本、組件和工具的完整清單。

## 整合常見問題

SvelteKit 常見問題解答中有一節 [關於整合](/faq#integrations)，如果還有問題，可以參考該節。

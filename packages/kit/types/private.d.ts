// 這個模組包含在文件中可見但無法從 @sveltejs/kit 中匯入的類型。
// 在編輯此文件時，應注意避免破壞更改。

import { RouteDefinition } from './index.js';

export interface AdapterEntry {
	/**
   * 字串，唯一地識別 HTTP 服務（例如：無伺服器函式），並用於去重。例如，/foo/a-[b] 和 /foo/[c]
   * 是不同的路由，但在 Netlify 的 _redirects 文件中都表示為 /foo/:param，因此它們共享一個 ID。
   */
	id: string;

	/**
	 * 這個函式，用於比較候選路由與當前路由以確定是否應將其與當前路由分組。
	 *
	 * 使用範例：
	 * - 備援頁面: `/foo/[c]` 是 `/foo/a-[b]` 的備援選項，而`/[...catchall]` 則是所有路由的備援選項。
	 * - `config` 共用的路由進行分組: `/foo` 應該部署到邊緣節點，`/bar` 和 `/baz` 則應該部署到無伺服器函數。
	 */
	filter(route: RouteDefinition): boolean;

	/**	 
	 * 當 `entry` 被建立後會呼叫此函數。在這裡應該撰寫將函數寫入檔案系統並重新導向清單的地方。	 
	 */
	complete(entry: { generateManifest(opts: { relativePath: string }): string }): MaybePromise<void>;
}

// 基於 https://github.com/josh-hemphill/csp-typed-directives/blob/latest/src/csp.types.ts
//
// MIT License
//
// Copyright (c) 2021-present, Joshua Hemphill
// Copyright (c) 2021, Tecnico Corporation

export namespace Csp {
	type ActionSource = 'strict-dynamic' | 'report-sample';
	type BaseSource =
		| 'self'
		| 'unsafe-eval'
		| 'unsafe-hashes'
		| 'unsafe-inline'
		| 'wasm-unsafe-eval'
		| 'none';
	type CryptoSource = `${'nonce' | 'sha256' | 'sha384' | 'sha512'}-${string}`;
	type FrameSource = HostSource | SchemeSource | 'self' | 'none';
	type HostNameScheme = `${string}.${string}` | 'localhost';
	type HostSource = `${HostProtocolSchemes}${HostNameScheme}${PortScheme}`;
	type HostProtocolSchemes = `${string}://` | '';
	type HttpDelineator = '/' | '?' | '#' | '\\';
	type PortScheme = `:${number}` | '' | ':*';
	type SchemeSource = 'http:' | 'https:' | 'data:' | 'mediastream:' | 'blob:' | 'filesystem:';
	type Source = HostSource | SchemeSource | CryptoSource | BaseSource;
	type Sources = Source[];
	type UriPath = `${HttpDelineator}${string}`;
}

export interface CspDirectives {
	'child-src'?: Csp.Sources;
	'default-src'?: Array<Csp.Source | Csp.ActionSource>;
	'frame-src'?: Csp.Sources;
	'worker-src'?: Csp.Sources;
	'connect-src'?: Csp.Sources;
	'font-src'?: Csp.Sources;
	'img-src'?: Csp.Sources;
	'manifest-src'?: Csp.Sources;
	'media-src'?: Csp.Sources;
	'object-src'?: Csp.Sources;
	'prefetch-src'?: Csp.Sources;
	'script-src'?: Array<Csp.Source | Csp.ActionSource>;
	'script-src-elem'?: Csp.Sources;
	'script-src-attr'?: Csp.Sources;
	'style-src'?: Array<Csp.Source | Csp.ActionSource>;
	'style-src-elem'?: Csp.Sources;
	'style-src-attr'?: Csp.Sources;
	'base-uri'?: Array<Csp.Source | Csp.ActionSource>;
	sandbox?: Array<
		| 'allow-downloads-without-user-activation'
		| 'allow-forms'
		| 'allow-modals'
		| 'allow-orientation-lock'
		| 'allow-pointer-lock'
		| 'allow-popups'
		| 'allow-popups-to-escape-sandbox'
		| 'allow-presentation'
		| 'allow-same-origin'
		| 'allow-scripts'
		| 'allow-storage-access-by-user-activation'
		| 'allow-top-navigation'
		| 'allow-top-navigation-by-user-activation'
	>;
	'form-action'?: Array<Csp.Source | Csp.ActionSource>;
	'frame-ancestors'?: Array<Csp.HostSource | Csp.SchemeSource | Csp.FrameSource>;
	'navigate-to'?: Array<Csp.Source | Csp.ActionSource>;
	'report-uri'?: Csp.UriPath[];
	'report-to'?: string[];

	'require-trusted-types-for'?: Array<'script'>;
	'trusted-types'?: Array<'none' | 'allow-duplicates' | '*' | string>;
	'upgrade-insecure-requests'?: boolean;

	/** @deprecated */
	'require-sri-for'?: Array<'script' | 'style' | 'script style'>;

	/** @deprecated */
	'block-all-mixed-content'?: boolean;

	/** @deprecated */
	'plugin-types'?: Array<`${string}/${string}` | 'none'>;

	/** @deprecated */
	referrer?: Array<
		| 'no-referrer'
		| 'no-referrer-when-downgrade'
		| 'origin'
		| 'origin-when-cross-origin'
		| 'same-origin'
		| 'strict-origin'
		| 'strict-origin-when-cross-origin'
		| 'unsafe-url'
		| 'none'
	>;
}

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

export interface Logger {
	(msg: string): void;
	success(msg: string): void;
	error(msg: string): void;
	warn(msg: string): void;
	minor(msg: string): void;
	info(msg: string): void;
}

export type MaybePromise<T> = T | Promise<T>;

export interface Prerendered {
	/** 
   * `path` 對應到 `{ file }` 物件的對映表，其中像 `/foo` 的路徑對應到 `foo.html`，而像 `/bar/` 的路徑對應到 `bar/index.html`。
 	 */
	pages: Map<
		string,
		{
			/** `.html` 檔案輸出目錄的相對路徑。 */
			file: string;
		}
	>;
	/**
	 * 從 `path` 到 `{ type }` 物件的對應。.
	 */
	assets: Map<
		string,
		{
			/** MIME 的資源類型。 */
			type: string;
		}
	>;
	/**
	 * 預覽期間遇到的重新導向對應。
	 */
	redirects: Map<
		string,
		{
			status: number;
			location: string;
		}
	>;
	/** 預覽路徑的陣列（不含反鈄線，不論 trailingSlash 設定如何）。 */
	paths: string[];
}

export interface PrerenderHttpErrorHandler {
	(details: {
		status: number;
		path: string;
		referrer: string | null;
		referenceType: 'linked' | 'fetched';
		message: string;
	}): void;
}

export interface PrerenderMissingIdHandler {
	(details: { path: string; id: string; referrers: string[]; message: string }): void;
}

export type PrerenderHttpErrorHandlerValue = 'fail' | 'warn' | 'ignore' | PrerenderHttpErrorHandler;
export type PrerenderMissingIdHandlerValue = 'fail' | 'warn' | 'ignore' | PrerenderMissingIdHandler;

export type PrerenderOption = boolean | 'auto';

export type PrerenderMap = Map<string, PrerenderOption>;

export interface RequestOptions {
	getClientAddress(): string;
	platform?: App.Platform;
}

export interface RouteSegment {
	content: string;
	dynamic: boolean;
	rest: boolean;
}

export type TrailingSlash = 'never' | 'always' | 'ignore';

/**
 * 這並不存在於實際情況中，它僅是一種更好地區分類型的方式。
 */
declare const uniqueSymbol: unique symbol;

export interface UniqueInterface {
	readonly [uniqueSymbol]: unknown;
}

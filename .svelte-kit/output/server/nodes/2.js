import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.BihNF7Ou.js","_app/immutable/chunks/scheduler.XHF0m71J.js","_app/immutable/chunks/index.-mklun6F.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/transform.W7TN51b0.js","_app/immutable/chunks/Icon.Cpe4Q96I.js","_app/immutable/chunks/index.7PtJxCfh.js"];
export const stylesheets = ["_app/immutable/assets/2.XIPKkcaq.css"];
export const fonts = [];

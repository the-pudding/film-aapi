import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.B6jV-t0X.js","_app/immutable/chunks/scheduler.DCUwlaBk.js","_app/immutable/chunks/index.95tfB9Vq.js"];
export const stylesheets = ["_app/immutable/assets/0.Bu6D9Ir2.css"];
export const fonts = [];

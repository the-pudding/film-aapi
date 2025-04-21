import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.B0cBaa3y.js","_app/immutable/chunks/scheduler.DCUwlaBk.js","_app/immutable/chunks/index.95tfB9Vq.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/transform.W7TN51b0.js"];
export const stylesheets = ["_app/immutable/assets/2.BcMIjR3n.css"];
export const fonts = [];

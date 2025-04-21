

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/demo/ig-story/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BXRjdKWr.js","_app/immutable/chunks/scheduler.DCUwlaBk.js","_app/immutable/chunks/index.95tfB9Vq.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/index.B4bnyJm2.js","_app/immutable/chunks/spread.CgU5AtxT.js"];
export const stylesheets = ["_app/immutable/assets/5.BMf-RGIR.css"];
export const fonts = [];

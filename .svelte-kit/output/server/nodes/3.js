

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/demo/elements/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.Qttd7TUt.js","_app/immutable/chunks/scheduler.XHF0m71J.js","_app/immutable/chunks/index.-mklun6F.js"];
export const stylesheets = ["_app/immutable/assets/3.CsgfhULn.css"];
export const fonts = [];

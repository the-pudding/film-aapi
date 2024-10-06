export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/.DS_Store","assets/demo/fonts/atkinson.css","assets/demo/fonts/atlas-typewriter.css","assets/demo/fonts/atlas.css","assets/demo/fonts/baloo-bhai.css","assets/demo/fonts/canela.css","assets/demo/fonts/computer-modern.css","assets/demo/fonts/cozette.css","assets/demo/fonts/inter.css","assets/demo/fonts/jamboree.css","assets/demo/fonts/jersey.css","assets/demo/fonts/lyon.css","assets/demo/fonts/metropolis.css","assets/demo/fonts/national.css","assets/demo/fonts/publico.css","assets/demo/fonts/recoleta.css","assets/demo/fonts/rubik.css","assets/demo/fonts/spacemono.css","assets/demo/fonts/tiempos.css","assets/demo/test.jpg","assets/pudding/stickers/cloud.jpg","favicon.ico"]),
	mimeTypes: {".css":"text/css",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.1bPWUc9T.js","app":"_app/immutable/entry/app.B08byRen.js","imports":["_app/immutable/entry/start.1bPWUc9T.js","_app/immutable/chunks/entry.UR10-3MB.js","_app/immutable/chunks/scheduler.XHF0m71J.js","_app/immutable/chunks/index.7PtJxCfh.js","_app/immutable/chunks/paths.DGYsrevT.js","_app/immutable/entry/app.B08byRen.js","_app/immutable/chunks/scheduler.XHF0m71J.js","_app/immutable/chunks/index.-mklun6F.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

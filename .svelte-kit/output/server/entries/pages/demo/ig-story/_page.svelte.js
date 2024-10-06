import { c as create_ssr_component, d as each, e as escape, a as subscribe, b as add_attribute, v as validate_component, k as createEventDispatcher, s as setContext, g as getContext, j as add_styles } from "../../../../chunks/ssr.js";
import { I as Icon, i as is_void } from "../../../../chunks/Icon.js";
import { r as readable, w as writable } from "../../../../chunks/index.js";
import "lodash.debounce";
const css$5 = {
  code: ".chapters.svelte-s3rw5i.svelte-s3rw5i{position:absolute;top:5rem;display:-webkit-box;display:flex;width:100%;-webkit-box-pack:justify;justify-content:space-between;padding:0 1rem}.chapter.svelte-s3rw5i.svelte-s3rw5i{display:-webkit-box;display:flex;-webkit-box-align:end;align-items:end;-webkit-box-flex:1;flex:1;margin:0 3px}.chapter.svelte-s3rw5i.svelte-s3rw5i:first-of-type{margin-left:0}.chapter.svelte-s3rw5i.svelte-s3rw5i:last-of-type{margin-right:0}.chapter.active.svelte-s3rw5i.svelte-s3rw5i{-webkit-box-flex:5;flex:5}.text.svelte-s3rw5i.svelte-s3rw5i{position:absolute;top:-1.2rem;font-size:12px;white-space:nowrap;opacity:0.3}.chapter.active.svelte-s3rw5i .text.svelte-s3rw5i{opacity:1}.title.svelte-s3rw5i.svelte-s3rw5i{visibility:hidden}.chapter.active.svelte-s3rw5i .title.svelte-s3rw5i{visibility:visible}.block.svelte-s3rw5i.svelte-s3rw5i{position:relative;-webkit-box-flex:1;flex:1;height:2px;border-radius:1px;margin:0 1px;background:black;opacity:0.3;-webkit-transition:opacity calc(var(--1s) * 0.4);transition:opacity calc(var(--1s) * 0.4)}.block.svelte-s3rw5i.svelte-s3rw5i:first-of-type{margin-left:0}.block.svelte-s3rw5i.svelte-s3rw5i:last-of-type{margin-right:0}.block.active.svelte-s3rw5i.svelte-s3rw5i{opacity:1}@media(max-width: 600px){.text.svelte-s3rw5i.svelte-s3rw5i{font-size:10px}}",
  map: '{"version":3,"file":"Demo.IgStory.Chapters.svelte","sources":["Demo.IgStory.Chapters.svelte"],"sourcesContent":["<script>\\n\\texport let activeSlide;\\n\\texport let sections;\\n\\texport let allSlides;\\n<\/script>\\n\\n<div class=\\"chapters\\">\\n\\t{#each sections as { title, slides }, i}\\n\\t\\t{@const chapterActive = allSlides[activeSlide].section === i}\\n\\t\\t<div class=\\"chapter\\" class:active={chapterActive}>\\n\\t\\t\\t<span class=\\"text\\">\\n\\t\\t\\t\\t{i + 1}<span class=\\"title\\"> — {title}</span>\\n\\t\\t\\t</span>\\n\\t\\t\\t{#if chapterActive}\\n\\t\\t\\t\\t{#each slides as slide}\\n\\t\\t\\t\\t\\t{@const active = slide.i === activeSlide}\\n\\t\\t\\t\\t\\t<div class=\\"block\\" class:active />\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<div class=\\"block\\" />\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t{/each}\\n</div>\\n\\n<style>\\n\\t.chapters {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 5rem;\\n\\t\\tdisplay: -webkit-box;\\n\\t\\tdisplay: flex;\\n\\t\\twidth: 100%;\\n\\t\\t-webkit-box-pack: justify;\\n\\t\\t        justify-content: space-between;\\n\\t\\tpadding: 0 1rem;\\n\\t}\\n\\t.chapter {\\n\\t\\tdisplay: -webkit-box;\\n\\t\\tdisplay: flex;\\n\\t\\t-webkit-box-align: end;\\n\\t\\t        align-items: end;\\n\\t\\t-webkit-box-flex: 1;\\n\\t\\t        flex: 1;\\n\\t\\tmargin: 0 3px;\\n\\t}\\n\\t.chapter:first-of-type {\\n\\t\\tmargin-left: 0;\\n\\t}\\n\\t.chapter:last-of-type {\\n\\t\\tmargin-right: 0;\\n\\t}\\n\\t.chapter.active {\\n\\t\\t-webkit-box-flex: 5;\\n\\t\\t        flex: 5;\\n\\t}\\n\\t.text {\\n\\t\\tposition: absolute;\\n\\t\\ttop: -1.2rem;\\n\\t\\tfont-size: 12px;\\n\\t\\twhite-space: nowrap;\\n\\t\\topacity: 0.3;\\n\\t}\\n\\t.chapter.active .text {\\n\\t\\topacity: 1;\\n\\t}\\n\\t.title {\\n\\t\\tvisibility: hidden;\\n\\t}\\n\\t.chapter.active .title {\\n\\t\\tvisibility: visible;\\n\\t}\\n\\t.block {\\n\\t\\tposition: relative;\\n\\t\\t-webkit-box-flex: 1;\\n\\t\\t        flex: 1;\\n\\t\\theight: 2px;\\n\\t\\tborder-radius: 1px;\\n\\t\\tmargin: 0 1px;\\n\\t\\tbackground: black;\\n\\t\\topacity: 0.3;\\n\\t\\t-webkit-transition: opacity calc(var(--1s) * 0.4);\\n\\t\\ttransition: opacity calc(var(--1s) * 0.4);\\n\\t}\\n\\t.block:first-of-type {\\n\\t\\tmargin-left: 0;\\n\\t}\\n\\t.block:last-of-type {\\n\\t\\tmargin-right: 0;\\n\\t}\\n\\t.block.active {\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t@media (max-width: 600px) {\\n\\t\\t.text {\\n\\t\\t\\tfont-size: 10px;\\n\\t\\t}\\n\\t}</style>\\n"],"names":[],"mappings":"AA0BC,qCAAU,CACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,OAAO,CACjB,eAAe,CAAE,aAAa,CACtC,OAAO,CAAE,CAAC,CAAC,IACZ,CACA,oCAAS,CACR,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,IAAI,CACb,iBAAiB,CAAE,GAAG,CACd,WAAW,CAAE,GAAG,CACxB,gBAAgB,CAAE,CAAC,CACX,IAAI,CAAE,CAAC,CACf,MAAM,CAAE,CAAC,CAAC,GACX,CACA,oCAAQ,cAAe,CACtB,WAAW,CAAE,CACd,CACA,oCAAQ,aAAc,CACrB,YAAY,CAAE,CACf,CACA,QAAQ,mCAAQ,CACf,gBAAgB,CAAE,CAAC,CACX,IAAI,CAAE,CACf,CACA,iCAAM,CACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,OAAO,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,GACV,CACA,QAAQ,qBAAO,CAAC,mBAAM,CACrB,OAAO,CAAE,CACV,CACA,kCAAO,CACN,UAAU,CAAE,MACb,CACA,QAAQ,qBAAO,CAAC,oBAAO,CACtB,UAAU,CAAE,OACb,CACA,kCAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,CAAC,CACX,IAAI,CAAE,CAAC,CACf,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,CAAC,CAAC,GAAG,CACb,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,GAAG,CACZ,kBAAkB,CAAE,OAAO,CAAC,KAAK,IAAI,IAAI,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACjD,UAAU,CAAE,OAAO,CAAC,KAAK,IAAI,IAAI,CAAC,CAAC,CAAC,CAAC,GAAG,CACzC,CACA,kCAAM,cAAe,CACpB,WAAW,CAAE,CACd,CACA,kCAAM,aAAc,CACnB,YAAY,CAAE,CACf,CACA,MAAM,mCAAQ,CACb,OAAO,CAAE,CACV,CAEA,MAAO,YAAY,KAAK,CAAE,CACzB,iCAAM,CACL,SAAS,CAAE,IACZ,CACD"}'
};
const Demo_IgStory_Chapters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { activeSlide } = $$props;
  let { sections } = $$props;
  let { allSlides } = $$props;
  if ($$props.activeSlide === void 0 && $$bindings.activeSlide && activeSlide !== void 0) $$bindings.activeSlide(activeSlide);
  if ($$props.sections === void 0 && $$bindings.sections && sections !== void 0) $$bindings.sections(sections);
  if ($$props.allSlides === void 0 && $$bindings.allSlides && allSlides !== void 0) $$bindings.allSlides(allSlides);
  $$result.css.add(css$5);
  return `<div class="chapters svelte-s3rw5i">${each(sections, ({ title, slides }, i) => {
    let chapterActive = allSlides[activeSlide].section === i;
    return ` <div class="${["chapter svelte-s3rw5i", chapterActive ? "active" : ""].join(" ").trim()}"><span class="text svelte-s3rw5i">${escape(i + 1)}<span class="title svelte-s3rw5i">— ${escape(title)}</span></span> ${chapterActive ? `${each(slides, (slide) => {
      let active = slide.i === activeSlide;
      return ` <div class="${["block svelte-s3rw5i", active ? "active" : ""].join(" ").trim()}"></div>`;
    })}` : `<div class="block svelte-s3rw5i"></div>`} </div>`;
  })} </div>`;
});
const viewport = readable({ width: 0, height: 0 }, (set) => {
  return () => {
  };
});
const css$4 = {
  code: "figure.svelte-4vfsg0{position:absolute;top:calc(var(--offset) + var(--buffer));height:calc(100% - var(--offset) - var(--buffer));left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);overflow:hidden;width:45rem;padding:1rem;z-index:3;pointer-events:none;-webkit-transition:opacity calc(var(--1s) * 0.5) ease-in-out;transition:opacity calc(var(--1s) * 0.5) ease-in-out;background:lavender}",
  map: '{"version":3,"file":"Demo.IgStory.Figure.svelte","sources":["Demo.IgStory.Figure.svelte"],"sourcesContent":["<script>\\n\\t/**\\n\\t * This component is a wrapper for the visual that appears beneath the text in your IG story.\\n\\t * It takes up the remaining space after the text + buffer.\\n\\t */\\n\\timport { onMount, tick } from \\"svelte\\";\\n\\timport viewport from \\"$stores/viewport.js\\";\\n\\n\\texport let activeSlide;\\n\\n\\tlet offset;\\n\\tlet mounted = false;\\n\\n\\t$: mobile = $viewport.width < 600;\\n\\t$: buffer = mobile ? 10 : 100;\\n\\t$: activeSlide, $viewport.width, updateSlideHeight();\\n\\n\\tconst updateSlideHeight = async () => {\\n\\t\\tif (mounted) {\\n\\t\\t\\tawait tick();\\n\\t\\t\\tconst slideEl = document.getElementById(`slide-${activeSlide}`);\\n\\t\\t\\toffset = slideEl.clientHeight + buffer;\\n\\t\\t}\\n\\t};\\n\\n\\tonMount(() => {\\n\\t\\tmounted = true;\\n\\t\\tupdateSlideHeight();\\n\\t});\\n<\/script>\\n\\n<figure style={`--offset: ${offset}px; --buffer: 2rem`}>\\n\\tvisual goes here\\n</figure>\\n\\n<style>\\n\\tfigure {\\n\\t\\tposition: absolute;\\n\\t\\ttop: calc(var(--offset) + var(--buffer));\\n\\t\\theight: calc(100% - var(--offset) - var(--buffer));\\n\\t\\tleft: 50%;\\n\\t\\t-webkit-transform: translateX(-50%);\\n\\t\\t        transform: translateX(-50%);\\n\\t\\toverflow: hidden;\\n\\t\\twidth: 45rem;\\n\\t\\tpadding: 1rem;\\n\\t\\tz-index: 3;\\n\\t\\tpointer-events: none;\\n\\t\\t-webkit-transition: opacity calc(var(--1s) * 0.5) ease-in-out;\\n\\t\\ttransition: opacity calc(var(--1s) * 0.5) ease-in-out;\\n\\t\\tbackground: lavender;\\n\\t}</style>\\n"],"names":[],"mappings":"AAoCC,oBAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CAAC,CACxC,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CAAC,CAClD,IAAI,CAAE,GAAG,CACT,iBAAiB,CAAE,WAAW,IAAI,CAAC,CAC3B,SAAS,CAAE,WAAW,IAAI,CAAC,CACnC,QAAQ,CAAE,MAAM,CAChB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IAAI,CACpB,kBAAkB,CAAE,OAAO,CAAC,KAAK,IAAI,IAAI,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,WAAW,CAC7D,UAAU,CAAE,OAAO,CAAC,KAAK,IAAI,IAAI,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,WAAW,CACrD,UAAU,CAAE,QACb"}'
};
const Demo_IgStory_Figure = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $viewport, $$unsubscribe_viewport;
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  let { activeSlide } = $$props;
  let offset;
  const updateSlideHeight = async () => {
  };
  if ($$props.activeSlide === void 0 && $$bindings.activeSlide && activeSlide !== void 0) $$bindings.activeSlide(activeSlide);
  $$result.css.add(css$4);
  $viewport.width < 600;
  {
    $viewport.width, updateSlideHeight();
  }
  $$unsubscribe_viewport();
  return `<figure${add_attribute("style", `--offset: ${offset}px; --buffer: 2rem`, 0)} class="svelte-4vfsg0">visual goes here
</figure>`;
});
const Chevron_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const css$3 = {
  code: "section.svelte-jjzds.svelte-jjzds{position:fixed;top:0;left:0;width:100%;height:100%;z-index:var(--z-overlay);pointer-events:none}button.svelte-jjzds.svelte-jjzds{position:absolute;cursor:pointer;background:none;border-radius:0;outline:none;border:none;-webkit-box-shadow:none;box-shadow:none;pointer-events:auto;display:-webkit-box;display:flex}button.svelte-jjzds.svelte-jjzds:disabled{opacity:0.2;cursor:not-allowed}button.svelte-jjzds.svelte-jjzds:hover{background-color:rgba(255, 255, 255, 0.2)}.left.svelte-jjzds.svelte-jjzds{left:0;top:0}.right.svelte-jjzds.svelte-jjzds{right:0;top:0}.left.start.svelte-jjzds.svelte-jjzds,.right.start.svelte-jjzds.svelte-jjzds{-webkit-box-align:start;align-items:flex-start}.left.center.svelte-jjzds.svelte-jjzds,.right.center.svelte-jjzds.svelte-jjzds{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.left.end.svelte-jjzds.svelte-jjzds,.right.end.svelte-jjzds.svelte-jjzds{bottom:0;top:auto}.up.svelte-jjzds.svelte-jjzds{top:0;left:0}.down.svelte-jjzds.svelte-jjzds{bottom:0;left:0}.up.center.svelte-jjzds.svelte-jjzds,.down.center.svelte-jjzds.svelte-jjzds{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.up.end.svelte-jjzds.svelte-jjzds,.down.end.svelte-jjzds.svelte-jjzds{right:0;left:auto}.full.left.start.svelte-jjzds.svelte-jjzds,.full.right.start.svelte-jjzds.svelte-jjzds{-webkit-box-align:start;align-items:flex-start}.full.left.center.svelte-jjzds.svelte-jjzds,.full.right.center.svelte-jjzds.svelte-jjzds{-webkit-box-align:center;align-items:center}.full.left.end.svelte-jjzds.svelte-jjzds,.full.right.end.svelte-jjzds.svelte-jjzds{-webkit-box-align:end;align-items:flex-end}.full.up.start.svelte-jjzds.svelte-jjzds,.full.down.start.svelte-jjzds.svelte-jjzds{-webkit-box-pack:start;justify-content:flex-start}.full.up.center.svelte-jjzds.svelte-jjzds,.full.down.center.svelte-jjzds.svelte-jjzds{-webkit-box-pack:center;justify-content:center}.full.up.end.svelte-jjzds.svelte-jjzds,.full.down-end.svelte-jjzds.svelte-jjzds{-webkit-box-pack:end;justify-content:flex-end}span.svelte-jjzds.svelte-jjzds{display:inline-block;line-height:1;opacity:0.5}.debug.svelte-jjzds .left.svelte-jjzds{background:red;opacity:0.5}.debug.svelte-jjzds .right.svelte-jjzds{background:red;opacity:0.5}.debug.svelte-jjzds .up.svelte-jjzds{background:orange;opacity:0.5}.debug.svelte-jjzds .down.svelte-jjzds{background:orange;opacity:0.5}",
  map: '{"version":3,"file":"Tap.svelte","sources":["Tap.svelte"],"sourcesContent":["<script>\\n\\timport ChevronLeft from \\"lucide-svelte/icons/chevron-left\\";\\n\\timport ChevronRight from \\"lucide-svelte/icons/chevron-right\\";\\n\\timport { createEventDispatcher } from \\"svelte\\";\\n\\n\\texport let debug = false;\\n\\texport let enableKeyboard = false;\\n\\texport let full = false;\\n\\texport let showArrows = false; // boolean or array of directions\\n\\texport let disable = [];\\n\\texport let directions = [\\"left\\", \\"right\\"];\\n\\texport let size = \\"64px\\";\\n\\texport let arrowSize = \\"48px\\";\\n\\texport let arrowStroke = \\"#000\\";\\n\\texport let arrowStrokeWidth = \\"2\\";\\n\\texport let arrowPosition = \\"center\\"; // start, center, end\\n\\n\\tconst dispatch = createEventDispatcher();\\n\\tlet innerHeight;\\n\\n\\t$: getW = (dir) =>\\n\\t\\tArray.isArray(size) ? size[directions.indexOf(dir)] : full ? \\"100%\\" : size;\\n\\t$: getH = (dir) =>\\n\\t\\t[\\"up\\", \\"down\\"].includes(dir) ? size : full ? \\"100%\\" : size;\\n\\n\\t$: onKeyDown = (e) => {\\n\\t\\tconst dir = e.key.replace(\\"Arrow\\", \\"\\").toLowerCase();\\n\\t\\tconst hasDir = directions.includes(dir);\\n\\t\\tif (enableKeyboard && hasDir) {\\n\\t\\t\\te.preventDefault();\\n\\t\\t\\tdispatch(\\"tap\\", dir);\\n\\t\\t}\\n\\t};\\n\\n\\t$: visibleArrows = directions.filter((d) =>\\n\\t\\ttypeof showArrows === \\"boolean\\" ? showArrows : showArrows.includes(d)\\n\\t);\\n<\/script>\\n\\n<svelte:window on:keydown={onKeyDown} bind:innerHeight />\\n\\n<section class:debug style=\\"height: {innerHeight}px;\\">\\n\\t{#each directions as dir}\\n\\t\\t<button\\n\\t\\t\\ton:click={dispatch(\\"tap\\", dir)}\\n\\t\\t\\tstyle=\\"width: {getW(dir)}; height: {getH(dir)};\\"\\n\\t\\t\\taria-label={dir}\\n\\t\\t\\tclass=\\"{dir} {arrowPosition}\\"\\n\\t\\t\\tclass:full\\n\\t\\t\\tdisabled={disable.includes(dir)}\\n\\t\\t>\\n\\t\\t\\t{#if visibleArrows.includes(dir)}\\n\\t\\t\\t\\t<span style=\\"font-size: {arrowSize};\\">\\n\\t\\t\\t\\t\\t{#if dir === \\"left\\"}\\n\\t\\t\\t\\t\\t\\t<ChevronLeft color={arrowStroke} strokeWidth={arrowStrokeWidth} />\\n\\t\\t\\t\\t\\t{:else if dir === \\"right\\"}\\n\\t\\t\\t\\t\\t\\t<ChevronRight color={arrowStroke} strokeWidth={arrowStrokeWidth} />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</span>\\n\\t\\t\\t{/if}\\n\\t\\t</button>\\n\\t{/each}\\n</section>\\n\\n<style>\\n\\tsection {\\n\\t\\tposition: fixed;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tz-index: var(--z-overlay);\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\tbutton {\\n\\t\\tposition: absolute;\\n\\t\\tcursor: pointer;\\n\\t\\tbackground: none;\\n\\t\\tborder-radius: 0;\\n\\t\\toutline: none;\\n\\t\\tborder: none;\\n\\t\\t-webkit-box-shadow: none;\\n\\t\\t        box-shadow: none;\\n\\t\\tpointer-events: auto;\\n\\t\\tdisplay: -webkit-box;\\n\\t\\tdisplay: flex;\\n\\t}\\n\\n\\tbutton:disabled {\\n\\t\\topacity: 0.2;\\n\\t\\tcursor: not-allowed;\\n\\t}\\n\\n\\tbutton:hover {\\n\\t\\tbackground-color: rgba(255, 255, 255, 0.2);\\n\\t}\\n\\n\\t.left {\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\t/* text-align: left; */\\n\\t}\\n\\n\\t.right {\\n\\t\\tright: 0;\\n\\t\\ttop: 0;\\n\\t\\t/* text-align: right; */\\n\\t}\\n\\n\\t.left.start,\\n\\t.right.start {\\n\\t\\t-webkit-box-align: start;\\n\\t\\t        align-items: flex-start;\\n\\t}\\n\\n\\t.left.center,\\n\\t.right.center {\\n\\t\\ttop: 50%;\\n\\t\\t-webkit-transform: translateY(-50%);\\n\\t\\t        transform: translateY(-50%);\\n\\t}\\n\\n\\t.left.end,\\n\\t.right.end {\\n\\t\\tbottom: 0;\\n\\t\\ttop: auto;\\n\\t}\\n\\n\\t.up {\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\t/* text-align: center; */\\n\\t}\\n\\n\\t.down {\\n\\t\\tbottom: 0;\\n\\t\\tleft: 0;\\n\\t\\t/* text-align: center; */\\n\\t}\\n\\n\\t.up.center,\\n\\t.down.center {\\n\\t\\tleft: 50%;\\n\\t\\t-webkit-transform: translateX(-50%);\\n\\t\\t        transform: translateX(-50%);\\n\\t}\\n\\n\\t.up.end,\\n\\t.down.end {\\n\\t\\tright: 0;\\n\\t\\tleft: auto;\\n\\t}\\n\\n\\t/* full positions */\\n\\t.full.left.start,\\n\\t.full.right.start {\\n\\t\\t-webkit-box-align: start;\\n\\t\\t        align-items: flex-start;\\n\\t}\\n\\n\\t.full.left.center,\\n\\t.full.right.center {\\n\\t\\t-webkit-box-align: center;\\n\\t\\t        align-items: center;\\n\\t}\\n\\n\\t.full.left.end,\\n\\t.full.right.end {\\n\\t\\t-webkit-box-align: end;\\n\\t\\t        align-items: flex-end;\\n\\t}\\n\\n\\t.full.up.start,\\n\\t.full.down.start {\\n\\t\\t-webkit-box-pack: start;\\n\\t\\t        justify-content: flex-start;\\n\\t}\\n\\n\\t.full.up.center,\\n\\t.full.down.center {\\n\\t\\t-webkit-box-pack: center;\\n\\t\\t        justify-content: center;\\n\\t}\\n\\n\\t.full.up.end,\\n\\t.full.down-end {\\n\\t\\t-webkit-box-pack: end;\\n\\t\\t        justify-content: flex-end;\\n\\t}\\n\\n\\tspan {\\n\\t\\tdisplay: inline-block;\\n\\t\\tline-height: 1;\\n\\t\\topacity: 0.5;\\n\\t}\\n\\n\\t.debug .left {\\n\\t\\tbackground: red;\\n\\t\\topacity: 0.5;\\n\\t}\\n\\n\\t.debug .right {\\n\\t\\tbackground: red;\\n\\t\\topacity: 0.5;\\n\\t}\\n\\n\\t.debug .up {\\n\\t\\tbackground: orange;\\n\\t\\topacity: 0.5;\\n\\t}\\n\\n\\t.debug .down {\\n\\t\\tbackground: orange;\\n\\t\\topacity: 0.5;\\n\\t}</style>\\n"],"names":[],"mappings":"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"}'
};
const Tap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let getW;
  let getH;
  let visibleArrows;
  let { debug = false } = $$props;
  let { enableKeyboard = false } = $$props;
  let { full = false } = $$props;
  let { showArrows = false } = $$props;
  let { disable = [] } = $$props;
  let { directions = ["left", "right"] } = $$props;
  let { size = "64px" } = $$props;
  let { arrowSize = "48px" } = $$props;
  let { arrowStroke = "#000" } = $$props;
  let { arrowStrokeWidth = "2" } = $$props;
  let { arrowPosition = "center" } = $$props;
  createEventDispatcher();
  let innerHeight;
  if ($$props.debug === void 0 && $$bindings.debug && debug !== void 0) $$bindings.debug(debug);
  if ($$props.enableKeyboard === void 0 && $$bindings.enableKeyboard && enableKeyboard !== void 0) $$bindings.enableKeyboard(enableKeyboard);
  if ($$props.full === void 0 && $$bindings.full && full !== void 0) $$bindings.full(full);
  if ($$props.showArrows === void 0 && $$bindings.showArrows && showArrows !== void 0) $$bindings.showArrows(showArrows);
  if ($$props.disable === void 0 && $$bindings.disable && disable !== void 0) $$bindings.disable(disable);
  if ($$props.directions === void 0 && $$bindings.directions && directions !== void 0) $$bindings.directions(directions);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.arrowSize === void 0 && $$bindings.arrowSize && arrowSize !== void 0) $$bindings.arrowSize(arrowSize);
  if ($$props.arrowStroke === void 0 && $$bindings.arrowStroke && arrowStroke !== void 0) $$bindings.arrowStroke(arrowStroke);
  if ($$props.arrowStrokeWidth === void 0 && $$bindings.arrowStrokeWidth && arrowStrokeWidth !== void 0) $$bindings.arrowStrokeWidth(arrowStrokeWidth);
  if ($$props.arrowPosition === void 0 && $$bindings.arrowPosition && arrowPosition !== void 0) $$bindings.arrowPosition(arrowPosition);
  $$result.css.add(css$3);
  getW = (dir) => Array.isArray(size) ? size[directions.indexOf(dir)] : full ? "100%" : size;
  getH = (dir) => ["up", "down"].includes(dir) ? size : full ? "100%" : size;
  visibleArrows = directions.filter((d) => typeof showArrows === "boolean" ? showArrows : showArrows.includes(d));
  return ` <section style="${"height: " + escape(innerHeight, true) + "px;"}" class="${["svelte-jjzds", debug ? "debug" : ""].join(" ").trim()}">${each(directions, (dir) => {
    return `<button style="${"width: " + escape(getW(dir), true) + "; height: " + escape(getH(dir), true) + ";"}"${add_attribute("aria-label", dir, 0)} class="${[
      escape(dir, true) + " " + escape(arrowPosition, true) + " svelte-jjzds",
      full ? "full" : ""
    ].join(" ").trim()}" ${disable.includes(dir) ? "disabled" : ""}>${visibleArrows.includes(dir) ? `<span style="${"font-size: " + escape(arrowSize, true) + ";"}" class="svelte-jjzds">${dir === "left" ? `${validate_component(Chevron_left, "ChevronLeft").$$render(
      $$result,
      {
        color: arrowStroke,
        strokeWidth: arrowStrokeWidth
      },
      {},
      {}
    )}` : `${dir === "right" ? `${validate_component(Chevron_right, "ChevronRight").$$render(
      $$result,
      {
        color: arrowStroke,
        strokeWidth: arrowStrokeWidth
      },
      {},
      {}
    )}` : ``}`} </span>` : ``} </button>`;
  })} </section>`;
});
const css$2 = {
  code: "section.svelte-1ceqw5z.svelte-1ceqw5z{position:relative;width:100%;height:100%;margin:0;padding:0;z-index:1;overflow:hidden}.slides.svelte-1ceqw5z.svelte-1ceqw5z{display:-webkit-box;display:flex;flex-wrap:wrap;position:relative;width:100%;height:100%;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;z-index:1}.horizontal.svelte-1ceqw5z>.slides.svelte-1ceqw5z{-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.vertical.svelte-1ceqw5z>.slides.svelte-1ceqw5z{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}",
  map: '{"version":3,"file":"Slider.svelte","sources":["Slider.svelte"],"sourcesContent":["<!--\\nAdd the css snippet below to your global css file to do a \\nfull-screen + mobile friendly slider\\n\\t\\nhtml, body, main {\\n\\theight: 100%;\\n\\toverflow: hidden;\\n}\\n\\nUsage:\\n<script>\\n\\timport Slider from \\"$components/helpers/Slider.svelte\\";\\n\\timport Slide from \\"$components/helpers/Slider.Slide.svelte\\";\\n\\n\\tlet sliderEl; // component binding\\n\\n\\tsliderEl.next(); // navigation call\\n<\/script>\\n\\n<Slider bind:this={sliderEl}>\\n\\t<Slide>\\n\\t\\t<p>content</p>\\n\\t</Slide>\\n</Slider>\\n-->\\n<script>\\n\\timport { setContext, onMount } from \\"svelte\\";\\n\\timport { writable } from \\"svelte/store\\";\\n\\n\\texport let direction = \\"horizontal\\";\\n\\texport let duration = \\"500ms\\";\\n\\texport let timing = \\"ease\\";\\n\\n\\texport let count = 0;\\n\\texport let current = 0;\\n\\n\\texport const next = () => move(1);\\n\\texport const prev = () => move(-1);\\n\\texport const jump = (val) => move(val, true);\\n\\n\\tlet children = 0;\\n\\tlet index = 0;\\n\\tlet width;\\n\\tlet height;\\n\\tlet isInView = false;\\n\\tlet sliderEl;\\n\\tlet translateEl;\\n\\tlet root;\\n\\tlet observer;\\n\\n\\tlet _direction = writable();\\n\\tlet _width = writable();\\n\\tlet _height = writable();\\n\\tlet _current = writable();\\n\\tlet _count = writable();\\n\\n\\tconst move = (val, jump) => {\\n\\t\\tif (!isInView) return false;\\n\\t\\tconst target = jump ? val : index + val;\\n\\t\\tindex = Math.max(0, Math.min(children - 1, target));\\n\\t\\tcurrent = index;\\n\\t};\\n\\n\\tconst onIntersect = (e) => {\\n\\t\\tisInView = e[0].isIntersecting;\\n\\t};\\n\\n\\t$: w = direction === \\"horizontal\\" ? `${children * width}px` : \\"100%\\";\\n\\t$: h = direction === \\"vertical\\" ? `${children * height}px` : \\"100%\\";\\n\\n\\t$: x = direction === \\"horizontal\\" ? `${index * width * -1}px` : 0;\\n\\t$: y = direction === \\"vertical\\" ? `${index * height * -1}px` : 0;\\n\\n\\t$: sW = `width: ${w};`;\\n\\t$: sH = `height: ${h};`;\\n\\t$: sT = `transform: translate3d(${x}, ${y}, 0);`;\\n\\t$: sTD = `transition-duration: ${duration};`;\\n\\t$: sTTF = `transition-timing-function: ${timing};`;\\n\\t$: customStyle = `${sW} ${sH} ${sT} ${sTD} ${sTTF}`;\\n\\n\\t// context\\n\\t$: _direction.set(direction);\\n\\t$: _width.set(width);\\n\\t$: _height.set(height);\\n\\t$: _current.set(current);\\n\\t$: context = {\\n\\t\\tdir: _direction,\\n\\t\\tcur: _current,\\n\\t\\tw: _width,\\n\\t\\th: _height,\\n\\t\\tcount: _count\\n\\t};\\n\\t$: setContext(\\"Slider\\", context);\\n\\n\\tonMount(() => {\\n\\t\\tchildren = translateEl.children.length;\\n\\t\\tcount = children;\\n\\t\\t_count.set(count);\\n\\t\\tobserver = new IntersectionObserver(onIntersect, {\\n\\t\\t\\troot: null,\\n\\t\\t\\trootMargin: \\"-1px\\"\\n\\t\\t});\\n\\t\\tobserver.observe(sliderEl);\\n\\t\\theight = height;\\n\\t\\twidth = width;\\n\\t});\\n<\/script>\\n\\n<section\\n\\taria-label=\\"carousel\\"\\n\\tclass=\\"slider {direction}\\"\\n\\tbind:this={sliderEl}\\n\\tbind:clientWidth={width}\\n\\tbind:clientHeight={height}\\n>\\n\\t<div class=\\"slides\\" bind:this={translateEl} style={customStyle}>\\n\\t\\t<slot />\\n\\t</div>\\n</section>\\n\\n<style>\\n\\tsection {\\n\\t\\tposition: relative;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tz-index: 1;\\n\\t\\toverflow: hidden;\\n\\t}\\n\\n\\t.slides {\\n\\t\\tdisplay: -webkit-box;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-wrap: wrap;\\n\\t\\tposition: relative;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\t-webkit-transition-property: -webkit-transform;\\n\\t\\ttransition-property: -webkit-transform;\\n\\t\\ttransition-property: transform;\\n\\t\\ttransition-property: transform, -webkit-transform;\\n\\t\\tz-index: 1;\\n\\t}\\n\\n\\t.horizontal > .slides {\\n\\t\\t-webkit-box-orient: horizontal;\\n\\t\\t-webkit-box-direction: normal;\\n\\t\\t        flex-direction: row;\\n\\t}\\n\\n\\t.vertical > .slides {\\n\\t\\t-webkit-box-orient: vertical;\\n\\t\\t-webkit-box-direction: normal;\\n\\t\\t        flex-direction: column;\\n\\t}</style>\\n"],"names":[],"mappings":"AAyHC,qCAAQ,CACP,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,MACX,CAEA,qCAAQ,CACP,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,2BAA2B,CAAE,iBAAiB,CAC9C,mBAAmB,CAAE,iBAAiB,CACtC,mBAAmB,CAAE,SAAS,CAC9B,mBAAmB,CAAE,SAAS,CAAC,CAAC,iBAAiB,CACjD,OAAO,CAAE,CACV,CAEA,0BAAW,CAAG,sBAAQ,CACrB,kBAAkB,CAAE,UAAU,CAC9B,qBAAqB,CAAE,MAAM,CACrB,cAAc,CAAE,GACzB,CAEA,wBAAS,CAAG,sBAAQ,CACnB,kBAAkB,CAAE,QAAQ,CAC5B,qBAAqB,CAAE,MAAM,CACrB,cAAc,CAAE,MACzB"}'
};
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let w;
  let h;
  let x;
  let y;
  let sW;
  let sH;
  let sT;
  let sTD;
  let sTTF;
  let customStyle;
  let context;
  let { direction = "horizontal" } = $$props;
  let { duration = "500ms" } = $$props;
  let { timing = "ease" } = $$props;
  let { count = 0 } = $$props;
  let { current = 0 } = $$props;
  const next = () => move();
  const prev = () => move();
  const jump = (val) => move();
  let children = 0;
  let index = 0;
  let width;
  let height;
  let sliderEl;
  let translateEl;
  let _direction = writable();
  let _width = writable();
  let _height = writable();
  let _current = writable();
  let _count = writable();
  const move = (val, jump2) => {
    return false;
  };
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0) $$bindings.direction(direction);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.timing === void 0 && $$bindings.timing && timing !== void 0) $$bindings.timing(timing);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0) $$bindings.count(count);
  if ($$props.current === void 0 && $$bindings.current && current !== void 0) $$bindings.current(current);
  if ($$props.next === void 0 && $$bindings.next && next !== void 0) $$bindings.next(next);
  if ($$props.prev === void 0 && $$bindings.prev && prev !== void 0) $$bindings.prev(prev);
  if ($$props.jump === void 0 && $$bindings.jump && jump !== void 0) $$bindings.jump(jump);
  $$result.css.add(css$2);
  w = direction === "horizontal" ? `${children * width}px` : "100%";
  h = direction === "vertical" ? `${children * height}px` : "100%";
  x = direction === "horizontal" ? `${index * width * -1}px` : 0;
  y = direction === "vertical" ? `${index * height * -1}px` : 0;
  sW = `width: ${w};`;
  sH = `height: ${h};`;
  sT = `transform: translate3d(${x}, ${y}, 0);`;
  sTD = `transition-duration: ${duration};`;
  sTTF = `transition-timing-function: ${timing};`;
  customStyle = `${sW} ${sH} ${sT} ${sTD} ${sTTF}`;
  {
    _direction.set(direction);
  }
  {
    _width.set(width);
  }
  {
    _height.set(height);
  }
  {
    _current.set(current);
  }
  context = {
    dir: _direction,
    cur: _current,
    w: _width,
    h: _height,
    count: _count
  };
  {
    setContext("Slider", context);
  }
  return `  <section aria-label="carousel" class="${"slider " + escape(direction, true) + " svelte-1ceqw5z"}"${add_attribute("this", sliderEl, 0)}><div class="slides svelte-1ceqw5z"${add_attribute("style", customStyle, 0)}${add_attribute("this", translateEl, 0)}>${slots.default ? slots.default({}) : ``}</div> </section>`;
});
const css$1 = {
  code: ".slide.svelte-1h814z3{position:relative;width:100%;height:100%}",
  map: '{"version":3,"file":"Slider.Slide.svelte","sources":["Slider.Slide.svelte"],"sourcesContent":["<script>\\n\\timport { getContext } from \\"svelte\\";\\n\\timport canTab from \\"$actions/canTab.js\\";\\n\\tconst { dir, cur, w, h, count } = getContext(\\"Slider\\");\\n\\n\\texport let index;\\n\\n\\t$: width = $dir === \\"horizontal\\" ? `${$w}px` : \\"100%\\";\\n\\t$: height = $dir === \\"vertical\\" ? `${$h}px` : \\"100%\\";\\n\\t$: visible = index === $cur;\\n\\t$: disable = !visible;\\n<\/script>\\n\\n<div\\n\\tid=\\"slide-{index}\\"\\n\\tclass=\\"slide\\"\\n\\tclass:visible\\n\\tstyle:width\\n\\tstyle:height\\n\\trole=\\"group\\"\\n\\taria-label=\\"slide {index + 1} of {$count}\\"\\n\\taria-current={visible}\\n\\tuse:canTab={{ disable }}\\n>\\n\\t<slot />\\n</div>\\n\\n<style>\\n\\t.slide {\\n\\t\\tposition: relative;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}</style>\\n"],"names":[],"mappings":"AA4BC,qBAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACT"}'
};
const Slider_Slide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let width;
  let height;
  let visible;
  let $cur, $$unsubscribe_cur;
  let $h, $$unsubscribe_h;
  let $dir, $$unsubscribe_dir;
  let $w, $$unsubscribe_w;
  let $count, $$unsubscribe_count;
  const { dir, cur, w, h, count } = getContext("Slider");
  $$unsubscribe_dir = subscribe(dir, (value) => $dir = value);
  $$unsubscribe_cur = subscribe(cur, (value) => $cur = value);
  $$unsubscribe_w = subscribe(w, (value) => $w = value);
  $$unsubscribe_h = subscribe(h, (value) => $h = value);
  $$unsubscribe_count = subscribe(count, (value) => $count = value);
  let { index } = $$props;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  $$result.css.add(css$1);
  width = $dir === "horizontal" ? `${$w}px` : "100%";
  height = $dir === "vertical" ? `${$h}px` : "100%";
  visible = index === $cur;
  $$unsubscribe_cur();
  $$unsubscribe_h();
  $$unsubscribe_dir();
  $$unsubscribe_w();
  $$unsubscribe_count();
  return `<div id="${"slide-" + escape(index, true)}" class="${["slide svelte-1h814z3", visible ? "visible" : ""].join(" ").trim()}" role="group" aria-label="${"slide " + escape(index + 1, true) + " of " + escape($count, true)}"${add_attribute("aria-current", visible, 0)}${add_styles({ width, height })}>${slots.default ? slots.default({}) : ``} </div>`;
});
const css = {
  code: "article.svelte-1myyodm{position:absolute;top:5rem;left:50%;-webkit-transform:translate(-50%, 0);transform:translate(-50%, 0);width:100%;max-width:45rem;padding:1rem;z-index:3;pointer-events:none}.slide a{pointer-events:auto;white-space:nowrap}",
  map: '{"version":3,"file":"Demo.IgStory.svelte","sources":["Demo.IgStory.svelte"],"sourcesContent":["<script>\\n\\t/**\\n\\t * This is a demonstration of how you might use Tap and Slider/Slide to make an IG story format.\\n\\t * - I\'d recommend making `activeSlide` and `dir` into global stores in stores/misc.js.\\n\\t * - `sections` should be brought in from your copy doc.\\n\\t */\\n\\timport Chapters from \\"$components/demo/Demo.IgStory.Chapters.svelte\\";\\n\\timport Figure from \\"$components/demo/Demo.IgStory.Figure.svelte\\";\\n\\timport Tap from \\"$components/helpers/Tap.svelte\\";\\n\\timport Slider from \\"$components/helpers/Slider.svelte\\";\\n\\timport Slide from \\"$components/helpers/Slider.Slide.svelte\\";\\n\\n\\tlet sliderEl;\\n\\n\\tlet activeSlide = 0;\\n\\tlet dir;\\n\\n\\tconst sections = [\\n\\t\\t{\\n\\t\\t\\ttitle: \\"Intro\\",\\n\\t\\t\\tslides: [\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\ti: 0,\\n\\t\\t\\t\\t\\ttext: [\\n\\t\\t\\t\\t\\t\\t{ type: \\"h1\\", text: \\"title\\" },\\n\\t\\t\\t\\t\\t\\t{ type: \\"p\\", text: \\"welcome\\" }\\n\\t\\t\\t\\t\\t]\\n\\t\\t\\t\\t}\\n\\t\\t\\t]\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\ttitle: \\"Middle\\",\\n\\t\\t\\tslides: [\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\ti: 1,\\n\\t\\t\\t\\t\\ttext: [\\n\\t\\t\\t\\t\\t\\t{ type: \\"p\\", text: \\"the quick brown\\" },\\n\\t\\t\\t\\t\\t\\t{ type: \\"p\\", text: \\"the quick brown\\" },\\n\\t\\t\\t\\t\\t\\t{ type: \\"p\\", text: \\"the quick brown\\" }\\n\\t\\t\\t\\t\\t]\\n\\t\\t\\t\\t},\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\ti: 2,\\n\\t\\t\\t\\t\\ttext: [\\n\\t\\t\\t\\t\\t\\t{ type: \\"p\\", text: \\"fox jumps over\\" },\\n\\t\\t\\t\\t\\t\\t{ type: \\"p\\", text: \\"fox jumps over\\" }\\n\\t\\t\\t\\t\\t]\\n\\t\\t\\t\\t},\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\ti: 3,\\n\\t\\t\\t\\t\\ttext: [{ type: \\"p\\", text: \\"the lazy dog\\" }]\\n\\t\\t\\t\\t}\\n\\t\\t\\t]\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\ttitle: \\"Outro\\",\\n\\t\\t\\tslides: [\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\ti: 4,\\n\\t\\t\\t\\t\\ttext: [{ type: \\"h2\\", text: \\"the end.\\" }]\\n\\t\\t\\t\\t}\\n\\t\\t\\t]\\n\\t\\t}\\n\\t];\\n\\tconst allSlides = sections\\n\\t\\t.map((d, i) => d.slides.map((s) => ({ ...s, section: i })))\\n\\t\\t.flat();\\n\\n\\tconst onTap = ({ detail }) => {\\n\\t\\tif (detail === \\"right\\") sliderEl.next();\\n\\t\\telse sliderEl.prev();\\n\\t\\twindow.scrollTo(0, 0);\\n\\t\\tdir = detail;\\n\\t};\\n<\/script>\\n\\n<Chapters {activeSlide} {sections} {allSlides} />\\n\\n<article>\\n\\t<Slider bind:this={sliderEl} bind:current={activeSlide} duration=\\"0\\">\\n\\t\\t{#each allSlides as slide, i}\\n\\t\\t\\t<Slide index={i}>\\n\\t\\t\\t\\t{#each slide.text as { type, text }}\\n\\t\\t\\t\\t\\t<svelte:element this={type} class=\\"slide-content\\">\\n\\t\\t\\t\\t\\t\\t{@html text}\\n\\t\\t\\t\\t\\t</svelte:element>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</Slide>\\n\\t\\t{/each}\\n\\t</Slider>\\n</article>\\n\\n<Figure {activeSlide} />\\n\\n<Tap\\n\\tdebug={false}\\n\\tfull={true}\\n\\tdirections={activeSlide === 0 ? [\\"right\\"] : [\\"left\\", \\"right\\"]}\\n\\tsize={activeSlide === 0 ? \\"100%\\" : [\\"33%\\", \\"67%\\"]}\\n\\tenableKeyboard={true}\\n\\tmarginTop={0}\\n\\ton:tap={onTap}\\n/>\\n\\n<style>\\n\\tarticle {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 5rem;\\n\\t\\tleft: 50%;\\n\\t\\t-webkit-transform: translate(-50%, 0);\\n\\t\\t        transform: translate(-50%, 0);\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 45rem;\\n\\t\\tpadding: 1rem;\\n\\t\\tz-index: 3;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\t:global(.slide a) {\\n\\t\\tpointer-events: auto;\\n\\t\\twhite-space: nowrap;\\n\\t}</style>\\n"],"names":[],"mappings":"AAyGC,sBAAQ,CACP,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,GAAG,CACT,iBAAiB,CAAE,UAAU,IAAI,CAAC,CAAC,CAAC,CAAC,CAC7B,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,CAAC,CAAC,CACrC,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IACjB,CACQ,QAAU,CACjB,cAAc,CAAE,IAAI,CACpB,WAAW,CAAE,MACd"}'
};
const Demo_IgStory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sliderEl;
  let activeSlide = 0;
  const sections = [
    {
      title: "Intro",
      slides: [
        {
          i: 0,
          text: [{ type: "h1", text: "title" }, { type: "p", text: "welcome" }]
        }
      ]
    },
    {
      title: "Middle",
      slides: [
        {
          i: 1,
          text: [
            { type: "p", text: "the quick brown" },
            { type: "p", text: "the quick brown" },
            { type: "p", text: "the quick brown" }
          ]
        },
        {
          i: 2,
          text: [
            { type: "p", text: "fox jumps over" },
            { type: "p", text: "fox jumps over" }
          ]
        },
        {
          i: 3,
          text: [{ type: "p", text: "the lazy dog" }]
        }
      ]
    },
    {
      title: "Outro",
      slides: [
        {
          i: 4,
          text: [{ type: "h2", text: "the end." }]
        }
      ]
    }
  ];
  const allSlides = sections.map((d, i) => d.slides.map((s) => ({ ...s, section: i }))).flat();
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Demo_IgStory_Chapters, "Chapters").$$render($$result, { activeSlide, sections, allSlides }, {}, {})} <article class="svelte-1myyodm">${validate_component(Slider, "Slider").$$render(
      $$result,
      {
        duration: "0",
        this: sliderEl,
        current: activeSlide
      },
      {
        this: ($$value) => {
          sliderEl = $$value;
          $$settled = false;
        },
        current: ($$value) => {
          activeSlide = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${each(allSlides, (slide, i) => {
            return `${validate_component(Slider_Slide, "Slide").$$render($$result, { index: i }, {}, {
              default: () => {
                return `${each(slide.text, ({ type, text }) => {
                  return `${((tag) => {
                    return tag ? `<${type} class="slide-content svelte-1myyodm">${is_void(tag) ? "" : `<!-- HTML_TAG_START -->${text}<!-- HTML_TAG_END --> `}${is_void(tag) ? "" : `</${tag}>`}` : "";
                  })(type)}`;
                })} `;
              }
            })}`;
          })}`;
        }
      }
    )}</article> ${validate_component(Demo_IgStory_Figure, "Figure").$$render($$result, { activeSlide }, {}, {})} ${validate_component(Tap, "Tap").$$render(
      $$result,
      {
        debug: false,
        full: true,
        directions: activeSlide === 0 ? ["right"] : ["left", "right"],
        size: activeSlide === 0 ? "100%" : ["33%", "67%"],
        enableKeyboard: true,
        marginTop: 0
      },
      {},
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Demo_IgStory, "IgStory").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

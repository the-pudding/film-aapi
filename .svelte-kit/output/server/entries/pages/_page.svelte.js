import { c as create_ssr_component, e as escape, b as add_attribute, d as each, v as validate_component, m as missing_component, f as spread, h as escape_object, g as getContext, a as subscribe, s as setContext, i as set_store_value } from "../../chunks/ssr.js";
import "d3";
import { i as is_void, I as Icon } from "../../chunks/Icon.js";
import { w as writable } from "../../chunks/index.js";
import "lodash.debounce";
const Meta = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Title TK" } = $$props;
  let { description = "Description TK" } = $$props;
  let { url = "https://pudding.cool" } = $$props;
  let { keywords = "" } = $$props;
  let { preloadFont = [] } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
  if ($$props.keywords === void 0 && $$bindings.keywords && keywords !== void 0) $$bindings.keywords(keywords);
  if ($$props.preloadFont === void 0 && $$bindings.preloadFont && preloadFont !== void 0) $$bindings.preloadFont(preloadFont);
  return `${$$result.head += `<!-- HEAD_svelte-2pghky_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="description"${add_attribute("content", description, 0)}><meta name="author" content="The Pudding"><meta name="news_keywords"${add_attribute("content", keywords, 0)}><meta property="og:title"${add_attribute("content", title, 0)}><meta property="og:site_name" content="The Pudding"><meta property="og:url"${add_attribute("content", url, 0)}><meta property="og:description"${add_attribute("content", description, 0)}><meta property="og:type" content="article"><meta property="og:locale" content="en_US"><meta property="og:image" content="${escape(url, true) + "/assets/social-facebook.jpg"}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="628"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="https://pudding.cool"><meta name="twitter:creator" content="@puddingviz"><meta name="twitter:title"${add_attribute("content", title, 0)}><meta name="twitter:description"${add_attribute("content", description, 0)}><meta name="twitter:image:src" content="${escape(url, true) + "/assets/social-twitter.jpg"}"><meta name="robots" content="max-image-preview:large"><link rel="canonical" href="${escape(url, true) + "/"}">${each(preloadFont, (href) => {
    return `<link rel="preload"${add_attribute("href", href, 0)} as="font" type="font/woff2" crossorigin>`;
  })}<!-- HEAD_svelte-2pghky_END -->`, ""}`;
});
const Demo_Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section id="demo-link" data-svelte-h="svelte-1edigqu"><h2>Link</h2> <p><a href="demo/elements">Default element styles demo</a></p> <p><a href="demo/fonts">Pudding-hosted font previews</a></p></section>`;
});
const css$6 = {
  code: 'img.svelte-x2rzvy{width:128px}.bg.svelte-x2rzvy{width:128px;height:128px;background:url("/assets/demo/test.jpg");background-size:cover;background-position:center center}',
  map: '{"version":3,"file":"Demo.Img.svelte","sources":["Demo.Img.svelte"],"sourcesContent":["<section id=\\"demo-image\\">\\n\\t<h2>Image</h2>\\n\\t<p>img tag</p>\\n\\t<img src=\\"assets/demo/test.jpg\\" alt=\\"cat\\" />\\n\\t<p>background image</p>\\n\\t<div class=\\"bg\\"></div>\\n</section>\\n\\n<style>\\n\\timg {\\n\\t\\twidth: 128px;\\n\\t}\\n\\n\\t.bg {\\n\\t\\twidth: 128px;\\n\\t\\theight: 128px;\\n\\t\\tbackground: url(\\"/assets/demo/test.jpg\\");\\n\\t\\tbackground-size: cover;\\n\\t\\tbackground-position: center center;\\n\\t}</style>\\n"],"names":[],"mappings":"AASC,iBAAI,CACH,KAAK,CAAE,KACR,CAEA,iBAAI,CACH,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,4BAA4B,CACxC,eAAe,CAAE,KAAK,CACtB,mBAAmB,CAAE,MAAM,CAAC,MAC7B"}'
};
const Demo_Img = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<section id="demo-image" data-svelte-h="svelte-1fz2jfp"><h2>Image</h2> <p>img tag</p> <img src="assets/demo/test.jpg" alt="cat" class="svelte-x2rzvy"> <p>background image</p> <div class="bg svelte-x2rzvy"></div> </section>`;
});
const Demo_SvelteElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const items = [{ tag: "h3", text: "I am a h3 tag." }, { tag: "p", text: "I am p tag." }];
  return `<section id="demo-element"><h2 data-svelte-h="svelte-fbs8sq">Dynamic Svelte Element</h2> ${each(items, ({ tag, text }) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}>${is_void(tag$1) ? "" : `${escape(text)} `}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}</section>`;
});
const Demo_SvelteComponent_A = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { number } = $$props;
  if ($$props.number === void 0 && $$bindings.number && number !== void 0) $$bindings.number(number);
  return `<p>I am component A and my favorite number is ${escape(number)}.</p>`;
});
const Demo_SvelteComponent_B = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  return `<p>I am component B and my name is ${escape(name)}.</p>`;
});
const Demo_SvelteComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const components = { A: Demo_SvelteComponent_A, B: Demo_SvelteComponent_B };
  const data = [{ component: "A", number: 42 }, { component: "B", name: "Russell" }];
  return `<section id="demo-component"><h2 data-svelte-h="svelte-kpupo5">Dynamic Svelte Component</h2> ${each(data, (d) => {
    return `${validate_component(components[d.component] || missing_component, "svelte:component").$$render($$result, Object.assign({}, d), {}, {})}`;
  })}</section>`;
});
const MicroCMS = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { components = {} } = $$props;
  let { body: body2 = [] } = $$props;
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.body === void 0 && $$bindings.body && body2 !== void 0) $$bindings.body(body2);
  return `${each(body2, ({ section, content }) => {
    let id = section.toLowerCase().replace(/[^a-z0-9]/g, ""), component = components[section];
    return `  <section${add_attribute("id", id, 0)}>${component ? `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({}, content), {}, {})}` : `${each(content, ({ type, value }) => {
      let component2 = components[type], isString = typeof value === "string";
      return `  ${component2 ? `${validate_component(component2 || missing_component, "svelte:component").$$render($$result, Object.assign({}, value), {}, {})}` : `${type === "text" ? `<p><!-- HTML_TAG_START -->${value}<!-- HTML_TAG_END --></p>` : `${isString ? `${((tag) => {
        return tag ? `<${type}>${is_void(tag) ? "" : `<!-- HTML_TAG_START -->${value}<!-- HTML_TAG_END --> `}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(type)}` : `${((tag) => {
        return tag ? `<${type}${spread([escape_object(value)], {})}>${is_void(tag) ? "" : ``}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(type)}`}`}`}`;
    })}`} </section>`;
  })}`;
});
const css$5 = {
  code: "label.svelte-13snre4{font-family:var(--sans);font-weight:bold}progress.svelte-13snre4{display:block}",
  map: '{"version":3,"file":"Demo.MicroCMS.Test.svelte","sources":["Demo.MicroCMS.Test.svelte"],"sourcesContent":["<script>\\n\\texport let value = 0;\\n\\texport let label;\\n<\/script>\\n\\n<p>This is a custom component:</p>\\n<label for=\\"#progress\\">{label}</label>\\n<progress id=\\"progress\\" {value} max=\\"100\\"></progress>\\n\\n<style>\\n\\tlabel {\\n\\t\\tfont-family: var(--sans);\\n\\t\\tfont-weight: bold;\\n\\t}\\n\\tprogress {\\n\\t\\tdisplay: block;\\n\\t}</style>\\n"],"names":[],"mappings":"AAUC,oBAAM,CACL,WAAW,CAAE,IAAI,MAAM,CAAC,CACxB,WAAW,CAAE,IACd,CACA,uBAAS,CACR,OAAO,CAAE,KACV"}'
};
const Demo_MicroCMS_Test = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = 0 } = $$props;
  let { label } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  $$result.css.add(css$5);
  return `<p data-svelte-h="svelte-77dof1">This is a custom component:</p> <label for="#progress" class="svelte-13snre4">${escape(label)}</label> <progress id="progress"${add_attribute("value", value, 0)} max="100" class="svelte-13snre4"></progress>`;
});
const googleDoc = "[body]\n\nsection: intro\n[.+content]\nh4: An h4 element with no attributes\n\nSome random text here, followed by an img tag.\n\n{.img}\nsrc: assets/demo/test.jpg\nalt: A cat\n{}\n\n{.Test}\nlabel: I’m a custom component!\nvalue: 50\n{}\n\n[]";
const css$4 = {
  code: "pre.svelte-q4c53c{background:var(--color-fg);color:var(--color-bg);padding:16px}",
  map: '{"version":3,"file":"Demo.MicroCMS.svelte","sources":["Demo.MicroCMS.svelte"],"sourcesContent":["<script>\\n\\timport { getContext } from \\"svelte\\";\\n\\timport MicroCMS from \\"$components/helpers/MicroCMS.svelte\\";\\n\\timport Test from \\"$components/demo/Demo.MicroCMS.Test.svelte\\";\\n\\timport googleDoc from \\"$data/google-doc.txt?raw\\";\\n\\n\\tconst copy = getContext(\\"copy\\");\\n\\tconst components = { Test };\\n\\tconst body = copy.body;\\n<\/script>\\n\\n<section id=\\"demo-microcms\\">\\n\\t<h2>Micro CMS</h2>\\n\\t<p>\\n\\t\\tTurn a Google Doc with a mix of text, html elements, and svelte components:\\n\\t</p>\\n\\t<code>\\n\\t\\t<pre>{googleDoc}</pre>\\n\\t</code>\\n\\t<p>Into this:</p>\\n\\t<MicroCMS {body} {components}></MicroCMS>\\n</section>\\n\\n<style>\\n\\tpre {\\n\\t\\tbackground: var(--color-fg);\\n\\t\\tcolor: var(--color-bg);\\n\\t\\tpadding: 16px;\\n\\t}</style>\\n"],"names":[],"mappings":"AAwBC,iBAAI,CACH,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,OAAO,CAAE,IACV"}'
};
const Demo_MicroCMS = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const copy2 = getContext("copy");
  const components = { Test: Demo_MicroCMS_Test };
  const body2 = copy2.body;
  $$result.css.add(css$4);
  return `<section id="demo-microcms"><h2 data-svelte-h="svelte-1kd4gxh">Micro CMS</h2> <p data-svelte-h="svelte-18p2vbt">Turn a Google Doc with a mix of text, html elements, and svelte components:</p> <code><pre class="svelte-q4c53c">${escape(googleDoc)}</pre></code> <p data-svelte-h="svelte-m66leo">Into this:</p> ${validate_component(MicroCMS, "MicroCMS").$$render($$result, { body: body2, components }, {}, {})} </section>`;
});
const css$3 = {
  code: 'figure.svelte-yftblm{display:block}.figure-inner.svelte-yftblm{position:relative;width:var(--width, "auto");height:var(--height, "auto");aspect-ratio:var(--aspect-ratio, "auto");overflow:hidden}.figure-inner > *{position:absolute;top:0;left:0;width:100%;height:100%}',
  map: '{"version":3,"file":"Figure.svelte","sources":["Figure.svelte"],"sourcesContent":["<!--\\nUsage:\\n\\t<Figure>\\n\\t\\t<svg></svg>\\n\\t</Figure>\\n\\nPass style prop directives to set dimensions (defaults are all \\"auto\\")\\n--aspect-ratio\\n--width\\n--height\\n\\nexample: <Figure --aspect-ratio=\\"1\\"></Figure> \\n\\nProps: \\n\\tdebounce: number (default 250) - debounce resize event time in ms\\n\\texclude: string (default \\"height\\") - exclude width or height from triggering resize event\\n\\tcustom: object (default {}) - custom data store to pass to children components\\n-->\\n<script>\\n\\timport { writable } from \\"svelte/store\\";\\n\\timport { onMount, setContext, tick } from \\"svelte\\";\\n\\timport { browser } from \\"$app/environment\\";\\n\\timport resize from \\"$actions/resize.js\\";\\n\\n\\texport let debounce = 250;\\n\\texport let exclude = \\"height\\";\\n\\texport let custom = {};\\n\\n\\tconst _width = writable(0);\\n\\tconst _height = writable(0);\\n\\tconst _dpr = writable(1);\\n\\tconst _custom = writable({ ...custom });\\n\\n\\tsetContext(\\"Figure\\", {\\n\\t\\twidth: _width,\\n\\t\\theight: _height,\\n\\t\\tdpr: _dpr,\\n\\t\\tcustom: _custom\\n\\t});\\n\\n\\tlet clientWidth;\\n\\tlet clientHeight;\\n\\n\\tasync function onResize() {\\n\\t\\tawait tick();\\n\\t\\t$_width = clientWidth;\\n\\t\\t$_height = clientHeight;\\n\\t}\\n\\n\\t$: $_dpr = browser ? Math.min(2, window.devicePixelRatio || 1) : 1;\\n\\n\\tonMount(() => {\\n\\t\\tonResize();\\n\\t});\\n<\/script>\\n\\n<figure>\\n\\t<div\\n\\t\\tclass=\\"figure-inner\\"\\n\\t\\tbind:clientWidth\\n\\t\\tbind:clientHeight\\n\\t\\tuse:resize={{ exclude, debounce }}\\n\\t\\ton:resize={onResize}\\n\\t>\\n\\t\\t<slot />\\n\\t</div>\\n\\t<slot name=\\"figcaption\\" />\\n</figure>\\n\\n<style>\\n\\tfigure {\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\t.figure-inner {\\n\\t\\tposition: relative;\\n\\t\\twidth: var(--width, \\"auto\\");\\n\\t\\theight: var(--height, \\"auto\\");\\n\\t\\taspect-ratio: var(--aspect-ratio, \\"auto\\");\\n\\t\\toverflow: hidden;\\n\\t}\\n\\n\\t:global(.figure-inner > *) {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}</style>\\n"],"names":[],"mappings":"AAsEC,oBAAO,CACN,OAAO,CAAE,KACV,CAEA,2BAAc,CACb,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,OAAO,CAAC,OAAO,CAAC,CAC3B,MAAM,CAAE,IAAI,QAAQ,CAAC,OAAO,CAAC,CAC7B,YAAY,CAAE,IAAI,cAAc,CAAC,OAAO,CAAC,CACzC,QAAQ,CAAE,MACX,CAEQ,iBAAmB,CAC1B,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACT"}'
};
const Figure = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_dpr, $$unsubscribe__dpr;
  let $$unsubscribe__height;
  let $$unsubscribe__width;
  let { debounce = 250 } = $$props;
  let { exclude = "height" } = $$props;
  let { custom = {} } = $$props;
  const _width = writable(0);
  $$unsubscribe__width = subscribe(_width, (value) => value);
  const _height = writable(0);
  $$unsubscribe__height = subscribe(_height, (value) => value);
  const _dpr = writable(1);
  $$unsubscribe__dpr = subscribe(_dpr, (value) => $_dpr = value);
  const _custom = writable({ ...custom });
  setContext("Figure", {
    width: _width,
    height: _height,
    dpr: _dpr,
    custom: _custom
  });
  if ($$props.debounce === void 0 && $$bindings.debounce && debounce !== void 0) $$bindings.debounce(debounce);
  if ($$props.exclude === void 0 && $$bindings.exclude && exclude !== void 0) $$bindings.exclude(exclude);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
  $$result.css.add(css$3);
  set_store_value(_dpr, $_dpr = 1, $_dpr);
  $$unsubscribe__dpr();
  $$unsubscribe__height();
  $$unsubscribe__width();
  return `  <figure class="svelte-yftblm"><div class="figure-inner svelte-yftblm">${slots.default ? slots.default({}) : ``}</div> ${slots.figcaption ? slots.figcaption({}) : ``} </figure>`;
});
const Demo_Figure = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section id="demo-figure"><h2 data-svelte-h="svelte-4e03p6">Figure</h2> <div style="display: contents; --aspect-ratio:1;">${validate_component(Figure, "Figure").$$render($$result, {}, {}, {
    figcaption: () => {
      return `<figcaption slot="figcaption" data-svelte-h="svelte-1fkipux">Figure caption</figcaption>`;
    },
    default: () => {
      return ` <svg style="background: var(--color-mark);"></svg>`;
    }
  })}</div></section>`;
});
const Dollar_sign = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "2",
        "y2": "22"
      }
    ],
    [
      "path",
      {
        "d": "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "dollar-sign" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const css$2 = {
  code: "a.tip-button.svelte-159gd8r{background:var(--color-fg);color:var(--color-bg);display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;border-radius:4px;-webkit-box-shadow:0px 3px 3px 0px var(--color-gray-500);box-shadow:0px 3px 3px 0px var(--color-gray-500);letter-spacing:0.05em;padding:12px 16px}span.svelte-159gd8r{display:inline-block;border:1px solid currentColor;width:1.5em;height:1.5em;border-radius:50%;text-align:center;display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;margin-left:8px;padding:2px}",
  map: '{"version":3,"file":"Tip.svelte","sources":["Tip.svelte"],"sourcesContent":["<script>\\n\\timport DollarSign from \\"lucide-svelte/icons/dollar-sign\\";\\n\\texport let text = \\"Tip\\";\\n\\texport let href;\\n<\/script>\\n\\n<a class=\\"tip-button\\" {href} target=\\"_blank\\" rel=\\"noreferrer\\" role=\\"button\\"\\n\\t>{text} <span><DollarSign color=\\"currentColor\\" /></span>\\n</a>\\n\\n<style>\\n\\ta.tip-button {\\n\\t\\tbackground: var(--color-fg);\\n\\t\\tcolor: var(--color-bg);\\n\\t\\tdisplay: -webkit-inline-box;\\n\\t\\tdisplay: inline-flex;\\n\\t\\t-webkit-box-align: center;\\n\\t\\t        align-items: center;\\n\\t\\t-webkit-box-pack: center;\\n\\t\\t        justify-content: center;\\n\\t\\tborder-radius: 4px;\\n\\t\\t-webkit-box-shadow: 0px 3px 3px 0px var(--color-gray-500);\\n\\t\\t        box-shadow: 0px 3px 3px 0px var(--color-gray-500);\\n\\t\\tletter-spacing: 0.05em;\\n\\t\\tpadding: 12px 16px;\\n\\t}\\n\\n\\tspan {\\n\\t\\tdisplay: inline-block;\\n\\t\\tborder: 1px solid currentColor;\\n\\t\\twidth: 1.5em;\\n\\t\\theight: 1.5em;\\n\\t\\tborder-radius: 50%;\\n\\t\\ttext-align: center;\\n\\t\\tdisplay: -webkit-inline-box;\\n\\t\\tdisplay: inline-flex;\\n\\t\\t-webkit-box-pack: center;\\n\\t\\t        justify-content: center;\\n\\t\\t-webkit-box-align: center;\\n\\t\\t        align-items: center;\\n\\t\\tmargin-left: 8px;\\n\\t\\tpadding: 2px;\\n\\t}</style>\\n"],"names":[],"mappings":"AAWC,CAAC,0BAAY,CACZ,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,OAAO,CAAE,kBAAkB,CAC3B,OAAO,CAAE,WAAW,CACpB,iBAAiB,CAAE,MAAM,CACjB,WAAW,CAAE,MAAM,CAC3B,gBAAgB,CAAE,MAAM,CAChB,eAAe,CAAE,MAAM,CAC/B,aAAa,CAAE,GAAG,CAClB,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,gBAAgB,CAAC,CACjD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,gBAAgB,CAAC,CACzD,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,CAAC,IACf,CAEA,mBAAK,CACJ,OAAO,CAAE,YAAY,CACrB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,YAAY,CAC9B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,kBAAkB,CAC3B,OAAO,CAAE,WAAW,CACpB,gBAAgB,CAAE,MAAM,CAChB,eAAe,CAAE,MAAM,CAC/B,iBAAiB,CAAE,MAAM,CACjB,WAAW,CAAE,MAAM,CAC3B,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,GACV"}'
};
const Tip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "Tip" } = $$props;
  let { href } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0) $$bindings.text(text);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  $$result.css.add(css$2);
  return `<a class="tip-button svelte-159gd8r"${add_attribute("href", href, 0)} target="_blank" rel="noreferrer" role="button">${escape(text)} <span class="svelte-159gd8r">${validate_component(Dollar_sign, "DollarSign").$$render($$result, { color: "currentColor" }, {}, {})}</span> </a>`;
});
const Demo_Tip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section id="demo-tip"><h2 data-svelte-h="svelte-1fcbwg5">Tip</h2> ${validate_component(Tip, "Tip").$$render($$result, { href: "#" }, {}, {})}</section>`;
});
const Scrolly = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { root = null } = $$props;
  let { top = 0 } = $$props;
  let { bottom = 0 } = $$props;
  let { increments = 100 } = $$props;
  let { value = void 0 } = $$props;
  const steps = [];
  const threshold = [];
  let nodes = [];
  let intersectionObservers = [];
  let container;
  const update = () => {
    if (!nodes.length) return;
    nodes.forEach(createObserver);
  };
  const mostInView = () => {
    let maxRatio = 0;
    let maxIndex = 0;
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] > maxRatio) {
        maxRatio = steps[i];
        maxIndex = i;
      }
    }
    if (maxRatio > 0) value = maxIndex;
    else value = void 0;
  };
  const createObserver = (node, index) => {
    const handleIntersect = (e) => {
      e[0].isIntersecting;
      const ratio = e[0].intersectionRatio;
      steps[index] = ratio;
      mostInView();
    };
    const marginTop = top ? top * -1 : 0;
    const marginBottom = bottom ? bottom * -1 : 0;
    const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
    const options = { root, rootMargin, threshold };
    if (intersectionObservers[index]) intersectionObservers[index].disconnect();
    const io = new IntersectionObserver(handleIntersect, options);
    io.observe(node);
    intersectionObservers[index] = io;
  };
  if ($$props.root === void 0 && $$bindings.root && root !== void 0) $$bindings.root(root);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0) $$bindings.top(top);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0) $$bindings.bottom(bottom);
  if ($$props.increments === void 0 && $$bindings.increments && increments !== void 0) $$bindings.increments(increments);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  {
    update();
  }
  return `<div${add_attribute("this", container, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const css$1 = {
  code: "h2.svelte-12sq0x6.svelte-12sq0x6{position:sticky;top:4em}.spacer.svelte-12sq0x6.svelte-12sq0x6{height:75vh}.step.svelte-12sq0x6.svelte-12sq0x6{height:80vh;background:var(--color-gray-100);text-align:center}.step.svelte-12sq0x6 p.svelte-12sq0x6{padding:1rem}",
  map: '{"version":3,"file":"Demo.Scrolly.svelte","sources":["Demo.Scrolly.svelte"],"sourcesContent":["<script>\\n\\timport Scrolly from \\"$components/helpers/Scrolly.svelte\\";\\n\\tlet value;\\n<\/script>\\n\\n<section id=\\"scrolly\\">\\n\\t<h2>Scrolly <span>{value}</span></h2>\\n\\t<div class=\\"spacer\\" />\\n\\t<Scrolly bind:value>\\n\\t\\t{#each [0, 1, 2, 3, 4] as text, i}\\n\\t\\t\\t{@const active = value === i}\\n\\t\\t\\t<div class=\\"step\\" class:active>\\n\\t\\t\\t\\t<p>{text}</p>\\n\\t\\t\\t</div>\\n\\t\\t{/each}\\n\\t</Scrolly>\\n\\t<div class=\\"spacer\\" />\\n</section>\\n\\n<style>\\n\\th2 {\\n\\t\\tposition: sticky;\\n\\t\\ttop: 4em;\\n\\t}\\n\\n\\t.spacer {\\n\\t\\theight: 75vh;\\n\\t}\\n\\n\\t.step {\\n\\t\\theight: 80vh;\\n\\t\\tbackground: var(--color-gray-100);\\n\\t\\ttext-align: center;\\n\\t}\\n\\n\\t.step p {\\n\\t\\tpadding: 1rem;\\n\\t}</style>\\n"],"names":[],"mappings":"AAoBC,gCAAG,CACF,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,GACN,CAEA,qCAAQ,CACP,MAAM,CAAE,IACT,CAEA,mCAAM,CACL,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,gBAAgB,CAAC,CACjC,UAAU,CAAE,MACb,CAEA,oBAAK,CAAC,gBAAE,CACP,OAAO,CAAE,IACV"}'
};
const Demo_Scrolly = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span>${escape(value)}</span></h2> <div class="spacer svelte-12sq0x6"></div> ${validate_component(Scrolly, "Scrolly").$$render(
      $$result,
      { value },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${each([0, 1, 2, 3, 4], (text, i) => {
            let active = value === i;
            return ` <div class="${["step svelte-12sq0x6", active ? "active" : ""].join(" ").trim()}"><p class="svelte-12sq0x6">${escape(text)}</p> </div>`;
          })}`;
        }
      }
    )} <div class="spacer svelte-12sq0x6"></div> </section>`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: "#demo.svelte-1ttpmtl{max-width:40rem;padding:16px;margin:0 auto}#demo section{margin:32px auto;padding-top:32px}#demo section > section{margin:0 auto;padding-top:0}#demo h2 span{background:var(--color-mark);padding:0 8px}",
  map: '{"version":3,"file":"Demo.svelte","sources":["Demo.svelte"],"sourcesContent":["<script>\\n\\timport DemoLink from \\"$components/demo/Demo.Link.svelte\\";\\n\\timport DemoImg from \\"$components/demo/Demo.Img.svelte\\";\\n\\timport DemoButtonSet from \\"$components/demo/Demo.ButtonSet.svelte\\";\\n\\timport DemoRange from \\"$components/demo/Demo.Range.svelte\\";\\n\\timport DemoSelect from \\"$components/demo/Demo.Select.svelte\\";\\n\\timport DemoToggle from \\"$components/demo/Demo.Toggle.svelte\\";\\n\\timport DemoSortTable from \\"$components/demo/Demo.SortTable.svelte\\";\\n\\timport DemoSvelteElement from \\"$components/demo/Demo.SvelteElement.svelte\\";\\n\\timport DemoSvelteComponent from \\"$components/demo/Demo.SvelteComponent.svelte\\";\\n\\timport DemoMicroCMS from \\"$components/demo/Demo.MicroCMS.svelte\\";\\n\\timport DemoFigure from \\"$components/demo/Demo.Figure.svelte\\";\\n\\timport DemoTip from \\"$components/demo/Demo.Tip.svelte\\";\\n\\timport DemoScrolly from \\"$components/demo/Demo.Scrolly.svelte\\";\\n<\/script>\\n\\n<div id=\\"demo\\">\\n\\t<h1>Demo</h1>\\n\\t<DemoLink />\\n\\t<DemoImg />\\n\\t<DemoSvelteElement />\\n\\t<DemoSvelteComponent />\\n\\t<DemoMicroCMS />\\n\\t<DemoTip />\\n\\t<DemoFigure />\\n\\t<DemoScrolly />\\n</div>\\n\\n<style>\\n\\t#demo {\\n\\t\\tmax-width: 40rem;\\n\\t\\tpadding: 16px;\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\t:global(#demo section) {\\n\\t\\tmargin: 32px auto;\\n\\t\\tpadding-top: 32px;\\n\\t}\\n\\n\\t:global(#demo section > section) {\\n\\t\\tmargin: 0 auto;\\n\\t\\tpadding-top: 0;\\n\\t}\\n\\n\\t:global(#demo h2 span) {\\n\\t\\tbackground: var(--color-mark);\\n\\t\\tpadding: 0 8px;\\n\\t}</style>\\n"],"names":[],"mappings":"AA6BC,oBAAM,CACL,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,CAAC,CAAC,IACX,CAEQ,aAAe,CACtB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,WAAW,CAAE,IACd,CAEQ,uBAAyB,CAChC,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,WAAW,CAAE,CACd,CAEQ,aAAe,CACtB,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,OAAO,CAAE,CAAC,CAAC,GACZ"}'
};
const Demo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div id="demo" class="svelte-1ttpmtl"><h1 data-svelte-h="svelte-ojh4tb">Demo</h1> ${validate_component(Demo_Link, "DemoLink").$$render($$result, {}, {}, {})} ${validate_component(Demo_Img, "DemoImg").$$render($$result, {}, {}, {})} ${validate_component(Demo_SvelteElement, "DemoSvelteElement").$$render($$result, {}, {}, {})} ${validate_component(Demo_SvelteComponent, "DemoSvelteComponent").$$render($$result, {}, {}, {})} ${validate_component(Demo_MicroCMS, "DemoMicroCMS").$$render($$result, {}, {}, {})} ${validate_component(Demo_Tip, "DemoTip").$$render($$result, {}, {}, {})} ${validate_component(Demo_Figure, "DemoFigure").$$render($$result, {}, {}, {})} ${validate_component(Demo_Scrolly, "DemoScrolly").$$render($$result, {}, {}, {})} </div>`;
});
const Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Demo, "Demo").$$render($$result, {}, {}, {})} `;
});
const meta = {
  title: "Title TK",
  description: "Description tk."
};
const body = [
  {
    section: "intro",
    content: [
      {
        type: "h4",
        value: "An h4 element with no attributes"
      },
      {
        type: "text",
        value: "Some random text here, followed by an img tag."
      },
      {
        type: "img",
        value: {
          src: "assets/demo/test.jpg",
          alt: "A cat"
        }
      },
      {
        type: "Test",
        value: {
          label: "I’m a custom component!",
          value: "50"
        }
      }
    ]
  }
];
const copy = {
  meta,
  body
};
function version() {
  console.log("--- --- --- --- --- ---");
  console.log(`svelte-starter: ${"5.23.0"}`);
  console.log(`build: ${"2024-10-06-08:35"}`);
  console.log("--- --- --- --- --- ---");
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  version();
  const preloadFont = [
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2"
  ];
  const { title, description, url, keywords } = copy;
  setContext("copy", copy);
  setContext("data", data.data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(Meta, "Meta").$$render(
    $$result,
    {
      title,
      description,
      url,
      preloadFont,
      keywords
    },
    {},
    {}
  )} ${validate_component(Index, "Index").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

import { c as create_ssr_component, b as add_attribute, e as escape, j as add_styles, d as each, v as validate_component } from "../../../../chunks/ssr.js";
import { groups, descending } from "d3";
import { b as base } from "../../../../chunks/paths.js";
const css$1 = {
  code: "h3.svelte-19ry7n{margin-top:0}div.svelte-19ry7n{width:calc(25em - 4px);padding:16px;background:var(--color-input-bg);color:var(--color-input-fg);margin:2px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:justify;justify-content:space-between}details.svelte-19ry7n{font-family:var(--mono)}summary.svelte-19ry7n{cursor:pointer}code.svelte-19ry7n{display:block;background:var(--color-input-fg);color:var(--color-input-bg);padding:16px;white-space:pre-wrap}button.svelte-19ry7n{font-family:var(--mono)}span.svelte-19ry7n{margin-left:16px}",
  map: '{"version":3,"file":"Demo.Fonts.Sample.svelte","sources":["Demo.Fonts.Sample.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n  import { base } from \\"$app/paths\\";\\n  import { copy } from \\"svelte-copy\\";\\n\\n  export let id = \\"\\";\\n  export let family = \\"\\";\\n  export let size = 16;\\n  export let text;\\n\\n  let source = \\"\\";\\n  let copied = \\"\\";\\n\\n  const url = `${base}/assets/demo/fonts/${id}.css`;\\n\\n  const onCopy = () => {\\n    copied = \\"Copied!\\";\\n    setTimeout(() => {\\n      copied = \\"\\";\\n    }, 1000);\\n  };\\n\\n  $: fontSize = `${size}px`;\\n\\n  onMount(async () => {\\n    const response = await fetch(url);\\n    source = await response.text();\\n  });\\n<\/script>\\n\\n<svelte:head>\\n  <link rel=\\"external stylesheet\\" href={url} />\\n</svelte:head>\\n\\n<div style=\\"font-family: \'{family}\';\\">\\n  <h3>{family}</h3>\\n  <p style:font-size={fontSize}>{text}</p>\\n  <details>\\n    <summary>CSS Snippet</summary>\\n    <code>\\n      {source}\\n    </code>\\n  </details>\\n  <p>\\n    <button use:copy={source} on:svelte-copy={onCopy}>\\n      Copy CSS to Clipboard</button\\n    ><span>{copied}</span>\\n  </p>\\n</div>\\n\\n<style>\\n  h3 {\\n    margin-top: 0;\\n  }\\n\\n  div {\\n    width: calc(25em - 4px);\\n    padding: 16px;\\n    background: var(--color-input-bg);\\n    color: var(--color-input-fg);\\n    margin: 2px;\\n    display: -webkit-box;\\n    display: flex;\\n    -webkit-box-orient: vertical;\\n    -webkit-box-direction: normal;\\n            flex-direction: column;\\n    -webkit-box-pack: justify;\\n            justify-content: space-between;\\n  }\\n\\n  details {\\n    font-family: var(--mono);\\n  }\\n\\n  summary {\\n    cursor: pointer;\\n  }\\n\\n  code {\\n    display: block;\\n    background: var(--color-input-fg);\\n    color: var(--color-input-bg);\\n    padding: 16px;\\n    white-space: pre-wrap;\\n  }\\n\\n  button {\\n    font-family: var(--mono);\\n  }\\n\\n  span {\\n    margin-left: 16px;\\n  }</style>\\n"],"names":[],"mappings":"AAmDE,gBAAG,CACD,UAAU,CAAE,CACd,CAEA,iBAAI,CACF,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CACvB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,gBAAgB,CAAC,CACjC,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,IAAI,CACb,kBAAkB,CAAE,QAAQ,CAC5B,qBAAqB,CAAE,MAAM,CACrB,cAAc,CAAE,MAAM,CAC9B,gBAAgB,CAAE,OAAO,CACjB,eAAe,CAAE,aAC3B,CAEA,qBAAQ,CACN,WAAW,CAAE,IAAI,MAAM,CACzB,CAEA,qBAAQ,CACN,MAAM,CAAE,OACV,CAEA,kBAAK,CACH,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,IAAI,gBAAgB,CAAC,CACjC,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,QACf,CAEA,oBAAO,CACL,WAAW,CAAE,IAAI,MAAM,CACzB,CAEA,kBAAK,CACH,WAAW,CAAE,IACf"}'
};
const Demo_Fonts_Sample = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fontSize;
  let { id = "" } = $$props;
  let { family = "" } = $$props;
  let { size = 16 } = $$props;
  let { text } = $$props;
  let source = "";
  let copied = "";
  const url = `${base}/assets/demo/fonts/${id}.css`;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.family === void 0 && $$bindings.family && family !== void 0) $$bindings.family(family);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0) $$bindings.text(text);
  $$result.css.add(css$1);
  fontSize = `${size}px`;
  return `${$$result.head += `<!-- HEAD_svelte-1uevrx3_START --><link rel="external stylesheet"${add_attribute("href", url, 0)}><!-- HEAD_svelte-1uevrx3_END -->`, ""} <div style="${"font-family: '" + escape(family, true) + "';"}" class="svelte-19ry7n"><h3 class="svelte-19ry7n">${escape(family)}</h3> <p${add_styles({ "font-size": fontSize })}>${escape(text)}</p> <details class="svelte-19ry7n"><summary class="svelte-19ry7n" data-svelte-h="svelte-1p4cxwi">CSS Snippet</summary> <code class="svelte-19ry7n">${escape(source)}</code></details> <p><button class="svelte-19ry7n" data-svelte-h="svelte-v2s51m">Copy CSS to Clipboard</button><span class="svelte-19ry7n">${escape(copied)}</span></p> </div>`;
});
const fontData = [
  {
    id: "atkinson",
    family: "Atkinson",
    type: "sans-serif"
  },
  {
    id: "atlas",
    family: "Atlas Grotesk",
    type: "sans-serif"
  },
  {
    id: "baloo-bhai",
    family: "Baloo Bhai",
    type: "sans-serif"
  },
  {
    id: "canela",
    family: "Canela",
    type: "serif"
  },
  {
    id: "computer-modern",
    family: "Computer Modern",
    type: "serif"
  },
  {
    id: "cozette",
    family: "Cozette",
    type: "other"
  },
  {
    id: "inter",
    family: "Inter",
    type: "sans-serif"
  },
  {
    id: "jamboree",
    family: "Jamboree",
    type: "other"
  },
  {
    id: "jersey",
    family: "Jersey M54",
    type: "other"
  },
  {
    id: "lyon",
    family: "Lyon Display",
    type: "serif"
  },
  {
    id: "metropolis",
    family: "Metropolis",
    type: "sans-serif"
  },
  {
    id: "national",
    family: "National 2 Web",
    type: "sans-serif"
  },
  {
    id: "publico",
    family: "Publico Text",
    type: "serif"
  },
  {
    id: "recoleta",
    family: "Recoleta",
    type: "serif"
  },
  {
    id: "rubik",
    family: "Rubik",
    type: "sans-serif"
  },
  {
    id: "inconsolata",
    family: "Inconsolata",
    type: "mono"
  },
  {
    id: "spacemono",
    family: "Space Mono",
    type: "mono"
  },
  {
    id: "tiempos",
    family: "Tiempos Text",
    type: "serif"
  }
];
const css = {
  code: "#info.svelte-1lzc8ku{text-align:center}article.svelte-1lzc8ku{margin:32px auto;max-width:75em}section.svelte-1lzc8ku{display:-webkit-box;display:flex;flex-wrap:wrap;margin-bottom:64px}label.svelte-1lzc8ku{display:block;margin-bottom:8px}",
  map: '{"version":3,"file":"Demo.Fonts.svelte","sources":["Demo.Fonts.svelte"],"sourcesContent":["<script>\\n\\timport { groups, descending } from \\"d3\\";\\n\\timport Sample from \\"$components/demo/Demo.Fonts.Sample.svelte\\";\\n\\timport fontData from \\"$components/demo/demo-fonts.json\\";\\n\\tlet size = 18;\\n\\tlet text = \\"The quick brown fox jumps over the lazy dog.\\";\\n\\n\\tconst grouped = groups(fontData, (d) => d.type);\\n\\tgrouped.sort((a, b) => descending(a[1].length, b[1].length));\\n<\/script>\\n\\n<div id=\\"info\\">\\n\\t<h1>Hosted Fonts on The Pudding</h1>\\n\\t<p>\\n\\t\\t<em>Do not use fonts hosted by The Pudding without written permission.</em>\\n\\t</p>\\n\\t<form>\\n\\t\\t<label for=\\"size\\">font-size: {size}px</label>\\n\\t\\t<input id=\\"size\\" type=\\"range\\" min=\\"12\\" max=\\"48\\" bind:value={size} />\\n\\t\\t<label for=\\"text\\">text sample</label>\\n\\t\\t<input id=\\"text\\" type=\\"text\\" maxlength=\\"100\\" bind:value={text} />\\n\\t</form>\\n</div>\\n\\n<article>\\n\\t{#each grouped as [type, fonts]}\\n\\t\\t<h2>{type}</h2>\\n\\t\\t<section>\\n\\t\\t\\t{#each fonts as { family, id }}\\n\\t\\t\\t\\t<Sample {id} {family} {size} {text} />\\n\\t\\t\\t{/each}\\n\\t\\t</section>\\n\\t{/each}\\n</article>\\n\\n<style>\\n\\t#info {\\n\\t\\ttext-align: center;\\n\\t}\\n\\n\\tarticle {\\n\\t\\tmargin: 32px auto;\\n\\t\\tmax-width: 75em;\\n\\t}\\n\\n\\tsection {\\n\\t\\tdisplay: -webkit-box;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-wrap: wrap;\\n\\t\\tmargin-bottom: 64px;\\n\\t}\\n\\n\\tlabel {\\n\\t\\tdisplay: block;\\n\\t\\tmargin-bottom: 8px;\\n\\t}</style>\\n"],"names":[],"mappings":"AAoCC,oBAAM,CACL,UAAU,CAAE,MACb,CAEA,sBAAQ,CACP,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,SAAS,CAAE,IACZ,CAEA,sBAAQ,CACP,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,IAChB,CAEA,oBAAM,CACL,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAChB"}'
};
const Demo_Fonts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let size = 18;
  let text = "The quick brown fox jumps over the lazy dog.";
  const grouped = groups(fontData, (d) => d.type);
  grouped.sort((a, b) => descending(a[1].length, b[1].length));
  $$result.css.add(css);
  return `<div id="info" class="svelte-1lzc8ku"><h1 data-svelte-h="svelte-1m2hcwq">Hosted Fonts on The Pudding</h1> <p data-svelte-h="svelte-895ja5"><em>Do not use fonts hosted by The Pudding without written permission.</em></p> <form><label for="size" class="svelte-1lzc8ku">font-size: ${escape(size)}px</label> <input id="size" type="range" min="12" max="48"${add_attribute("value", size, 0)}> <label for="text" class="svelte-1lzc8ku" data-svelte-h="svelte-16zo6eo">text sample</label> <input id="text" type="text" maxlength="100"${add_attribute("value", text, 0)}></form></div> <article class="svelte-1lzc8ku">${each(grouped, ([type, fonts]) => {
    return `<h2>${escape(type)}</h2> <section class="svelte-1lzc8ku">${each(fonts, ({ family, id }) => {
      return `${validate_component(Demo_Fonts_Sample, "Sample").$$render($$result, { id, family, size, text }, {}, {})}`;
    })} </section>`;
  })} </article>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Demo_Fonts, "DemoFonts").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

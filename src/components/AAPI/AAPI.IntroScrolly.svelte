<script>
  import Scrolly from "$components/helpers/Scrolly.svelte";
  let width, height, panelWidth, panelHeight;
  let value;
  let stages = [
    "stage 1",
    "stage 2",
    "stage 3",
    "stage 4",
    "stage 5",
    "stage 6"
  ]
  let bubbleSize = {
    "1": 25,
    "2": 40,
    "3": 20,
    "4": 30,
    "5": 0,
    "6": 30
  }
  let bubbleText = {
    "1": "My mother, Haimei, is a Chinese immigrant who spent decades building a life in New York City.",
    "2": "After her two children grew up and moved out, all she wants to do these days is cuddle with her dog and watch TV.",
    "3": "Recently she was watching Emily In Paris, a Netflix TV show.",
    "4": "She was excited to see a Chinese character—when she noticed something she couldn’t ignore.",
    "5": "",
    "6": "She couldn't help but think that think Asian actors are interchangeable."
  }
  $: {
    if (value == undefined) {value = 0}
  }
</script>

<div class="outsideContainer">
  <section id="scrolly">
    <div class="visualContainer" bind:clientWidth={width} bind:clientHeight={height}>
      <div class="comicContainer" style="transform: translateY(-{ (value+1)/6.9*100}%);">
        {#each [1,2,3,4,5,6] as comic}
        <div class="panel" bind:clientWidth={panelWidth} bind:clientHeight={panelHeight}>
          <div class="comicWrapper" style="opacity: {value + 1 === comic ? 1 : 0.2};">
            <img class="comicPanel" src="assets/images/comic/comic{comic}.png"/>
            {#if bubbleSize[comic] > 0}
            <div class="textPanel" style="height: {bubbleSize[comic]}%;">{bubbleText[comic]}</div>
            {/if}
            <div class="fuzzy" style="background-image: url('assets/images/grain.png');"></div>
          </div>
          {#each [0,1,2,3,4,5,6,7,8] as hole}
          <div class="left hole" style="top:{ (hole+0.5)/9*100}%;"></div>
          {/each}
          {#each [0,1,2,3,4,5,6,7,8] as hole}
          <div class="right hole" style="top:{ (hole+0.5)/9*100}%;"></div>
          {/each}
          <div class="stripText"><span>{comic}</span>By Anna Li and Dorothy Lu for the Pudding</div>
        </div>
        {/each} 
      </div>
    </div>
    <div class="stepContainer">
      <Scrolly bind:value>
        {#each stages as stage, i}
        {@const active = value === i}
        <div class="step">
          <!-- <div class="stepText">
            <p>{stage}</p>
          </div> -->
        </div>
        {/each}
      </Scrolly>
    </div>
  </section>
</div>

<style>
  .stepContainer {
    margin-top: -100vh;
  }
  @font-face {
    font-family: "Pangolin";
    src: url("assets/fonts/pangolin.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    font-display: swap;
  }

  .visualContainer {
    height: 100vh;
    overflow: hidden;
}
.comicContainer {
  width: 100%;
  max-width: 600px;
  margin-top: 50vh;
  position: absolute;
  top: 0%;
  transition: all 500ms cubic-bezier(0.420, 0.000, 0.580, 1.000); /* ease-in-out */
  transition-timing-function: cubic-bezier(0.420, 0.000, 0.580, 1.000); /* ease-in-out */
  box-shadow: 2px 2px 10px 12px rgba(0,0,0,0.1);
  border-radius: 2px;
}
.textPanel {
  font-family:  "Pangolin", var(--sans);
  background: #c08b7d;
  height: 20%;
  font-size: 29px;
  line-height: 32px;
  font-weight: bold;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 16px;
  box-sizing: border-box;
  border-bottom: 3px solid #281113;
  color: #281113;
}
.panel {
  background: #221a24;
  padding: 15px 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.panel:first-child {
  padding-top: 30px;
  border-radius: 3px 3px 0 0;
}
.comicWrapper {
  position: relative;
  width: calc(100% - 40px);
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  transition: opacity 500ms cubic-bezier(0.250, 0.250, 0.750, 0.750);
transition-timing-function: cubic-bezier(0.250, 0.250, 0.750, 0.750);
}
.comicPanel {
  width: 120%;
  margin-left: -10%;
  margin-top: -10%;
  max-width: none;
  aspect-ratio: 1 / 1;
}

.fuzzy {
  animation: grain 20s steps(10) infinite;
  content: "";
  height: 500%;
  width: 500%;
  opacity: 1;
  position: absolute;
  left: -125%;
  top: -125%;
  pointer-events: none;
}
@keyframes grain {
  0%, 100% { transform:translate(0, 0) }
  10% { transform:translate(-5%, -10%) }
  20% { transform:translate(8%, 5%) }
  30% { transform:translate(-7%, -5%) }
  40% { transform:translate(5%, 20%) }
  50% { transform:translate(-15%, -10%) }
  60% { transform:translate(0%, 0%) }
  70% { transform:translate(0%, -12%) }
  80% { transform:translate(-10%, 12%) }
  90% { transform:translate(10%, -10%) }
}

.hole {
  position: absolute;
  width: 25px;
  height: 20px;
  border-radius: 3px;
  background: var(--bgcolor);
  box-shadow: inset 2px 2px 8px -2px #000;
}
.hole.left {
  left: 20px;
}
.hole.right {
  right: 20px;
}
.stripText {
  position: absolute;
  left: 7px;
  color: #cf9b19;
  opacity: 0.9;
  font-size: 12px;
  text-transform: uppercase;
  width: 10px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--mono);
}
.stripText span {
  font-size: 13px;
  font-weight: bold;
  margin: 0px 0 70px;
}
</style>

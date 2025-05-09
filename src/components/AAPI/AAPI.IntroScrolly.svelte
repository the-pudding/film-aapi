<script>
 import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
 import { onMount } from 'svelte';
 let width, height, panelWidth, panelHeight;
 let value;
 let comicRefs = [];
 let panelOpacities = [1, 0.1, 0.1, 0.1, 0.1, 0.1];

 const stages = [
  "stage 1",
  "stage 2",
  "stage 3",
  "stage 4",
  "stage 5",
  "stage 6"
]
const bubbleSize = {
  "1": 25,
  "2": 25,
  "3": 12,
  "4": 25,
  "5": 12,
  "6": 20
}
const bubbleText = {
  "1": "My mother, Haimei, is a Chinese immigrant who spent decades building a life in New York City.",
  "2": "After her two children grew up and moved, all she wants to do these days is cuddle with her dog and watch TV.",
  "3": "Recently she put on Netflix.",
  "4": "She was excited to see a Chinese character—when she noticed something she couldn't ignore.",
  "5": "She called me to complain.",
  "6": "After that, my friend Dorothy and I started noticing this a lot more."
}

const smallerBubbles = [
    // 1
  [
    {x: 68, y: 30, w: 20, text: "Who is buying dumplings at 3AM?"}   
  ],
    // 2
  [
    {x: 60, y: 40, w: 20, text: "I'm headed out now, Mom! "},
    {x: 30, y: 70, w: 20, text: "Ok, see ya!"}    
  ],
    // 3
  [
    {x: 65, y: 25, w: 25, text: "Oh? I've always wanted to live in Paris..."},
    {x: 50, y: 82, w: 30, text: "Wow! A Chinese girl in Paris? I wish that could've been me..."}   
  ],
    // 4
  [
    {x: 62, y: 60, w: 30, text: "呆在原地！Stay right where you are!"}   
  ],
    // 5
  [
    {x: 50, y: 30, w: 40, text: "Something's off about Mindy, but I don't know what!"},
    {x: 50, y: 58, w: 30, text: "I agree... let me look her up."},
    {x: 35, y: 73, w: 40, text: "Oh, I see. It says she's played by a Korean actor! No wonder she doesn't feel Chinese."} 
  ],
    // 6
  [
    {x: 32, y: 85, w: 40, text:"Hey, this seems pretty common! I wonder..."},
    {x: 50, y: 42, w: 50, text:"Why do they have Simu Liu playing a Korean?"}
  ]
];

$: {
  if (value == undefined) {value = 0}
}

let windowWidth = 0;
let windowHeight = 0;

function getResponsiveBubbleStyle(bub, index, comicIndex) {
    // Only handle positioning, not font size (handled in CSS now)
  let x = bub.x;
  let y = bub.y;
  let w = bub.w;

    // Adjust size for smaller screens
  if (windowWidth < 500) {
      // Instead of reducing width too much, adjust it less dramatically
      w = Math.max(w * 0.95, w); // Keep original width as minimum
      
      // Adjust x position to keep bubbles within bounds if needed
      if (x + w > 95) {
        x = 95 - w;
      }
    }
    
    return `left: ${x}%; top: ${y}%; width: ${w}%;`;
  }

  // Handle scroll events to update panel opacities
  onMount(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      comicRefs.forEach((panel, index) => {
        if (panel) {
          const rect = panel.getBoundingClientRect();
          const panelCenter = rect.top + (rect.height / 2);
          const viewportCenter = viewportHeight / 2;

          // Calculate how centered the panel is in the viewport
          const distanceFromCenter = Math.abs(panelCenter - viewportCenter);
          const percentVisible = 1 - Math.min(distanceFromCenter / (viewportHeight), 1);

          // Update opacity based on visibility
          panelOpacities[index] = Math.max(0.2, percentVisible);
        }
      });

      // Force Svelte to update
      panelOpacities = [...panelOpacities];
    };
    
    const handleResize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial calculations
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<!-- SVG Filters for the squiggly border effect -->
<svg width="0" height="0" style="position: absolute;">
  <defs>
    <!-- Strong squiggly for main comic container -->
    <filter id="squiggly-strong" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    
    <!-- Medium squiggly for panel borders -->
    <filter id="squiggly-medium" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    
    <!-- Light squiggly for text bubbles -->
    <filter id="squiggly-light" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.00" numOctaves="0" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>

<div id="intro">
  <div class="comicContainer">
    {#each [1,2,3,4,5,6] as comic, i}
    <div class="panel" 
    bind:clientWidth={panelWidth} 
    bind:clientHeight={panelHeight} 
    bind:this={comicRefs[i]}>
    <div class="comicWrapper" style="opacity: {panelOpacities[i]};">
      <img class="comicPanel" src="assets/images/comic/comic-0{comic}-620.png"/>
      {#if comic == 1}
      <div class="downarrow">↓</div>
      {/if}
      {#if bubbleSize[comic] > 0}
      <div class="textPanel" style="height: {bubbleSize[comic]}%;">{bubbleText[comic]}</div>
      {/if}
      {#each smallerBubbles[comic - 1] as bub, j}
      <div class="smallerBubble smallerBubble{j}" style={getResponsiveBubbleStyle(bub, j, comic - 1)}>
        {bub.text}
      </div>
      {/each}
      <div class="fuzzy" style="background-image: url('assets/images/grain.png');"></div>
    </div>
    {#each [0,1,2,3,4,5,6,7,8] as hole}
    <div class="left hole" style="top:{ (hole+0.5)/9*100}%;"></div>
    {/each}
    {#each [0,1,2,3,4,5,6,7,8] as hole}
    <div class="right hole" style="top:{ (hole+0.5)/9*100}%;"></div>
    {/each}
    <!-- <div class="stripText"><span>{comic}</span>By Anna Li and Dorothy Lu for the Pudding</div> -->
  </div>
  {/each} 
</div>
<!-- <div class="transition">So this got us wondering...</div> -->
<AAPITitle />
</div>

<style>
  .transition {
    margin: 40px auto;
    text-align: center;
    font-size: 30px;
  }
  #intro {
    background: var(--intro-bg);
    width: 100%;
    padding-bottom: 0px;
    margin-bottom: 50px;
    font-family:  "Pangolin", var(--sans);
  }
  .comicContainer {
    width: 90%;
    max-width: 600px;
/*     box-shadow: 2px 2px 10px 12px rgba(0,0,0,0.1); */
    border-radius: 2px;
    margin: 0 auto;
    border: 3px solid #000;
    /* Add the squiggly filter */
    filter: url('#squiggly-strong');
  }
  /* Base Styling for Down Arrow */
  .downarrow {
    position: absolute;
    color: white;
    font-size: 40px;
    left: 50%;
    bottom: 0%;
    font-weight: bold;
    text-shadow: 0 0 12px #000;
    transform: translateX(-50%);
    animation: bounceDown 2s infinite ease-in-out; /* Apply the animation */
  }

/* Keyframes for Bouncing Down Animation */
@keyframes bounceDown {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-15px);
  }
  60% {
    transform: translateX(-50%) translateY(-7px);
  }
}
.textPanel {
  background: var(--textbox-bg);
  height: 20%;
  font-size: 29px;
  line-height: 32px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #281113;
  color: #281113;
  /* Remove the filter */
  filter: none;
}
@media (max-width: 680px) {
  .textPanel {
    font-size: 27px;
    line-height: 30px;
    padding: 12px;
  }
}
@media (max-width: 640px) {
  .textPanel {
    font-size: 27px;
    line-height: 29px;
    padding: 12px;
  }
}
@media (max-width: 550px) {
  .textPanel {
    font-size: 25px;
    line-height: 27px;
    padding: 12px;
  }
}
@media (max-width: 500px) {
  .textPanel {
    font-size: 22px;
    line-height: 24px;
    padding: 12px;
  }
}
@media (max-width: 430px) {
  .textPanel {
    font-size: 20px;
    line-height: 23px;
    padding: 12px;
  }
}
@media (max-width: 390px) {
  .textPanel {
    font-size: 18px;
    line-height: 20px;
    padding: 10px;
  }
}
@media (max-width: 350px) {
  .textPanel {
    font-size: 16px;
    line-height: 18px;
    padding: 8px;
  }
}
.textPanel:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5px; /* Slightly thicker to ensure visibility */
  background-color: #281113;
  z-index: 1;
  filter: url('#squiggly-medium');
  transform: translateY(2px); /* Offset slightly */
}
.panel {
  background: var(--panel-bg);
  padding: 25px 30px;
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
  border-radius: 10px;
  transition: opacity 200ms cubic-bezier(0.250, 0.250, 0.750, 0.750);
  transition-timing-function: cubic-bezier(0.250, 0.250, 0.750, 0.750);
  border: 3px solid #000;
  /* Add the squiggly filter */
  filter: url('#squiggly-medium');
}
.comicPanel {
  width: 100%;
  margin-top: 0%;
  max-width: none;
  aspect-ratio: 1 / 1;
}

.fuzzy {
  animation: grain 30s steps(10) infinite;
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
  background: var(--intro-bg);
  border: 3px solid #000;
  box-sizing: border-box;
  /* Add the squiggly filter */
  filter: url('#squiggly-medium');
}
.hole.left {
  left: 15px;
}
.hole.right {
  right: 15px;
}
.stripText {
  position: absolute;
  left: 7px;
  color: var(--textbox-bg-comic);
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
.smallerBubble {
  font-family: "Pangolin", var(--sans);
  font-size: 16px; /* Base font size - larger than before */
  line-height: 18px;
  padding: 10px;
  border: 2px solid #281113;
  position: absolute;
  background: var(--textbox-bg-comic);
  border-radius: 9px;
  /* Add the squiggly filter */
  filter: none;
}

@media (max-width: 620px) {
  .comicContainer {
    width: 100%;
  }
  .stripText {
    display: none;
  }
  .hole {
    width: 15px;
    height: 15px;
    border-radius: 2px;
  }
  .hole.left {
    left: 6px;
  }
  .hole.right {
    right: 6px;
  }
  .panel {
    padding: 10px 10px;
  }
  .smallerBubble {
    font-size: 15px; /* Still quite large at this breakpoint */
    line-height: 17px;
  }
}

@media (max-width: 500px) {
  .comicWrapper {
    width: calc(100% - 26px);
  }
  .hole {
    width: 5px;
    height: 20px;
  }
  .hole.left {
    left: 4px;
  }
  .hole.right {
    right: 4px;
  }
  .panel {
    padding: 10px 0px;
  }
  .panel:first-child {
    padding-top: 20px;
  }
  .smallerBubble {
    padding: 6px 8px;
    border-width: 1.5px;
    font-size: 14px; /* Keep text relatively large */
    line-height: 16px;
    margin-top: -10px;
  }

  .panel:nth-child(3) .smallerBubble {
    font-size: 13px;
    line-height: 15px;
    margin-top: -20px;
  }
}

@media (max-width: 400px) {
  .smallerBubble {
    font-size: 14px; /* Still readable at smallest sizes */
    line-height: 16px;
    padding: 5px 7px;
    margin-top: -15px;
  }
  /* Even more specific adjustments for really small screens */
  .panel:nth-child(3) .smallerBubble1 {
    margin-top: -20px;
    margin-left: -10%;
    width: 40% !important;
  }
  .panel:nth-child(6) .smallerBubble {
    font-size: 20px;
    line-height: 24px;
    margin-top: 0;
  }
}
</style>
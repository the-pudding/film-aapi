<script>
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
    "5": 20,
    "6": 0
  }
  const bubbleText = {
    "1": "My mother, Haimei, is a Chinese immigrant who spent decades building a life in New York City.",
    "2": "After her two children grew up and moved, all she wants to do these days is cuddle with her dog and watch TV.",
    "3": "Recently she put on Netflix.",
    "4": "She was excited to see a Chinese character—when she noticed something she couldn't ignore.",
    "5": "Something just felt off about the Chinese character.",
    "6": ""
  }

  const smallerBubbles = [
    // 1
    [
      {x: 68, y: 30, w: 20, text: "Who is buying dumplings at 3AM?"}   
    ],
    // 2
    [
      {x: 65, y: 40, w: 20, text: "I'm headed out now, Mom! "},
      {x: 32, y: 70, w: 20, text: "Ok, see ya!"}    
    ],
    // 3
    [
      {x: 65, y: 25, w: 25, text: "Oh? I've always wanted to live in Paris..."},
      {x: 62, y: 82, w: 30, text: "Wow! A Chinese girl in Paris? I wish that could've been me..."}   
    ],
    // 4
    [
      {x: 62, y: 80, w: 30, text: "呆在原地！Stay right where you are!"}   
    ],
    // 5
    [
      {x: 55, y: 50, w: 40, text: "Oh no wonder... they got a Korean girl to play her. No wonder she doesn't feel Chinese."} 
    ],
    // 6
    [
      {x: 5, y: 8, w: 80, text:"I guess Hollywood doesn't care to get it right…"}
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
      window.removeEventListener('resize', handleResize); // Fixed: was addEventListener
    };
  });
</script>

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
</div>
<style>
  #intro {
    background: var(--intro-bg);
    width: 100%;
    padding-bottom: 50px;
  }
  .comicContainer {
    width: 90%;
    max-width: 600px;
    box-shadow: 2px 2px 10px 12px rgba(0,0,0,0.1);
    border-radius: 2px;
    margin: 0 auto;
    margin-bottom: 100px;
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
  cursor: pointer; /* Changes cursor to indicate it's clickable */
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
    font-family:  "Pangolin", var(--sans);
    background: var(--textbox-bg);
    height: 20%;
    font-size: 29px;
    line-height: 32px;
/*     font-weight: bold; */
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 16px;
    box-sizing: border-box;
    border-bottom: 3px solid #281113;
    color: #281113;
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
/*     aspect-ratio: 1 / 1; */
border-radius: 10px;
transition: opacity 200ms cubic-bezier(0.250, 0.250, 0.750, 0.750);
transition-timing-function: cubic-bezier(0.250, 0.250, 0.750, 0.750);
}
.comicPanel {
  width: 110%;
  margin-top: -10%;
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
/*   background: var(--textbox-bg); */
background: var(--textbox-bg-comic);
  border-radius: 9px;
}
.panel:nth-child(6) .smallerBubble {
    font-size: 26px;
    line-height: 28px;
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
  .panel:nth-child(6) .smallerBubble {
    font-size: 22px;
    line-height: 26px;
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
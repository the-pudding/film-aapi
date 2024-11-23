<script>
    export let x = 0; // X position
    export let y = 0; // Y position
    export let color = "gray"; // Dot color
    export let size = 20; // Dot size
    export let tooltip = ""; // Tooltip text
  </script>
  
  <div
    class="dot"
    style="--x: {x}px; --y: {y}px; --color: {color}; --size: {size}px;"
    title={tooltip}
  ></div>
  
  <style>
    .dot {
      position: absolute;
      top: var(--y);
      left: var(--x);
      width: var(--size);
      height: var(--size);
      background-color: var(--color);
      border-radius: 50%;
      cursor: pointer;
      will-change: transform, opacity;
    }
  
  </style>
  
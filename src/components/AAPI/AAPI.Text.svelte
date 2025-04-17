<script>
  import { onMount } from 'svelte';
  export let texts, size;

  function convertToHTML(text) {
    let finalText = [];
    let inList = false;

    if (text != undefined) {
      let textArray = text.split(/\n/); // Split by single newlines
      textArray.forEach(function (line) {
        // Convert Markdown links [text](url) to HTML <a> tags
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Convert Markdown bold **bold** to HTML <strong> tags
        line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // Convert Markdown italics *italic* to HTML <em> tags
        line = line.replace(/\*([^*]+)\*/g, '<em>$1</em>');

        // Process chart placeholders
        if (line.indexOf(">>") !== -1) {
          line = "<div class='chartPlaceholder'>" + line + "</div>";
        }

        // Add only lines with valid content
        if (/[A-Za-z0-9]/.test(line)) {
          finalText.push(line);
        }
      });

      // Close any open <ul> tag at the end
      if (inList) {
        finalText.push('</ul>');
      }

      return wrapInPTags(finalText);
    }
  }


  function wrapInPTags(arr) {
    return arr
    .map(item => {
      // Skip wrapping valid block-level elements
      if (/<\/?(ul|li|blockquote|div|svelte:component)(\s|>|$)/.test(item)) {
        return item;
      }
      // Wrap standalone content in <p> tags if not empty
      if (item.trim() !== '') {
        return `<p>${item}</p>`;
      }
      return ''; // Return an empty string for empty lines
    })
    .filter(item => item.trim() !== '') // Remove empty strings
    .join(''); // Join all elements into a single string without any separator
  }



</script>

  <div class="textContainer {size}">
    {@html convertToHTML(texts)}
  </div>

<style>

  .textContainer {
    max-width: 600px;
    width: 100%;
    overflow-wrap: break-word;
    text-align: justify; /* Optional: To center the text inside */
    margin: 0 auto;

  }

</style>



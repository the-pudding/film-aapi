<script>
  import { onMount } from 'svelte';
  import AAPIImages from "$components/AAPI/AAPI.Images.svelte";
  export let texts, size;
  
  let processedContent = [];
  
  onMount(() => {
    if (texts) {
      processedContent = processText(texts);
    }
  });
  
  function processText(text) {
    let result = [];
    let currentBlock = { type: 'text', content: [] };
    
    if (text) {
      const lines = text.split(/\n/);
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Check if line is an image marker
        if (line.trim().startsWith(">>")) {
          // If we have accumulated text, add it to the result
          if (currentBlock.type === 'text' && currentBlock.content.length > 0) {
            result.push({ ...currentBlock });
            currentBlock = { type: 'text', content: [] };
          }
          
          // Process the image line
          const imageParts = line.substring(2).trim().split('|').map(part => part.trim());
          const imageData = {
            type: 'image',
            url: 'assets/images/' + (imageParts[0] || ''),
            urlmobile: imageParts.length >= 2 ? 'assets/images/' + imageParts[1] : '',
            alt: imageParts.length >= 3 ? imageParts[2] : '',
            caption: imageParts.length >= 4 ? imageParts[3] : '',
            title: imageParts.length >= 5 ? imageParts[4] : '',
            subtitle: imageParts.length >= 6 ? imageParts[5] : '',
            content: []
          };
          
          // Check if the next line(s) should be included with this image
          let j = i + 1;
          while (j < lines.length && !lines[j].trim().startsWith(">>") && lines[j].trim() !== '') {
            // Process markdown in the content line
            let contentLine = processMarkdown(lines[j]);
            if (contentLine.trim() !== '') {
              imageData.content.push(contentLine);
            }
            j++;
          }
          
          // Add the image block to the result
          result.push(imageData);
          
          // Skip the lines we've already processed
          i = j - 1;
        } else {
          // Process regular text line
          line = processMarkdown(line);
          
          // Only add non-empty lines
          if (/[A-Za-z0-9]/.test(line)) {
            currentBlock.content.push(line);
          }
        }
      }
      
      // Add any remaining text
      if (currentBlock.type === 'text' && currentBlock.content.length > 0) {
        result.push(currentBlock);
      }
    }
    
    return result;
  }
  
  function processMarkdown(line) {
    // Convert Markdown links [text](url) to HTML <a> tags
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    // Convert Markdown bold **bold** to HTML <strong> tags
    line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Convert Markdown italics *italic* to HTML <em> tags
    line = line.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // Process chart placeholders
    if (line.indexOf(">>") !== -1 && !line.trim().startsWith(">>")) {
      line = "<div class='chartPlaceholder'>" + line + "</div>";
    }
    return line;
  }
</script>

<div class="textContainer {size}">
  {#each processedContent as block}
    {#if block.type === 'text'}
      {#each block.content as line}
        <p>{@html line}</p>
      {/each}
    {:else if block.type === 'image'}
      <AAPIImages 
        url={block.url} 
        urlmobile={block.urlmobile} 
        alt={block.alt} 
        caption={block.caption} 
        title={block.title} 
        subtitle={block.subtitle}>
        {#each block.content as line}
          <p>{@html line}</p>
        {/each}
      </AAPIImages>
    {/if}
  {/each}
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
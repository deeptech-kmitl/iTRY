export const reduceHtml = (html: string, maxTags: number) => {
  if (typeof DOMParser !== "undefined" && document !== undefined) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const tags = doc.body.children;

    // Slice the HTML tags to keep only the first 'maxTags'
    const truncatedTags = Array.from(tags).slice(0, maxTags);

    // Create a new div to hold the truncated content
    const truncatedContainer = document?.createElement('div');

    // Append the truncated tags to the container
    truncatedTags.forEach(tag => {
      truncatedContainer.appendChild(tag.cloneNode(true));
    });

    // Serialize the container's content back to HTML
    return truncatedContainer.innerHTML;
  }

  return html;

};
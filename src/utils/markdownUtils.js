// Enhanced markdown utilities for rich text editing

// Convert HTML to Markdown (for storage)
export const htmlToMarkdown = (html) => {
  if (!html) return "";

  let markdown = html
    // Headers
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")

    // Bold and Italic
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")

    // Underline
    .replace(/<u[^>]*>(.*?)<\/u>/gi, "__$1__")

    // Text color (convert to markdown if possible, otherwise preserve as HTML)
    .replace(
      /<span[^>]*style="[^"]*color:\s*([^;"]+)[^"]*"[^>]*>(.*?)<\/span>/gi,
      '<span style="color: $1">$2</span>'
    )

    // Background color
    .replace(
      /<span[^>]*style="[^"]*background-color:\s*([^;"]+)[^"]*"[^>]*>(.*?)<\/span>/gi,
      '<span style="background-color: $1">$2</span>'
    )

    // Links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")

    // Images
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, "![$2]($1)")
    .replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, "![]($1)")

    // Lists
    .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, "* $1\n") + "\n";
    })
    .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
      let counter = 1;
      return (
        content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`) +
        "\n"
      );
    })

    // Tables - only convert actual table elements
    .replace(/<table[^>]*>(.*?)<\/table>/gis, (match, content) => {
      const rows = content.match(/<tr[^>]*>(.*?)<\/tr>/gis) || [];
      let tableMarkdown = "";

      // Only process if we have actual table rows with table cells
      if (rows.length > 0) {
        rows.forEach((row, index) => {
          const cells = row.match(/<t[dh][^>]*>(.*?)<\/t[dh]>/gis) || [];
          const cellContent = cells.map((cell) => {
            return cell.replace(/<t[dh][^>]*>(.*?)<\/t[dh]>/gis, "$1").trim();
          });

          if (cellContent.length > 0) {
            tableMarkdown += "| " + cellContent.join(" | ") + " |\n";

            // Add separator row after header
            if (index === 0) {
              tableMarkdown +=
                "| " + cellContent.map(() => "---").join(" | ") + " |\n";
            }
          }
        });

        return tableMarkdown + "\n";
      }

      // If no proper table structure, return as plain text
      return content.replace(/<[^>]*>/g, "") + "\n\n";
    })

    // Line breaks and paragraphs
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")

    // Remove any remaining HTML tags (but preserve color and typography spans)
    .replace(/<(?!span)[^>]*>/g, "")

    // Clean up extra whitespace
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();

  return markdown;
};

// Enhanced Markdown to HTML converter with table support
export const markdownToHtml = (markdown) => {
  if (!markdown) return "";

  let html =
    markdown
      // Tables - only convert if there are explicit table HTML tags
      // This prevents accidental table creation from text content
      .replace(/<table[^>]*>(.*?)<\/table>/gis, (match, content) => {
        const rows = content.match(/<tr[^>]*>(.*?)<\/tr>/gis) || [];
        let tableHtml =
          '<table class="border-collapse border border-gray-300 w-full mb-4">';

        if (rows.length > 0) {
          // Check if first row should be header
          const firstRow = rows[0];
          const hasHeader =
            firstRow.includes("<th") || firstRow.includes("<td");

          if (hasHeader) {
            tableHtml += "<thead>";
            tableHtml += firstRow.replace(
              /<td/g,
              '<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold"'
            );
            tableHtml += "</thead>";
            tableHtml += "<tbody>";
            rows.slice(1).forEach((row) => {
              tableHtml += row.replace(
                /<td/g,
                '<td class="border border-gray-300 px-4 py-2"'
              );
            });
            tableHtml += "</tbody>";
          } else {
            tableHtml += "<tbody>";
            rows.forEach((row) => {
              tableHtml += row.replace(
                /<td/g,
                '<td class="border border-gray-300 px-4 py-2"'
              );
            });
            tableHtml += "</tbody>";
          }
        }

        tableHtml += "</table>";
        return tableHtml;
      })

      // Headers
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-semibold text-gray-800 mb-2 mt-4 first:mt-0">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-bold text-gray-800 mb-3 mt-6 first:mt-0">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-2xl font-bold text-gray-800 mb-4 mt-8 first:mt-0">$1</h1>'
      )

      // Bold and Italic
      .replace(
        /\*\*(.*?)\*\*/gim,
        '<strong class="font-bold text-gray-900">$1</strong>'
      )
      .replace(/\*(.*?)\*/gim, '<em class="italic text-gray-700">$1</em>')
      .replace(/__(.*?)__/gim, '<u class="underline">$1</u>')

      // Preserve color spans (they should already be in HTML format)
      .replace(
        /<span style="color: ([^"]+)">(.*?)<\/span>/gi,
        '<span style="color: $1">$2</span>'
      )
      .replace(
        /<span style="background-color: ([^"]+)">(.*?)<\/span>/gi,
        '<span style="background-color: $1">$2</span>'
      )
      // Preserve typography spans
      .replace(
        /<span style="font-size: ([^"]+)">(.*?)<\/span>/gi,
        '<span style="font-size: $1">$2</span>'
      )
      .replace(
        /<span style="line-height: ([^"]+)">(.*?)<\/span>/gi,
        '<span style="line-height: $1">$2</span>'
      )
      .replace(
        /<span style="letter-spacing: ([^"]+)">(.*?)<\/span>/gi,
        '<span style="letter-spacing: $1">$2</span>'
      )
      .replace(
        /<span style="word-spacing: ([^"]+)">(.*?)<\/span>/gi,
        '<span style="word-spacing: $1">$2</span>'
      )

      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/gim,
        '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
      )

      // Images
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/gim,
        '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md mb-4" />'
      )

      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc mb-1">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc mb-1">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal mb-1">$1</li>')

      // Handle lists properly
      .replace(
        /(<li class="ml-4 list-disc[^>]*>.*?<\/li>)/gims,
        '<ul class="mb-3 space-y-1">$1</ul>'
      )
      .replace(
        /(<li class="ml-4 list-decimal[^>]*>.*?<\/li>)/gims,
        '<ol class="mb-3 space-y-1">$1</ol>'
      )
      .replace(/<\/ul>\s*<ul[^>]*>/gim, "") // Merge consecutive unordered lists
      .replace(/<\/ol>\s*<ol[^>]*>/gim, "") // Merge consecutive ordered lists

      // Line breaks and paragraphs
      .replace(/\n\n/gim, '</p><p class="mb-3">')
      .replace(/\n/gim, "<br>")

      // Wrap in paragraph if not starting with header, list, or table
      .replace(/^(?!<h[1-6]|<li|<table)/gim, '<p class="mb-3">') +
    // Close any unclosed paragraphs
    (markdown.includes("\n\n") || markdown.match(/^[^#<]/m) ? "</p>" : "");

  return html;
};

// Convert HTML to plain text (for previews)
export const htmlToText = (html) => {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, "") // Remove all HTML tags
    .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
    .replace(/&amp;/g, "&") // Replace HTML entities
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

// Sanitize HTML to prevent XSS
export const sanitizeHtml = (html) => {
  if (!html) return "";

  // Create a temporary div to parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Remove script tags and event handlers
  const scripts = tempDiv.querySelectorAll("script");
  scripts.forEach((script) => script.remove());

  // Remove event handlers from all elements
  const allElements = tempDiv.querySelectorAll("*");
  allElements.forEach((element) => {
    const attributes = element.attributes;
    for (let i = attributes.length - 1; i >= 0; i--) {
      const attr = attributes[i];
      if (attr.name.startsWith("on") || attr.name === "javascript:") {
        element.removeAttribute(attr.name);
      }
    }
  });

  return tempDiv.innerHTML;
};

// Format content for display (combines sanitization and conversion)
export const formatContentForDisplay = (content, isHtml = false) => {
  if (!content) return "";

  if (isHtml) {
    // If content is already HTML, sanitize and return
    return sanitizeHtml(content);
  } else {
    // If content is markdown, convert to HTML
    return sanitizeHtml(markdownToHtml(content));
  }
};

// Format content for storage (convert HTML to markdown)
export const formatContentForStorage = (content, isHtml = false) => {
  if (!content) return "";

  if (isHtml) {
    // If content is HTML, convert to markdown for storage
    return htmlToMarkdown(content);
  } else {
    // If content is already markdown, return as is
    return content;
  }
};

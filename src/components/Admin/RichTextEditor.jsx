/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Enter your content here...",
}) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const editorRef = useRef(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const savedRange = useRef(null);

  useEffect(() => {
    // Only update the editor content if it's different from the current value
    // and if the editor is not currently focused to prevent cursor jumping
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      const isFocused = document.activeElement === editorRef.current;
      if (!isFocused) {
        if (value) {
          editorRef.current.innerHTML = value;
        } else {
          editorRef.current.innerHTML = "";
        }
      }
    }
  }, [value]);

  // Set initial content when component mounts
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, []);

  // Clean up PDF formatting when content is loaded
  useEffect(() => {
    if (editorRef.current && value) {
      // Clean up any existing PDF formatting in the editor
      const cleanedHtml = cleanPastedHtml(editorRef.current.innerHTML);
      if (cleanedHtml !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = cleanedHtml;
        handleContentChange();
      }

      // Auto-fix text formatting issues
      setTimeout(() => {
        fixTextFormatting();
      }, 100);
    }
  }, [value]);

  useEffect(() => {
    // Inject custom styles for headers
    const styleId = "rich-text-editor-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        [contenteditable] h1 {
          font-size: 2.5rem !important;
          font-weight: 900 !important;
          color: #1f2937 !important;
          margin: 1.5rem 0 1rem 0 !important;
          line-height: 1.2 !important;
          border-bottom: 3px solid #3b82f6 !important;
          padding-bottom: 0.5rem !important;
          word-wrap: break-word !important;
          hyphens: none !important;
          text-align: left !important;
          display: block !important;
          width: 100% !important;
        }
        [contenteditable] h2 {
          font-size: 2rem !important;
          font-weight: 700 !important;
          color: #374151 !important;
          margin: 1.25rem 0 0.75rem 0 !important;
          line-height: 1.3 !important;
          border-bottom: 2px solid #6b7280 !important;
          padding-bottom: 0.25rem !important;
          word-wrap: break-word !important;
          hyphens: none !important;
          text-align: left !important;
          display: block !important;
          width: 100% !important;
        }
        [contenteditable] h3 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          color: #4b5563 !important;
          margin: 1rem 0 0.5rem 0 !important;
          line-height: 1.4 !important;
          border-left: 4px solid #9ca3af !important;
          padding-left: 0.75rem !important;
          word-wrap: break-word !important;
          hyphens: none !important;
          text-align: left !important;
          display: block !important;
          width: 100% !important;
        }
        [contenteditable] h4 {
          font-size: 1.25rem !important;
          font-weight: 500 !important;
          color: #6b7280 !important;
          margin: 0.75rem 0 0.5rem 0 !important;
          line-height: 1.5 !important;
          background-color: #f3f4f6 !important;
          padding: 0.25rem 0.5rem !important;
          border-radius: 0.25rem !important;
          word-wrap: break-word !important;
          hyphens: none !important;
          text-align: left !important;
          display: block !important;
          width: 100% !important;
        }
        [contenteditable] h5 {
          font-size: 1.125rem !important;
          font-weight: 400 !important;
          color: #9ca3af !important;
          margin: 0.5rem 0 0.25rem 0 !important;
          line-height: 1.6 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          word-wrap: break-word !important;
          hyphens: none !important;
          text-align: left !important;
          display: block !important;
          width: 100% !important;
        }
        [contenteditable] h6 {
          font-size: 1rem !important;
          font-weight: 300 !important;
          color: #d1d5db !important;
          margin: 0.5rem 0 0.25rem 0 !important;
          line-height: 1.6 !important;
          font-style: italic !important;
          text-decoration: underline !important;
          word-wrap: break-word !important;
          hyphens: none !important;
          text-align: left !important;
          display: block !important;
          width: 100% !important;
        }
        [contenteditable] p {
          margin: 0.75rem 0 !important;
          line-height: 1.6 !important;
          text-align: left !important;
          word-wrap: break-word !important;
          hyphens: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection.toString();
  };

  const getSelectionRange = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(editorRef.current);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const start = preSelectionRange.toString().length;
      return { start, end: start + range.toString().length };
    }
    return { start: 0, end: 0 };
  };

  const saveSelection = () => {
    // Check if editor ref exists
    if (!editorRef.current) {
      return;
    }

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // Only save if the selection is within our editor
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        savedRange.current = range.cloneRange();
        // Update format state
        updateFormatState();
      }
    }
  };

  const updateFormatState = () => {
    setFormatState({
      bold: isFormatActive("bold"),
      italic: isFormatActive("italic"),
      underline: isFormatActive("underline"),
    });
  };

  const restoreSelection = () => {
    if (savedRange.current) {
      try {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedRange.current);
      } catch (error) {
        // If restoration fails, clear the saved range
        savedRange.current = null;
      }
    }
  };

  const getCurrentSelection = () => {
    // Check if editor ref exists
    if (!editorRef.current) {
      return null;
    }

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // Only return if the selection is within our editor
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        return range.cloneRange();
      }
    }
    return null;
  };

  const applyStyleToSelection = (styleProperty, value) => {
    const currentRange = getCurrentSelection();
    if (currentRange && !currentRange.collapsed) {
      const span = document.createElement("span");
      span.style[styleProperty] = value;

      try {
        // Try to wrap the selection
        currentRange.surroundContents(span);
      } catch (error) {
        // If that fails, extract content and wrap it
        const contents = currentRange.extractContents();
        span.appendChild(contents);
        currentRange.insertNode(span);
      }

      handleContentChange();
    }
  };

  const execCommand = (command, value = null) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    restoreSelection();

    // Special handling for bold, italic, and underline to toggle them
    if (command === "bold" || command === "italic" || command === "underline") {
      const isActive = document.queryCommandState(command);
      if (isActive) {
        // If already active, remove the formatting
        document.execCommand(command, false, false);
      } else {
        // If not active, apply the formatting
        document.execCommand(command, false, true);
      }
    } else {
      document.execCommand(command, false, value);
    }

    handleContentChange();
  };

  const insertTable = () => {
    const tableHTML = `
      <table class="border-collapse border border-gray-300 w-full mb-4">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Header 1</th>
            <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Header 2</th>
            <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Cell 1</td>
            <td class="border border-gray-300 px-4 py-2">Cell 2</td>
            <td class="border border-gray-300 px-4 py-2">Cell 3</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Cell 4</td>
            <td class="border border-gray-300 px-4 py-2">Cell 5</td>
            <td class="border border-gray-300 px-4 py-2">Cell 6</td>
          </tr>
        </tbody>
      </table>
    `;

    if (!editorRef.current) return;
    
    editorRef.current.focus();
    restoreSelection();
    document.execCommand("insertHTML", false, tableHTML);
    handleContentChange();
  };

  const insertList = (type) => {
    const listHTML =
      type === "ordered"
        ? '<ol class="list-decimal list-inside mb-4"><li>First item</li><li>Second item</li><li>Third item</li></ol>'
        : '<ul class="list-disc list-inside mb-4"><li>First item</li><li>Second item</li><li>Third item</li></ul>';

    if (!editorRef.current) return;
    
    editorRef.current.focus();
    restoreSelection();
    document.execCommand("insertHTML", false, listHTML);
    handleContentChange();
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      const selectedText = getSelectedText();
      const linkText = selectedText || "Link";
      const linkHTML = `<a href="${url}" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">${linkText}</a>`;

      if (!editorRef.current) return;
      
      editorRef.current.focus();
      restoreSelection();
      document.execCommand("insertHTML", false, linkHTML);
      handleContentChange();
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const imageHTML = `<img src="${url}" alt="Image" class="max-w-full h-auto rounded-lg shadow-md mb-4" />`;

      if (!editorRef.current) return;
      
      editorRef.current.focus();
      restoreSelection();
      document.execCommand("insertHTML", false, imageHTML);
      handleContentChange();
    }
  };

  const setTextColor = () => {
    const color = prompt("Enter color (e.g., red, #ff0000, rgb(255,0,0)):");
    if (color) {
      if (!editorRef.current) return;
      
      editorRef.current.focus();
      restoreSelection();
      document.execCommand("foreColor", false, color);
      handleContentChange();
    }
  };

  const setBackgroundColor = () => {
    const color = prompt(
      "Enter background color (e.g., yellow, #ffff00, rgb(255,255,0)):"
    );
    if (color) {
      if (!editorRef.current) return;
      
      editorRef.current.focus();
      restoreSelection();
      document.execCommand("hiliteColor", false, color);
      handleContentChange();
    }
  };

  const setFontSize = () => {
    const sizes = [
      { label: "8px", value: "8px" },
      { label: "10px", value: "10px" },
      { label: "12px", value: "12px" },
      { label: "14px", value: "14px" },
      { label: "16px", value: "16px" },
      { label: "18px", value: "18px" },
      { label: "20px", value: "20px" },
      { label: "24px", value: "24px" },
      { label: "28px", value: "28px" },
      { label: "32px", value: "32px" },
      { label: "36px", value: "36px" },
      { label: "48px", value: "48px" },
      { label: "Custom...", value: "custom" },
    ];

    // Create a simple dropdown using prompt for now
    const sizeOptions = sizes.map((s, i) => `${i + 1}. ${s.label}`).join("\n");
    const choice = prompt(
      `Select font size:\n${sizeOptions}\n\nOr enter custom size (e.g., 15px, 1.2em):`
    );

    if (choice) {
      if (!editorRef.current) return;
      
      editorRef.current.focus();
      restoreSelection();

      let selectedSize;

      // Check if it's a number choice from the list
      if (
        /^\d+$/.test(choice) &&
        parseInt(choice) >= 1 &&
        parseInt(choice) <= sizes.length
      ) {
        const selected = sizes[parseInt(choice) - 1];
        if (selected.value === "custom") {
          selectedSize = prompt(
            "Enter custom font size (e.g., 15px, 1.2em, 2rem):"
          );
        } else {
          selectedSize = selected.value;
        }
      } else {
        // Direct input
        selectedSize = choice;
      }

      if (selectedSize) {
        applyStyleToSelection("fontSize", selectedSize);
      }
    }
  };

  const setLineHeight = () => {
    const height = prompt("Enter line height (e.g., 1.2, 1.5, 2, 20px):");
    if (height) {
      if (!editorRef.current) return;
      
      editorRef.current.focus();
      restoreSelection();
      applyStyleToSelection("lineHeight", height);
    }
  };

  const setLetterSpacing = () => {
    const spacing = prompt("Enter letter spacing (e.g., 1px, 0.5em, 2px):");
    if (spacing) {
      if (!editorRef.current) return;
      
      editorRef.current.focus();
      restoreSelection();
      applyStyleToSelection("letterSpacing", spacing);
    }
  };

  const setWordSpacing = () => {
    const spacing = prompt("Enter word spacing (e.g., 2px, 0.5em, 1px):");
    if (spacing) {
      if (!editorRef.current) return;
      
      editorRef.current.focus();
      restoreSelection();
      applyStyleToSelection("wordSpacing", spacing);
    }
  };

  const clearFormatting = () => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    restoreSelection();

    const currentRange = getCurrentSelection();
    if (currentRange && !currentRange.collapsed) {
      // Remove all formatting by getting plain text and replacing
      const plainText = currentRange.toString();
      currentRange.deleteContents();
      currentRange.insertNode(document.createTextNode(plainText));
    }
    handleContentChange();
  };

  const cleanPdfFormatting = () => {
    if (editorRef.current) {
      const cleanedHtml = cleanPastedHtml(editorRef.current.innerHTML);
      editorRef.current.innerHTML = cleanedHtml;
      handleContentChange();
    }
  };

  const fixTextFormatting = () => {
    if (editorRef.current) {
      // Fix heading formatting issues
      const headings = editorRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      headings.forEach((heading) => {
        // Remove any unwanted line breaks within headings
        heading.innerHTML = heading.innerHTML.replace(/\s+/g, " ").trim();
        // Ensure proper text alignment
        heading.style.textAlign = "left";
        heading.style.display = "block";
        heading.style.width = "100%";
        heading.style.wordWrap = "break-word";
        heading.style.hyphens = "none";
      });

      // Fix paragraph formatting
      const paragraphs = editorRef.current.querySelectorAll("p");
      paragraphs.forEach((p) => {
        // Clean up paragraph text
        p.innerHTML = p.innerHTML.replace(/\s+/g, " ").trim();
        p.style.textAlign = "left";
        p.style.wordWrap = "break-word";
        p.style.hyphens = "none";
      });

      handleContentChange();
    }
  };

  const removeFontSize = () => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    restoreSelection();

    const currentRange = getCurrentSelection();
    if (currentRange && !currentRange.collapsed) {
      const container = currentRange.commonAncestorContainer;
      let targetElement = container;

      // If the container is a text node, get its parent
      if (container.nodeType === Node.TEXT_NODE) {
        targetElement = container.parentElement;
      }

      // If the target element is a span with font-size, remove the font-size
      if (
        targetElement &&
        targetElement.tagName === "SPAN" &&
        targetElement.style.fontSize
      ) {
        targetElement.style.removeProperty("font-size");

        // If the span has no other styles, unwrap it
        if (!targetElement.style.cssText.trim()) {
          const parent = targetElement.parentNode;
          while (targetElement.firstChild) {
            parent.insertBefore(targetElement.firstChild, targetElement);
          }
          parent.removeChild(targetElement);
        }
      }
    }
    handleContentChange();
  };

  const handleContentChange = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const getSelectionStatus = () => {
    // Check if editor ref exists
    if (!editorRef.current) {
      return "Editor not ready";
    }

    const currentRange = getCurrentSelection();
    if (currentRange && !currentRange.collapsed) {
      const selectedText = currentRange.toString();
      return `Selected: "${selectedText.substring(0, 50)}${
        selectedText.length > 50 ? "..." : ""
      }"`;
    }
    return "No text selected";
  };

  const isFormatActive = (command) => {
    try {
      return document.queryCommandState(command);
    } catch (error) {
      return false;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      execCommand("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    // Try to get HTML content first (preserves formatting)
    let html = e.clipboardData.getData("text/html");
    let text = e.clipboardData.getData("text/plain");

    // If HTML is available, use it; otherwise fall back to plain text
    if (html) {
      // Clean and format the HTML
      html = cleanPastedHtml(html);
      document.execCommand("insertHTML", false, html);
    } else {
      document.execCommand("insertText", false, text);
    }

    handleContentChange();
  };

  const cleanPastedHtml = (html) => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Remove only unwanted elements (scripts, styles, meta tags)
    const unwantedElements = tempDiv.querySelectorAll(
      "script, style, meta, link, title"
    );
    unwantedElements.forEach((el) => el.remove());

    // Clean up PDF and Word formatting
    const elements = tempDiv.querySelectorAll("*");
    elements.forEach((element) => {
      // Remove Word-specific attributes
      const attributes = element.attributes;
      for (let i = attributes.length - 1; i >= 0; i--) {
        const attr = attributes[i];
        if (
          attr.name.startsWith("o:") ||
          attr.name.startsWith("w:") ||
          attr.name.startsWith("mso-") ||
          (attr.name === "class" && attr.value.includes("Mso"))
        ) {
          element.removeAttribute(attr.name);
        }
      }

      // Clean up PDF-specific formatting
      if (element.style) {
        // Remove PDF-specific font-weight values that might appear bold
        if (element.style.fontWeight) {
          const weight = element.style.fontWeight.toLowerCase();
          if (weight === "bold" || weight === "700" || weight === "900") {
            // Keep the bold formatting but ensure it's properly applied
            element.style.fontWeight = "bold";
          } else if (weight === "normal" || weight === "400") {
            element.style.fontWeight = "normal";
          }
        }

        // Clean up font-family from PDFs
        if (element.style.fontFamily) {
          // Remove PDF-specific font families that might cause issues
          const fontFamily = element.style.fontFamily.toLowerCase();
          if (fontFamily.includes("pdf") || fontFamily.includes("embedded")) {
            element.style.fontFamily = "inherit";
          }
        }

        // Clean up other PDF-specific styles
        if (element.style.color && element.style.color.includes("rgb(0,0,0)")) {
          element.style.color = "inherit";
        }
      }

      // Convert PDF spans to proper formatting
      if (element.tagName === "SPAN") {
        const computedStyle = window.getComputedStyle(element);
        const fontWeight = computedStyle.fontWeight;

        // If span has bold styling, convert to proper <strong> tag
        if (
          fontWeight === "bold" ||
          fontWeight === "700" ||
          fontWeight === "900"
        ) {
          const strong = document.createElement("strong");
          strong.innerHTML = element.innerHTML;
          element.parentNode.replaceChild(strong, element);
        }
      }
    });

    return tempDiv.innerHTML;
  };

  const ToolbarButton = ({
    onClick,
    children,
    title,
    className = "",
    isActive = false,
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded transition-colors ${
        isActive
          ? "text-blue-600 bg-blue-100 border border-blue-300"
          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
      } ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => execCommand("bold")}
            title="Bold"
            isActive={formatState.bold}
          >
            <span className="font-bold text-sm">B</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("italic")}
            title="Italic"
            isActive={formatState.italic}
          >
            <span className="italic text-sm">I</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("underline")}
            title="Underline"
            isActive={formatState.underline}
          >
            <span className="underline text-sm">U</span>
          </ToolbarButton>
        </div>

        {/* Headers */}
        <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "<h1>")}
            title="Heading 1"
          >
            <span className="font-bold text-lg">H1</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "<h2>")}
            title="Heading 2"
          >
            <span className="font-semibold text-base">H2</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "<h3>")}
            title="Heading 3"
          >
            <span className="font-medium text-sm">H3</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "<h4>")}
            title="Heading 4"
          >
            <span className="font-normal text-xs">H4</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "<h5>")}
            title="Heading 5"
          >
            <span className="font-light text-xs">H5</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "<h6>")}
            title="Heading 6"
          >
            <span className="font-thin text-xs">H6</span>
          </ToolbarButton>
        </div>

        {/* Lists */}
        <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => insertList("unordered")}
            title="Bullet List"
          >
            <span className="text-sm">•</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => insertList("ordered")}
            title="Numbered List"
          >
            <span className="text-sm">1.</span>
          </ToolbarButton>
        </div>

        {/* Links and Media */}
        <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton onClick={insertLink} title="Insert Link">
            <span className="text-sm">🔗</span>
          </ToolbarButton>
          <ToolbarButton onClick={insertImage} title="Insert Image">
            <span className="text-sm">🖼️</span>
          </ToolbarButton>
        </div>

        {/* Colors */}
        <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton onClick={setTextColor} title="Text Color">
            <span className="text-sm">🎨</span>
          </ToolbarButton>
          <ToolbarButton onClick={setBackgroundColor} title="Background Color">
            <span className="text-sm">🖌️</span>
          </ToolbarButton>
        </div>

        {/* Typography */}
        <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton onClick={setFontSize} title="Font Size">
            <span className="text-sm">📏</span>
          </ToolbarButton>
          <ToolbarButton onClick={removeFontSize} title="Remove Font Size">
            <span className="text-sm">🔤</span>
          </ToolbarButton>
          <ToolbarButton onClick={setLineHeight} title="Line Height">
            <span className="text-sm">↕️</span>
          </ToolbarButton>
          <ToolbarButton onClick={setLetterSpacing} title="Letter Spacing">
            <span className="text-sm">↔️</span>
          </ToolbarButton>
          <ToolbarButton onClick={setWordSpacing} title="Word Spacing">
            <span className="text-sm">⏱️</span>
          </ToolbarButton>
          <ToolbarButton onClick={clearFormatting} title="Clear Formatting">
            <span className="text-sm">🧹</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={cleanPdfFormatting}
            title="Clean PDF Formatting"
          >
            <span className="text-sm">📄</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={fixTextFormatting}
            title="Fix Text Formatting"
          >
            <span className="text-sm">🔧</span>
          </ToolbarButton>
        </div>

        {/* Table */}
        <div className="flex items-center">
          <ToolbarButton onClick={insertTable} title="Insert Table">
            <span className="text-sm">📊</span>
          </ToolbarButton>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none"
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        style={{
          fontFamily: "inherit",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
        suppressContentEditableWarning={true}
      />

      {/* Help Text */}
      <div className="border-t border-gray-300 bg-gray-50 p-3 text-xs text-gray-500">
        <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded text-blue-700">
          <strong>Selection Status:</strong> {getSelectionStatus()}
        </div>
        <strong>Formatting Tips:</strong> Use the toolbar above to format your
        text. You can create tables, add links, insert images, and format text
        with bold, italic, and headers.
        <br />
        <strong>Text Selection Formatting:</strong> Select any text to apply
        formatting like font size, line height, letter spacing, and word spacing
        - just like Microsoft Word!
        <br />
        <strong>Pasting from Word/PDF:</strong> You can copy content from Word
        documents or PDFs and paste it here - the formatting will be preserved
        and cleaned up automatically!
        <br />
        <strong>PDF Formatting Issues:</strong> If text appears bold but isn't
        properly formatted, use the 📄 button to clean up PDF formatting.
        <br />
        <strong>Text Alignment Issues:</strong> If text appears broken or
        misaligned, use the 🔧 button to fix text formatting.
        <br />
        <strong>Debug:</strong> If you're experiencing issues with unwanted
        tables, use the
        <a
          href="/dashboard/admin/debug-paste"
          className="text-blue-600 hover:text-blue-800 underline ml-1"
        >
          Debug Paste Test
        </a>{" "}
        to identify the problem.
      </div>
    </div>
  );
};

export default RichTextEditor;
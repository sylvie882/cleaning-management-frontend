/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Enter your content here...",
}) => {
  const editorRef = useRef(null);
  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      editorRef.current.innerHTML = value || "";
    }
  }, []);

  // Update format state based on current selection
  const updateFormatState = () => {
    if (!editorRef.current) return;
    
    try {
      setFormatState({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
      });
    } catch (error) {
      console.log('Error updating format state:', error);
    }
  };

  // Simple command execution
  const execCommand = (command, value = null) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    try {
      if (value) {
        document.execCommand(command, false, value);
      } else {
        document.execCommand(command, false, null);
      }
      updateFormatState();
      handleContentChange();
    } catch (error) {
      console.log('Command execution error:', error);
    }
  };

  // Handle content changes
  const handleContentChange = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Insert HTML content at cursor position
  const insertHTML = (html) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    try {
      document.execCommand('insertHTML', false, html);
      handleContentChange();
    } catch (error) {
      console.log('Insert HTML error:', error);
    }
  };

  // Insert table
  const insertTable = () => {
    const tableHTML = `
      <table style="border-collapse: collapse; width: 100%; margin: 16px 0; border: 1px solid #ddd;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; font-weight: bold;">Header 1</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; font-weight: bold;">Header 2</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; font-weight: bold;">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 3</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 4</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 5</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 6</td>
          </tr>
        </tbody>
      </table>
    `;
    insertHTML(tableHTML);
  };

  // Insert list
  const insertList = (type) => {
    const listHTML = type === 'ordered' 
      ? '<ol style="margin: 16px 0; padding-left: 32px;"><li>First item</li><li>Second item</li><li>Third item</li></ol>'
      : '<ul style="margin: 16px 0; padding-left: 32px;"><li>First item</li><li>Second item</li><li>Third item</li></ul>';
    insertHTML(listHTML);
  };

  // Insert link
  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      const selectedText = window.getSelection().toString();
      const linkText = selectedText || "Link";
      const linkHTML = `<a href="${url}" target="_blank" rel="noopener">${linkText}</a>`;
      insertHTML(linkHTML);
    }
  };

  // Insert image
  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const imageHTML = `<img src="${url}" alt="Image" />`;
      insertHTML(imageHTML);
    }
  };

  // Set text color
  const setTextColor = () => {
    const color = prompt("Enter color (e.g., red, #ff0000):");
    if (color) {
      execCommand('styleWithCSS', true);
      execCommand('foreColor', color);
    }
  };

  // Set background color
  const setBackgroundColor = () => {
    const color = prompt("Enter background color (e.g., yellow, #ffff00):");
    if (color) {
      execCommand('styleWithCSS', true);
      execCommand('hiliteColor', color);
    }
  };

  // Clear formatting
  const clearFormatting = () => {
    execCommand('removeFormat');
    execCommand('unlink'); // Remove links
  };

  // Handle paste events - improved to preserve formatting
  const handlePaste = (e) => {
    e.preventDefault();
    
    // Get both HTML and plain text from clipboard
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    
    if (html) {
      // Use HTML content if available (preserves formatting)
      document.execCommand('insertHTML', false, html);
    } else {
      // Fall back to plain text
      document.execCommand('insertText', false, text);
    }
    
    handleContentChange();
  };

  // Handle key events
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }
  };

  // Toolbar button component
  const ToolbarButton = ({ onClick, children, title, isActive = false, className = "" }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`
        px-3 py-2 rounded border border-transparent transition-all duration-200
        ${isActive 
          ? 'bg-blue-500 text-white border-blue-600' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
        }
        ${className}
      `}
      style={{ minWidth: '40px', minHeight: '40px' }}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full border border-gray-300 rounded-lg shadow-sm bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-3 rounded-t-lg">
        <div className="flex flex-wrap gap-2">
          {/* Text Formatting */}
          <div className="flex flex-wrap gap-1">
            <ToolbarButton
              onClick={() => execCommand('bold')}
              title="Bold"
              isActive={formatState.bold}
            >
              <span className="font-bold text-sm">B</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand('italic')}
              title="Italic"
              isActive={formatState.italic}
            >
              <span className="italic text-sm">I</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand('underline')}
              title="Underline"
              isActive={formatState.underline}
            >
              <span className="underline text-sm">U</span>
            </ToolbarButton>
          </div>

          {/* Headers */}
          <div className="flex flex-wrap gap-1">
            <ToolbarButton
              onClick={() => execCommand('formatBlock', '<h1>')}
              title="Heading 1"
            >
              <span className="font-bold text-base">H1</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand('formatBlock', '<h2>')}
              title="Heading 2"
            >
              <span className="font-semibold text-sm">H2</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand('formatBlock', '<h3>')}
              title="Heading 3"
            >
              <span className="font-medium text-xs">H3</span>
            </ToolbarButton>
          </div>

          {/* Lists */}
          <div className="flex flex-wrap gap-1">
            <ToolbarButton
              onClick={() => insertList('unordered')}
              title="Bullet List"
            >
              <span className="text-sm">• List</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => insertList('ordered')}
              title="Numbered List"
            >
              <span className="text-sm">1. List</span>
            </ToolbarButton>
          </div>

          {/* Links and Media */}
          <div className="flex flex-wrap gap-1">
            <ToolbarButton onClick={insertLink} title="Insert Link">
              <span className="text-sm">🔗 Link</span>
            </ToolbarButton>
            <ToolbarButton onClick={insertImage} title="Insert Image">
              <span className="text-sm">🖼️ Image</span>
            </ToolbarButton>
          </div>

          {/* Colors */}
          <div className="flex flex-wrap gap-1">
            <ToolbarButton onClick={setTextColor} title="Text Color">
              <span className="text-sm">A</span>
            </ToolbarButton>
            <ToolbarButton onClick={setBackgroundColor} title="Background Color">
              <span className="text-sm">🖌️</span>
            </ToolbarButton>
          </div>

          {/* Tables */}
          <div className="flex flex-wrap gap-1">
            <ToolbarButton onClick={insertTable} title="Insert Table">
              <span className="text-sm">📊 Table</span>
            </ToolbarButton>
          </div>

          {/* Utilities */}
          <div className="flex flex-wrap gap-1">
            <ToolbarButton onClick={clearFormatting} title="Clear Formatting">
              <span className="text-sm">🧹 Clear</span>
            </ToolbarButton>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[400px] p-4 focus:outline-none"
        onInput={handleContentChange}
        onBlur={handleContentChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onMouseUp={updateFormatState}
        onKeyUp={updateFormatState}
        style={{
          fontFamily: 'inherit',
          fontSize: '16px',
          lineHeight: '1.6',
          userSelect: 'text',
          WebkitUserSelect: 'text',
          MozUserSelect: 'text',
          msUserSelect: 'text',
        }}
        data-placeholder={placeholder}
      />

      {/* Help Text */}
      <div className="border-t border-gray-200 bg-gray-50 p-3 text-sm text-gray-600 rounded-b-lg">
        <div className="mb-2">
          <strong>Tips:</strong> Select text to format it. Use Tab for indentation. 
          You can copy and paste content from any source.
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
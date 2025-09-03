import React, { useState } from "react";
import RichTextEditor from "../../components/Admin/RichTextEditor";
import {
  formatContentForDisplay,
  formatContentForStorage,
} from "../../utils/markdownUtils";

const DebugPasteTest = () => {
  const [content, setContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [rawHtml, setRawHtml] = useState("");

  const handleContentChange = (htmlContent) => {
    setContent(htmlContent);
    setRawHtml(htmlContent);

    // Convert to markdown for storage
    const markdown = formatContentForStorage(htmlContent, true);
    setMarkdownContent(markdown);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Debug Paste Test
        </h1>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">
            🔍 Debug Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>Copy your content from Word</li>
            <li>Paste it into the editor below</li>
            <li>Check the "Raw HTML" section to see what HTML was generated</li>
            <li>
              Check the "Markdown Output" to see if any table syntax was created
            </li>
            <li>
              Check the "Preview" to see how it will appear on the frontend
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Editor Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Rich Text Editor
            </h2>
            <RichTextEditor
              value={content}
              onChange={handleContentChange}
              placeholder="Paste your content here to debug..."
            />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Preview (Frontend Display)
            </h2>
            <div className="border border-gray-300 rounded-md p-4 min-h-[400px] bg-white prose prose-sm max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    formatContentForDisplay(content, true) ||
                    '<p class="text-gray-400">Preview will appear here...</p>',
                }}
              />
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Raw HTML */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Raw HTML (What the editor generated)
            </h2>
            <div className="bg-gray-100 border border-gray-300 rounded-md p-4">
              <pre className="text-xs text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {rawHtml || "Raw HTML will appear here..."}
              </pre>
            </div>
          </div>

          {/* Markdown Output */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Markdown Output (for storage)
            </h2>
            <div className="bg-gray-100 border border-gray-300 rounded-md p-4">
              <pre className="text-xs text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {markdownContent || "Markdown will appear here..."}
              </pre>
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                Table Detection
              </h3>
              <p className="text-blue-700 text-sm">
                {rawHtml.includes("<table")
                  ? "❌ Table HTML detected - This might be causing the issue"
                  : "✅ No table HTML detected - This is good"}
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                Markdown Table Syntax
              </h3>
              <p className="text-green-700 text-sm">
                {markdownContent.includes("|")
                  ? "❌ Markdown table syntax detected - This will create a table on frontend"
                  : "✅ No markdown table syntax detected - This is good"}
              </p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">
                Word-Specific Elements
              </h3>
              <p className="text-purple-700 text-sm">
                {rawHtml.includes("mso-") ||
                rawHtml.includes("o:") ||
                rawHtml.includes("w:")
                  ? "⚠️ Word-specific elements detected - These should be cleaned automatically"
                  : "✅ No Word-specific elements detected - Good"}
              </p>
            </div>
          </div>
        </div>

        {/* Clear Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setContent("");
              setMarkdownContent("");
              setRawHtml("");
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugPasteTest;

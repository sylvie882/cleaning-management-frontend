import React, { useState } from "react";
import RichTextEditor from "../../components/Admin/RichTextEditor";
import {
  formatContentForDisplay,
  formatContentForStorage,
} from "../../utils/markdownUtils";

const RichTextTest = () => {
  const [content, setContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  const handleContentChange = (htmlContent) => {
    setContent(htmlContent);
    // Convert to markdown for storage
    const markdown = formatContentForStorage(htmlContent, true);
    setMarkdownContent(markdown);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Rich Text Editor Test
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Rich Text Editor
            </h2>
            <RichTextEditor
              value={content}
              onChange={handleContentChange}
              placeholder="Start typing your content here..."
            />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Preview
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

        {/* Markdown Output */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Markdown Output (for storage)
          </h2>
          <div className="bg-gray-100 border border-gray-300 rounded-md p-4">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {markdownContent || "Markdown will appear here..."}
            </pre>
          </div>
        </div>

        {/* Sample Content */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sample Content
          </h2>
          <div className="space-y-4">
            <button
              onClick={() =>
                setContent(`
                <h1>Sample Service Description</h1>
                <p>This is a <strong>sample service description</strong> that demonstrates the rich text editor capabilities.</p>
                <h2>What's Included</h2>
                <ul>
                  <li>Deep cleaning of all surfaces</li>
                  <li>Sanitization of high-touch areas</li>
                  <li>Eco-friendly cleaning products</li>
                </ul>
                <h3>Pricing Table</h3>
                <table class="border-collapse border border-gray-300 w-full mb-4">
                  <thead>
                    <tr>
                      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Service</th>
                      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Duration</th>
                      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Basic Cleaning</td>
                      <td class="border border-gray-300 px-4 py-2">2 hours</td>
                      <td class="border border-gray-300 px-4 py-2">$50</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Deep Cleaning</td>
                      <td class="border border-gray-300 px-4 py-2">4 hours</td>
                      <td class="border border-gray-300 px-4 py-2">$100</td>
                    </tr>
                  </tbody>
                </table>
                <p>For more information, visit our <a href="https://example.com" class="text-blue-600 hover:text-blue-800 underline">website</a>.</p>
              `)
              }
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Load Sample Content
            </button>

            <button
              onClick={() => {
                setContent("");
                setMarkdownContent("");
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors ml-4"
            >
              Clear Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextTest;

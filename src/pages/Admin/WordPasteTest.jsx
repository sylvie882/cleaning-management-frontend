import React, { useState } from "react";
import RichTextEditor from "../../components/Admin/RichTextEditor";
import {
  formatContentForDisplay,
  formatContentForStorage,
} from "../../utils/markdownUtils";

const WordPasteTest = () => {
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
          Word Document Paste Test
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            📋 How to Test Word Document Pasting
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Open Microsoft Word or any word processor</li>
            <li>
              Create a document with:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>
                  <strong>Bold text</strong>
                </li>
                <li>
                  <em>Italic text</em>
                </li>
                <li>
                  <span style={{ color: "red" }}>Colored text</span>
                </li>
                <li>Tables with borders</li>
                <li>Bullet points and numbered lists</li>
                <li>Headers (H1, H2, H3)</li>
              </ul>
            </li>
            <li>Select all the content (Ctrl+A)</li>
            <li>Copy the content (Ctrl+C)</li>
            <li>Paste it into the editor below (Ctrl+V)</li>
            <li>Check if the formatting is preserved!</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Rich Text Editor
            </h2>
            <RichTextEditor
              value={content}
              onChange={handleContentChange}
              placeholder="Paste your Word document content here..."
            />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Preview (How it will appear on frontend)
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

        {/* Sample Word Content */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sample Word Content to Copy
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-4">
              Copy this content and paste it into the editor to test:
            </p>
            <div className="bg-white border border-gray-300 rounded p-4 text-sm">
              <h1
                style={{
                  color: "#2563eb",
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                Sample Service Description
              </h1>

              <p style={{ marginBottom: "12px" }}>
                This is a <strong>sample service description</strong> that
                demonstrates the rich text editor capabilities.
              </p>

              <h2
                style={{
                  color: "#1f2937",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  marginTop: "24px",
                }}
              >
                What's Included
              </h2>

              <ul style={{ marginBottom: "16px", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "4px" }}>
                  Deep cleaning of all surfaces
                </li>
                <li style={{ marginBottom: "4px" }}>
                  Sanitization of high-touch areas
                </li>
                <li style={{ marginBottom: "4px" }}>
                  Eco-friendly cleaning products
                </li>
              </ul>

              <h3
                style={{
                  color: "#374151",
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  marginTop: "20px",
                }}
              >
                Pricing Table
              </h3>

              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  marginBottom: "16px",
                  border: "1px solid #d1d5db",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f3f4f6" }}>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontWeight: "600",
                      }}
                    >
                      Service
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontWeight: "600",
                      }}
                    >
                      Duration
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontWeight: "600",
                      }}
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #d1d5db", padding: "8px" }}>
                      Basic Cleaning
                    </td>
                    <td style={{ border: "1px solid #d1d5db", padding: "8px" }}>
                      2 hours
                    </td>
                    <td style={{ border: "1px solid #d1d5db", padding: "8px" }}>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        $50
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #d1d5db", padding: "8px" }}>
                      Deep Cleaning
                    </td>
                    <td style={{ border: "1px solid #d1d5db", padding: "8px" }}>
                      4 hours
                    </td>
                    <td style={{ border: "1px solid #d1d5db", padding: "8px" }}>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        $100
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p style={{ marginBottom: "12px" }}>
                For more information, visit our{" "}
                <a
                  href="https://example.com"
                  style={{ color: "#2563eb", textDecoration: "underline" }}
                >
                  website
                </a>
                .
              </p>

              <p style={{ marginBottom: "12px" }}>
                <span style={{ backgroundColor: "yellow" }}>
                  This text has a yellow background
                </span>{" "}
                and <span style={{ color: "red" }}>this text is red</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPasteTest;

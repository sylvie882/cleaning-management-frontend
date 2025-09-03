# Rich Text Editor for Service Descriptions

This document explains the new rich text editor system implemented for service descriptions in the cleaning company management system.

## Overview

The system now includes a comprehensive rich text editor that allows administrators to create beautifully formatted service descriptions with:

- **Bold, italic, and underlined text**
- **Headers (H1, H2, H3)**
- **Bullet and numbered lists**
- **Tables with proper styling**
- **Links and images**
- **Text and background colors**
- **Real-time preview**
- **Word document paste support** - Copy from Word and paste with formatting preserved!

## How It Works

### 1. Rich Text Editor Component (`RichTextEditor.jsx`)

The main editor component provides a toolbar with formatting options:

- **Text Formatting**: Bold (B), Italic (I), Underline (U)
- **Headers**: H1, H2, H3 buttons
- **Lists**: Bullet (•) and numbered (1.) lists
- **Media**: Link (🔗) and image (🖼️) insertion
- **Colors**: Text color (🎨) and background color (🖌️)
- **Tables**: Table (📊) creation
- **Word Paste**: Automatically preserves formatting when pasting from Word documents

### 2. Markdown Utilities (`markdownUtils.js`)

The system includes utility functions for converting between HTML and Markdown:

- `htmlToMarkdown()` - Converts HTML content to Markdown for storage
- `markdownToHtml()` - Converts Markdown to HTML for display
- `formatContentForDisplay()` - Formats content for frontend display
- `formatContentForStorage()` - Formats content for database storage
- `sanitizeHtml()` - Sanitizes HTML to prevent XSS attacks

### 3. Integration with Service Form

The `ServiceForm.jsx` component has been updated to:

- Use the rich text editor instead of a basic textarea
- Convert HTML to Markdown when saving to the database
- Convert Markdown to HTML when loading existing content
- Provide a preview mode to see how content will appear

## Usage

### For Administrators

1. **Creating/Editing Services**:

   - Go to Admin → Service Management
   - Click "Add New Service" or edit an existing service
   - Use the rich text editor in the Description field
   - Format text using the toolbar buttons
   - Click "Preview" to see how it will appear on the frontend
   - Save the service

2. **Available Formatting Options**:
   - **Bold**: Select text and click "B" or use Ctrl+B
   - **Italic**: Select text and click "I" or use Ctrl+I
   - **Underline**: Select text and click "U" or use Ctrl+U
   - **Headers**: Click H1, H2, or H3 to create headers
   - **Lists**: Click "•" for bullet lists or "1." for numbered lists
   - **Tables**: Click "📊" to insert a formatted table
   - **Links**: Click "🔗" to add links
   - **Images**: Click "🖼️" to insert images
   - **Text Color**: Click "🎨" to change text color
   - **Background Color**: Click "🖌️" to change background color
   - **Word Paste**: Copy from Word and paste (Ctrl+V) - formatting preserved!

### For Developers

1. **Testing the Editor**:

   - Navigate to `/admin/rich-text-test` (if route is added)
   - Use the test page to experiment with the editor
   - See real-time preview and markdown output
   - Test Word document pasting with `/admin/word-paste-test`

2. **Adding to Other Forms**:

   ```jsx
   import RichTextEditor from "../components/Admin/RichTextEditor";
   import {
     formatContentForDisplay,
     formatContentForStorage,
   } from "../utils/markdownUtils";

   // In your component
   const [content, setContent] = useState("");

   const handleContentChange = (htmlContent) => {
     setContent(htmlContent);
   };

   // For saving
   const saveData = () => {
     const markdownContent = formatContentForStorage(content, true);
     // Save markdownContent to database
   };

   // For loading
   const loadData = (markdownData) => {
     const htmlContent = formatContentForDisplay(markdownData, false);
     setContent(htmlContent);
   };

   // In JSX
   <RichTextEditor
     value={content}
     onChange={handleContentChange}
     placeholder="Enter your content..."
   />;
   ```

## Data Flow

1. **Admin creates content** → Rich text editor generates HTML
2. **Form submission** → HTML converted to Markdown for storage
3. **Database storage** → Markdown stored in database
4. **Frontend display** → Markdown converted to HTML for rendering
5. **Admin editing** → Markdown converted to HTML for editor

## Benefits

1. **User-Friendly**: No need to learn markdown syntax
2. **Rich Formatting**: Tables, lists, headers, and more
3. **Consistent Display**: Same formatting on admin and frontend
4. **Secure**: HTML sanitization prevents XSS attacks
5. **Flexible**: Easy to extend with more formatting options

## Technical Details

### Storage Format

- Content is stored as Markdown in the database
- This ensures compatibility and smaller storage size
- Markdown is human-readable and version-control friendly

### Display Format

- Content is converted to HTML for display
- Uses Tailwind CSS classes for consistent styling
- Responsive design works on all devices

### Security

- HTML content is sanitized to remove script tags
- Event handlers are stripped to prevent XSS
- Only safe HTML tags are allowed

## Future Enhancements

Potential improvements for the rich text editor:

- More formatting options (text color, background color)
- File upload for images
- Code blocks with syntax highlighting
- Emoji picker
- Spell check integration
- Auto-save functionality

## Troubleshooting

### Common Issues

1. **Content not saving properly**:

   - Check that `formatContentForStorage()` is being called
   - Verify the markdown conversion is working

2. **Content not displaying properly**:

   - Check that `formatContentForDisplay()` is being called
   - Verify the HTML conversion is working

3. **Editor not loading**:
   - Check that the RichTextEditor component is imported correctly
   - Verify all dependencies are installed

### Debug Mode

To debug the editor, you can:

1. Use the test page at `/admin/rich-text-test`
2. Check browser console for errors
3. Verify the markdown output in the test page

## Support

For issues or questions about the rich text editor:

1. Check this documentation
2. Review the test page for examples
3. Check the browser console for errors
4. Verify the markdown utilities are working correctly

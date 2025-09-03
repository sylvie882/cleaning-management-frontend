// src/components/CopyProtection/GlobalCopyProtection.jsx
import { useEffect } from "react";

const GlobalCopyProtection = ({ children }) => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable drag start
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Comprehensive keyboard shortcuts protection
    const handleKeyDown = (e) => {
      // Disable F12 (Developer Tools)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+A (Select All)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+C (Copy)
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+V (Paste)
      if (e.ctrlKey && e.keyCode === 86) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+X (Cut)
      if (e.ctrlKey && e.keyCode === 88) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S (Save Page)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+P (Print)
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        return false;
      }
    };

    // Disable copy/cut/paste events
    const handleCopy = (e) => {
      e.preventDefault();
      return false;
    };

    const handleCut = (e) => {
      e.preventDefault();
      return false;
    };

    const handlePaste = (e) => {
      e.preventDefault();
      return false;
    };

    // Detect developer tools
    const detectDevTools = () => {
      let devtools = {
        open: false,
        orientation: null,
      };

      setInterval(() => {
        if (
          window.outerHeight - window.innerHeight > 200 ||
          window.outerWidth - window.innerWidth > 200
        ) {
          if (!devtools.open) {
            devtools.open = true;
            console.clear();
            console.log(
              "%cSTOP!",
              "color: red; font-size: 50px; font-weight: bold;"
            );
            console.log(
              "%cThis is a browser feature intended for developers. Content is protected.",
              "color: red; font-size: 16px;"
            );
            // Optionally redirect or show warning
            // window.location.href = '/';
          }
        } else {
          devtools.open = false;
        }
      }, 500);
    };

    // Disable print screen (limited effectiveness)
    const handleKeyUp = (e) => {
      if (e.keyCode === 44) {
        // Print Screen key
        e.preventDefault();
        return false;
      }
    };

    // Clear console periodically
    // const clearConsole = () => {
    //   setInterval(() => {
    //     console.clear();
    //   }, 1000);
    // };

    // Add all event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);

    // Initialize protection features
    detectDevTools();
    // clearConsole();

    // Disable image dragging
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.draggable = false;
      img.oncontextmenu = () => false;
    });

    // Cleanup function
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return <div className="copy-protected-site">{children}</div>;
};

export default GlobalCopyProtection;

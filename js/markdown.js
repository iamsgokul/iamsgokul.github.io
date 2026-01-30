const markdownInput = document.getElementById("markdown-input");
const preview = document.getElementById("preview");
const modal = document.getElementById("htmlModal");
const htmlOutput = document.getElementById("html-output");

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false,
});

// Update preview on input
markdownInput.addEventListener("input", updatePreview);

function updatePreview() {
  const markdownText = markdownInput.value;
  const htmlContent = marked.parse(markdownText);
  preview.innerHTML = htmlContent;
}

function insertMarkdown(prefix, suffix) {
  const textarea = markdownInput;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const beforeText = textarea.value.substring(0, start);
  const afterText = textarea.value.substring(end);

  const newText = beforeText + prefix + selectedText + suffix + afterText;
  textarea.value = newText;

  // Set cursor position
  const newCursorPos = start + prefix.length + selectedText.length;
  textarea.setSelectionRange(newCursorPos, newCursorPos);
  textarea.focus();

  updatePreview();
}

function insertTable() {
  const table = `
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
`;
  const textarea = markdownInput;
  const start = textarea.selectionStart;
  const beforeText = textarea.value.substring(0, start);
  const afterText = textarea.value.substring(start);

  textarea.value = beforeText + table + afterText;
  textarea.setSelectionRange(start, start);
  textarea.focus();

  updatePreview();
}

function clearEditor() {
  if (confirm("Are you sure you want to clear the editor?")) {
    markdownInput.value = "";
    updatePreview();
  }
}

function exportToHTML() {
  const markdownText = markdownInput.value;
  const htmlContent = marked.parse(markdownText);

  // Create a complete HTML document
  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1 {
            font-size: 2em;
            margin: 0.67em 0;
            border-bottom: 2px solid #eee;
            padding-bottom: 0.3em;
        }
        h2 {
            font-size: 1.5em;
            margin: 0.75em 0 0.5em 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.3em;
        }
        h3 { font-size: 1.25em; margin: 0.83em 0 0.5em 0; }
        h4 { font-size: 1.1em; margin: 1em 0 0.5em 0; }
        p { margin: 1em 0; }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ul, ol { margin: 1em 0; padding-left: 2em; }
        li { margin: 0.5em 0; }
        blockquote {
            border-left: 4px solid #ddd;
            margin: 1em 0;
            padding: 0.5em 1em;
            background: #f9f9f9;
            color: #666;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            margin: 1em 0;
        }
        pre code {
            background: none;
            padding: 0;
            color: inherit;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
        }
        th {
            background: #34495e;
            color: white;
            font-weight: 600;
        }
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        img {
            max-width: 100%;
            height: auto;
            margin: 1em 0;
        }
        hr {
            border: none;
            border-top: 2px solid #eee;
            margin: 2em 0;
        }
    </style>
</head>
<body>
${htmlContent}
</body>
</html>`;

  htmlOutput.value = fullHTML;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function copyHTML() {
  htmlOutput.select();
  document.execCommand("copy");
  alert("HTML code copied to clipboard!");
}

function downloadHTML() {
  const htmlContent = htmlOutput.value;
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "markdown-export.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

// Initialize preview
updatePreview();

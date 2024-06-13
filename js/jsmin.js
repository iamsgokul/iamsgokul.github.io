function minify() {
    const input = document.getElementById('jscodeinput');
    let code = input.value;

    // Simple minification logic (remove comments and unnecessary whitespace)
    const minifiedCode = code
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* comments */
      .replace(/\/\/.*/g, '')           // Remove // comments
      .replace(/\s+/g, ' ')             // Replace multiple spaces with single space
      .replace(/[\r\n]/g, '');          // Remove new lines

    input.value = minifiedCode;
  }

  function copyToClipboard() {
    const input = document.getElementById('jscodeinput');
    input.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
  }

  function clearAll() {
    document.getElementById('jscodeinput').value = '';
  }
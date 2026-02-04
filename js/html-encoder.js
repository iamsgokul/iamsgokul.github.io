/*- HTML Encoder Start -*/

// HTML entity mapping for basic characters
const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
};

// Function to encode HTML characters
function encodeHtml(text, encodeAll = false) {
    if (encodeAll) {
        // Encode all characters including non-ASCII
        return text.replace(/[^\x00-\x7F]/g, function(char) {
            return '&#' + char.charCodeAt(0) + ';';
        }).replace(/[&<>"'\/]/g, function(char) {
            return htmlEntities[char];
        });
    } else {
        // Only encode basic HTML special characters
        return text.replace(/[&<>"'\/]/g, function(char) {
            return htmlEntities[char];
        });
    }
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Use the modern Clipboard API
        return navigator.clipboard.writeText(text).then(() => {
            showMessage('Output copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback copy function
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showMessage('Output copied to clipboard!', 'success');
        } else {
            showMessage('Failed to copy output', 'error');
        }
    } catch (err) {
        showMessage('Failed to copy output', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Function to show messages to user
function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `message-notification ${type}`;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Main encode function
document.getElementById("encodeHtml").addEventListener("click", function () {
    const inputText = document.getElementById("inputCode").value;
    const encodeAll = document.getElementById("encodeAll").checked;
    const outputTextarea = document.getElementById("outputCode");
    const copyButton = document.getElementById("copyOutput");
    
    if (inputText.trim() === "") {
        showMessage('Please enter some HTML content to encode', 'error');
        return;
    }
    
    try {
        const encodedHtml = encodeHtml(inputText, encodeAll);
        
        // Show output
        outputTextarea.value = encodedHtml;
        outputTextarea.style.display = "block";
        document.getElementById("outputLabel").style.display = "block";
        copyButton.style.display = "inline-block";
        
        showMessage('HTML encoded successfully!', 'success');
    } catch (error) {
        showMessage('Error encoding HTML: ' + error.message, 'error');
    }
});

// Clear/Reset function
document.getElementById("clearText").addEventListener("click", function () {
    document.getElementById("inputCode").value = "";
    document.getElementById("outputCode").value = "";
    document.getElementById("outputCode").style.display = "none";
    document.getElementById("outputLabel").style.display = "none";
    document.getElementById("copyOutput").style.display = "none";
    document.getElementById("encodeAll").checked = false;
    
    showMessage('Fields cleared', 'info');
});

// Copy output function
document.getElementById("copyOutput").addEventListener("click", function () {
    const outputText = document.getElementById("outputCode").value;
    if (outputText.trim() === "") {
        showMessage('No output to copy', 'error');
        return;
    }
    copyToClipboard(outputText);
});

// Auto-encode functionality (optional - encode as user types with debouncing)
let encodeTimeout;
document.getElementById("inputCode").addEventListener("input", function () {
    const inputText = this.value;
    const outputTextarea = document.getElementById("outputCode");
    
    // Clear previous timeout
    clearTimeout(encodeTimeout);
    
    if (inputText.trim() === "") {
        outputTextarea.style.display = "none";
        document.getElementById("outputLabel").style.display = "none";
        document.getElementById("copyOutput").style.display = "none";
        return;
    }
    
    // Set new timeout for auto-encoding (500ms delay)
    encodeTimeout = setTimeout(() => {
        const encodeAll = document.getElementById("encodeAll").checked;
        const encodedHtml = encodeHtml(inputText, encodeAll);
        
        outputTextarea.value = encodedHtml;
        outputTextarea.style.display = "block";
        document.getElementById("outputLabel").style.display = "block";
        document.getElementById("copyOutput").style.display = "inline-block";
    }, 500);
});

// Also update encoding when checkbox state changes
document.getElementById("encodeAll").addEventListener("change", function () {
    const inputText = document.getElementById("inputCode").value;
    if (inputText.trim() !== "") {
        document.getElementById("encodeHtml").click();
    }
});

/*- HTML Encoder End -*/
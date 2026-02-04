/*- URL Encoder Start -*/

// Function to encode URL
function encodeUrl(text, encodeSpacesAsPlus = false) {
    if (!text) return '';
    
    // Use encodeURIComponent for standard URL encoding
    let encoded = encodeURIComponent(text);
    
    // If user wants spaces encoded as + instead of %20
    if (encodeSpacesAsPlus) {
        encoded = encoded.replace(/%20/g, '+');
    }
    
    return encoded;
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
document.getElementById("encodeUrl").addEventListener("click", function () {
    const inputText = document.getElementById("inputCode").value;
    const encodeSpacesAsPlus = document.getElementById("encodeSpacesAsPlus").checked;
    const outputTextarea = document.getElementById("outputCode");
    const copyButton = document.getElementById("copyOutput");
    
    if (inputText.trim() === "") {
        showMessage('Please enter some URL or text to encode', 'error');
        return;
    }
    
    try {
        const encodedUrl = encodeUrl(inputText, encodeSpacesAsPlus);
        
        // Show output
        outputTextarea.value = encodedUrl;
        outputTextarea.style.display = "block";
        document.getElementById("outputLabel").style.display = "block";
        copyButton.style.display = "inline-block";
        
        // Check if encoding actually changed anything
        if (encodedUrl === inputText) {
            showMessage('No encoding needed - text is already URL-safe', 'info');
        } else {
            showMessage('URL encoded successfully!', 'success');
        }
    } catch (error) {
        showMessage('Error encoding URL: ' + error.message, 'error');
    }
});

// Clear/Reset function
document.getElementById("clearText").addEventListener("click", function () {
    document.getElementById("inputCode").value = "";
    document.getElementById("outputCode").value = "";
    document.getElementById("outputCode").style.display = "none";
    document.getElementById("outputLabel").style.display = "none";
    document.getElementById("copyOutput").style.display = "none";
    document.getElementById("encodeSpacesAsPlus").checked = false;
    
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

// Auto-encode functionality (encode as user types with debouncing)
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
        const encodeSpacesAsPlus = document.getElementById("encodeSpacesAsPlus").checked;
        const encodedUrl = encodeUrl(inputText, encodeSpacesAsPlus);
        
        outputTextarea.value = encodedUrl;
        outputTextarea.style.display = "block";
        document.getElementById("outputLabel").style.display = "block";
        document.getElementById("copyOutput").style.display = "inline-block";
    }, 500);
});

// Also update encoding when checkbox state changes
document.getElementById("encodeSpacesAsPlus").addEventListener("change", function () {
    const inputText = document.getElementById("inputCode").value;
    if (inputText.trim() !== "") {
        document.getElementById("encodeUrl").click();
    }
});

/*- URL Encoder End -*/
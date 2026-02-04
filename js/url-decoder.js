/*- URL Decoder Start -*/

// Function to decode URL
function decodeUrl(encodedText, decodePlus = true) {
    if (!encodedText) return '';
    
    try {
        let textToDecode = encodedText;
        
        // If user wants + decoded as spaces (common in form data)
        if (decodePlus) {
            textToDecode = textToDecode.replace(/\+/g, ' ');
        }
        
        // Use decodeURIComponent for standard URL decoding
        return decodeURIComponent(textToDecode);
    } catch (error) {
        // If decoding fails, return the original text
        throw new Error('Invalid URL encoding: ' + error.message);
    }
}

// Function to validate if text contains URL encoding
function containsUrlEncoding(text) {
    // Check for percent encoding (%XX)
    const percentEncodingPattern = /%[0-9A-Fa-f]{2}/;
    
    // Check for + symbols (which might represent spaces)
    const plusPattern = /\+/;
    
    return percentEncodingPattern.test(text) || plusPattern.test(text);
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

// Main decode function
document.getElementById("decodeUrl").addEventListener("click", function () {
    const inputText = document.getElementById("inputCode").value;
    const decodePlus = document.getElementById("decodePlus").checked;
    const outputTextarea = document.getElementById("outputCode");
    const copyButton = document.getElementById("copyOutput");
    
    if (inputText.trim() === "") {
        showMessage('Please enter some encoded URL to decode', 'error');
        return;
    }
    
    // Check if input contains URL encoding
    if (!containsUrlEncoding(inputText)) {
        showMessage('No URL encoding found to decode', 'error');
        return;
    }
    
    try {
        const decodedUrl = decodeUrl(inputText, decodePlus);
        
        // Show output
        outputTextarea.value = decodedUrl;
        outputTextarea.style.display = "block";
        document.getElementById("outputLabel").style.display = "block";
        copyButton.style.display = "inline-block";
        
        // Check if decoding actually changed anything
        if (decodedUrl === inputText) {
            showMessage('No decodable URL encoding found in the input', 'info');
        } else {
            showMessage('URL decoded successfully!', 'success');
        }
    } catch (error) {
        showMessage('Error decoding URL: ' + error.message, 'error');
    }
});

// Clear/Reset function
document.getElementById("clearText").addEventListener("click", function () {
    document.getElementById("inputCode").value = "";
    document.getElementById("outputCode").value = "";
    document.getElementById("outputCode").style.display = "none";
    document.getElementById("outputLabel").style.display = "none";
    document.getElementById("copyOutput").style.display = "none";
    document.getElementById("decodePlus").checked = true;
    
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

// Auto-decode functionality (decode as user types with debouncing)
let decodeTimeout;
document.getElementById("inputCode").addEventListener("input", function () {
    const inputText = this.value;
    const outputTextarea = document.getElementById("outputCode");
    
    // Clear previous timeout
    clearTimeout(decodeTimeout);
    
    if (inputText.trim() === "") {
        outputTextarea.style.display = "none";
        document.getElementById("outputLabel").style.display = "none";
        document.getElementById("copyOutput").style.display = "none";
        return;
    }
    
    // Only auto-decode if the text contains URL encoding
    if (!containsUrlEncoding(inputText)) {
        outputTextarea.style.display = "none";
        document.getElementById("outputLabel").style.display = "none";
        document.getElementById("copyOutput").style.display = "none";
        return;
    }
    
    // Set new timeout for auto-decoding (500ms delay)
    decodeTimeout = setTimeout(() => {
        try {
            const decodePlus = document.getElementById("decodePlus").checked;
            const decodedUrl = decodeUrl(inputText, decodePlus);
            
            outputTextarea.value = decodedUrl;
            outputTextarea.style.display = "block";
            document.getElementById("outputLabel").style.display = "block";
            document.getElementById("copyOutput").style.display = "inline-block";
        } catch (error) {
            // Don't show error in auto-decode, just hide output
            outputTextarea.style.display = "none";
            document.getElementById("outputLabel").style.display = "none";
            document.getElementById("copyOutput").style.display = "none";
        }
    }, 500);
});

// Also update decoding when checkbox state changes
document.getElementById("decodePlus").addEventListener("change", function () {
    const inputText = document.getElementById("inputCode").value;
    if (inputText.trim() !== "" && containsUrlEncoding(inputText)) {
        document.getElementById("decodeUrl").click();
    }
});

// Add sample data functionality
function loadSampleData() {
    const sampleText = `https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%2Bworld%26category%3Dnews%26sort%3Ddate
%2Fapi%2Fv1%2Fusers%3Fname%3DJohn%2520Doe%26email%3Djohn%40example.com
My%20favorite%20search%3A%20%22web%20development%22%20%26%20JavaScript`;
    
    document.getElementById("inputCode").value = sampleText;
    document.getElementById("decodeUrl").click();
}

// Add sample button if needed (you can add this to the HTML if desired)
// <input type="button" value="Load Sample" onclick="loadSampleData()" class="submit" style="margin-left: 10px;">

/*- URL Decoder End -*/
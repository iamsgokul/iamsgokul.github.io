/*- HTML Decoder Start -*/

// HTML entity mapping for decoding (order matters - decode &amp; last)
const htmlEntityDecodeMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&#x27;': "'",
    '&#39;': "'",
    '&#x2F;': '/',
    '&#47;': '/',
    '&nbsp;': ' ',
    '&ndash;': '–',
    '&mdash;': '—',
    '&laquo;': '«',
    '&raquo;': '»',
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': '\u2018',
    '&rsquo;': '\u2019',
    '&hellip;': '…',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&euro;': '€',
    '&pound;': '£',
    '&yen;': '¥',
    '&cent;': '¢',
    '&amp;': '&'  // Decode ampersand last to avoid double-decoding
};

// Function to decode HTML entities
function decodeHtml(encodedString, decodeNumeric = true) {
    let decodedString = encodedString;
    
    // Decode numeric entities first if enabled
    if (decodeNumeric) {
        // Decode decimal numeric entities (&#123;)
        decodedString = decodedString.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
        
        // Decode hexadecimal numeric entities (&#x1F;)
        decodedString = decodedString.replace(/&#x([0-9A-Fa-f]+);/g, function(match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });
    }
    
    // Then decode named entities (order matters - decode &amp; last)
    for (const [entity, character] of Object.entries(htmlEntityDecodeMap)) {
        const regex = new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        decodedString = decodedString.replace(regex, character);
    }
    
    return decodedString;
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

// Function to validate if text contains HTML entities
function containsHtmlEntities(text) {
    // Check for named entities (more comprehensive pattern)
    const namedEntityPattern = /&[a-zA-Z][a-zA-Z0-9]*;/;
    
    // Check for numeric entities (decimal and hex)
    const numericEntityPattern = /&#(?:\d+|x[0-9A-Fa-f]+);/;
    
    return namedEntityPattern.test(text) || numericEntityPattern.test(text);
}

// Main decode function
document.getElementById("decodeHtml").addEventListener("click", function () {
    const inputText = document.getElementById("inputCode").value;
    const decodeNumeric = document.getElementById("decodeNumeric").checked;
    const outputTextarea = document.getElementById("outputCode");
    const copyButton = document.getElementById("copyOutput");
    
    if (inputText.trim() === "") {
        showMessage('Please enter some HTML entities to decode', 'error');
        return;
    }
    
    // Check if input contains HTML entities
    if (!containsHtmlEntities(inputText)) {
        showMessage('No HTML entities found to decode', 'error');
        return;
    }
    
    try {
        const decodedHtml = decodeHtml(inputText, decodeNumeric);
        
        // Show output
        outputTextarea.value = decodedHtml;
        outputTextarea.style.display = "block";
        document.getElementById("outputLabel").style.display = "block";
        copyButton.style.display = "inline-block";
        
        // Check if decoding actually changed anything
        if (decodedHtml === inputText) {
            showMessage('No decodable entities found in the input', 'info');
        } else {
            showMessage('HTML decoded successfully!', 'success');
        }
    } catch (error) {
        showMessage('Error decoding HTML: ' + error.message, 'error');
    }
});

// Clear/Reset function
document.getElementById("clearText").addEventListener("click", function () {
    document.getElementById("inputCode").value = "";
    document.getElementById("outputCode").value = "";
    document.getElementById("outputCode").style.display = "none";
    document.getElementById("outputLabel").style.display = "none";
    document.getElementById("copyOutput").style.display = "none";
    document.getElementById("decodeNumeric").checked = true;
    
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

// Auto-decode functionality (optional - decode as user types with debouncing)
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
    
    // Only auto-decode if the text contains HTML entities
    if (!containsHtmlEntities(inputText)) {
        outputTextarea.style.display = "none";
        document.getElementById("outputLabel").style.display = "none";
        document.getElementById("copyOutput").style.display = "none";
        return;
    }
    
    // Set new timeout for auto-decoding (500ms delay)
    decodeTimeout = setTimeout(() => {
        const decodeNumeric = document.getElementById("decodeNumeric").checked;
        const decodedHtml = decodeHtml(inputText, decodeNumeric);
        
        outputTextarea.value = decodedHtml;
        outputTextarea.style.display = "block";
        document.getElementById("outputLabel").style.display = "block";
        document.getElementById("copyOutput").style.display = "inline-block";
    }, 500);
});

// Also update decoding when checkbox state changes
document.getElementById("decodeNumeric").addEventListener("change", function () {
    const inputText = document.getElementById("inputCode").value;
    if (inputText.trim() !== "" && containsHtmlEntities(inputText)) {
        document.getElementById("decodeHtml").click();
    }
});

// Add sample data functionality
function loadSampleData() {
    const sampleText = `&lt;div class=&quot;example&quot;&gt;
    &lt;h1&gt;Welcome to HTML Decoding!&lt;/h1&gt;
    &lt;p&gt;This is a &lt;strong&gt;sample&lt;/strong&gt; text with HTML entities.&lt;/p&gt;
    &lt;p&gt;Special characters: &amp;copy; &amp;trade; &amp;reg; &amp;euro; &amp;pound;&lt;/p&gt;
    &lt;p&gt;Unicode: &#x1F44D; &#x1F60A; &#x2764;&lt;/p&gt;
&lt;/div&gt;`;
    
    document.getElementById("inputCode").value = sampleText;
    document.getElementById("decodeHtml").click();
}

// Add sample button if needed (you can add this to the HTML if desired)
// <input type="button" value="Load Sample" onclick="loadSampleData()" class="submit" style="margin-left: 10px;">

/*- HTML Decoder End -*/
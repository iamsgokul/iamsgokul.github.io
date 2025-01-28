class TextFormatter {
    constructor(textareaId, previewId) {
        this.textarea = document.getElementById(textareaId);
        this.preview = document.getElementById(previewId);
        this.history = [''];
        this.currentIndex = 0;
        this.maxHistory = 100;
        
        this.textarea.addEventListener('input', () => {
            this.updatePreview();
            this.addToHistory(this.textarea.value);
        });
    }

    addToHistory(text) {
        this.history = this.history.slice(0, this.currentIndex + 1);
        this.history.push(text);
        
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        
        this.currentIndex = this.history.length - 1;
    }

    format(tag, attributes = '') {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const selectedText = this.textarea.value.substring(start, end);
        
        let formattedText = '';
        switch(tag) {
            case 'p':
                formattedText = `<p>${selectedText}</p>`;
                break;
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                formattedText = `<${tag}>${selectedText}</${tag}>`;
                break;
            case 'b':
                formattedText = `<b>${selectedText}</b>`;
                break;
            case 'u':
                formattedText = `<u>${selectedText}</u>`;
                break;
            case 'ul':
                formattedText = `<ul>\n${selectedText}\n</ul>`;
                break;
            case 'ol':
                formattedText = `<ol>\n${selectedText}\n</ol>`;
                break;
            case 'li':
                formattedText = `<li>${selectedText}</li>`;
                break;
            case 'a':
                const url = prompt('Enter URL:', 'https://');
                if (url) {
                    formattedText = `<a href="${url}"${attributes}>${selectedText}</a>`;
                } else {
                    return;
                }
                break;
            default:
                formattedText = selectedText;
        }

        const newText = this.textarea.value.substring(0, start) + 
                       formattedText + 
                       this.textarea.value.substring(end);
        
        this.textarea.value = newText;
        this.addToHistory(newText);
        this.updatePreview();
        
        this.textarea.focus();
        const newCursorPos = start + formattedText.length;
        this.textarea.setSelectionRange(newCursorPos, newCursorPos);
    }

    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.textarea.value = this.history[this.currentIndex];
            this.updatePreview();
        }
    }

    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.textarea.value = this.history[this.currentIndex];
            this.updatePreview();
        }
    }

    updatePreview() {
        this.preview.innerHTML = this.textarea.value;
    }
}

// Initialize the formatter
const formatter = new TextFormatter('editor', 'preview');
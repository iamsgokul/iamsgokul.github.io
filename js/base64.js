function encodeText() {
  const input = document.getElementById("inputText").value;
  const outputElement = document.getElementById("outputText");
  const errorElement = document.getElementById("inputError");
  const successElement = document.getElementById("outputSuccess");

  errorElement.style.display = "none";
  successElement.style.display = "none";

  if (!input.trim()) {
    errorElement.textContent = "Please enter some text to encode.";
    errorElement.style.display = "block";
    return;
  }

  try {
    const encoded = btoa(unescape(encodeURIComponent(input)));
    outputElement.value = encoded;
    successElement.textContent = "Successfully encoded to Base64!";
    successElement.style.display = "block";
  } catch (error) {
    errorElement.textContent = "Error encoding text: " + error.message;
    errorElement.style.display = "block";
  }
}

function decodeText() {
  const input = document.getElementById("inputText").value;
  const outputElement = document.getElementById("outputText");
  const errorElement = document.getElementById("inputError");
  const successElement = document.getElementById("outputSuccess");

  errorElement.style.display = "none";
  successElement.style.display = "none";

  if (!input.trim()) {
    errorElement.textContent = "Please enter base64 text to decode.";
    errorElement.style.display = "block";
    return;
  }

  try {
    const decoded = decodeURIComponent(escape(atob(input)));
    outputElement.value = decoded;
    successElement.textContent = "Successfully decoded from Base64!";
    successElement.style.display = "block";
  } catch (error) {
    errorElement.textContent =
      "Invalid Base64 string. Please check your input.";
    errorElement.style.display = "block";
  }
}

function clearAll() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").value = "";
  document.getElementById("inputError").style.display = "none";
  document.getElementById("outputSuccess").style.display = "none";
}

function copyOutput() {
  const outputElement = document.getElementById("outputText");
  const successElement = document.getElementById("outputSuccess");

  if (!outputElement.value) {
    const errorElement = document.getElementById("inputError");
    errorElement.textContent =
      "Nothing to copy. Please encode or decode first.";
    errorElement.style.display = "block";
    return;
  }

  outputElement.select();
  document.execCommand("copy");

  successElement.textContent = "Output copied to clipboard!";
  successElement.style.display = "block";

  setTimeout(() => {
    successElement.style.display = "none";
  }, 2000);
}

// Allow Enter key to encode
document
  .getElementById("inputText")
  .addEventListener("keypress", function (event) {
    if (event.ctrlKey && event.key === "Enter") {
      encodeText();
    }
  });

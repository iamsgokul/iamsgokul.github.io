// Base32 alphabet (RFC 4648)
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Encode(input) {
  const bytes = new TextEncoder().encode(input);
  let result = "";
  let bits = 0;
  let value = 0;

  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;

    while (bits >= 5) {
      result += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    result += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  // Add padding
  while (result.length % 8 !== 0) {
    result += "=";
  }

  return result;
}

function base32Decode(input) {
  // Remove padding and convert to uppercase
  input = input.replace(/=/g, "").toUpperCase();

  let bits = 0;
  let value = 0;
  let index = 0;
  const output = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const charIndex = BASE32_ALPHABET.indexOf(char);

    if (charIndex === -1) {
      throw new Error("Invalid Base32 character: " + char);
    }

    value = (value << 5) | charIndex;
    bits += 5;

    if (bits >= 8) {
      output[index++] = (value >>> (bits - 8)) & 255;
      bits -= 8;
    }
  }

  return new TextDecoder().decode(new Uint8Array(output));
}

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
    const encoded = base32Encode(input);
    outputElement.value = encoded;
    successElement.textContent = "Successfully encoded to Base32!";
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
    errorElement.textContent = "Please enter base32 text to decode.";
    errorElement.style.display = "block";
    return;
  }

  try {
    const decoded = base32Decode(input);
    outputElement.value = decoded;
    successElement.textContent = "Successfully decoded from Base32!";
    successElement.style.display = "block";
  } catch (error) {
    errorElement.textContent =
      "Invalid Base32 string. Please check your input.";
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

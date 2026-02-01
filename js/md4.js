// MD4 Implementation
function md4Bytes(inputBytes) {
  const bytes = [...inputBytes];

  // Pre-processing: adding padding bits
  const originalLength = bytes.length * 8;
  bytes.push(0x80);

  while (bytes.length % 64 !== 56) {
    bytes.push(0);
  }

  // Append original length in bits as 64-bit little-endian
  for (let i = 0; i < 8; i++) {
    bytes.push((originalLength >>> (i * 8)) & 0xff);
  }

  // Initialize hash values
  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  // Helper functions
  function F(x, y, z) {
    return (x & y) | (~x & z);
  }
  function G(x, y, z) {
    return (x & y) | (x & z) | (y & z);
  }
  function H(x, y, z) {
    return x ^ y ^ z;
  }

  function rotateLeft(x, n) {
    return ((x << n) | (x >>> (32 - n))) >>> 0;
  }

  function add(...args) {
    let sum = 0;
    for (const arg of args) {
      sum = (sum + arg) >>> 0;
    }
    return sum;
  }

  // Process each 64-byte chunk
  for (let i = 0; i < bytes.length; i += 64) {
    const chunk = bytes.slice(i, i + 64);

    // Break chunk into sixteen 32-bit little-endian words
    const X = [];
    for (let j = 0; j < 64; j += 4) {
      X.push(
        chunk[j] |
          (chunk[j + 1] << 8) |
          (chunk[j + 2] << 16) |
          (chunk[j + 3] << 24),
      );
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    // Round 1
    const S1 = [3, 7, 11, 19];
    for (let j = 0; j < 16; j++) {
      const f = F(B, C, D);
      const temp = add(A, f, X[j]);
      A = D;
      D = C;
      C = B;
      B = rotateLeft(temp, S1[j % 4]);
    }

    // Round 2
    const S2 = [3, 5, 9, 13];
    const order2 = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];
    for (let j = 0; j < 16; j++) {
      const f = G(B, C, D);
      const temp = add(A, f, X[order2[j]], 0x5a827999);
      A = D;
      D = C;
      C = B;
      B = rotateLeft(temp, S2[j % 4]);
    }

    // Round 3
    const S3 = [3, 9, 11, 15];
    const order3 = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
    for (let j = 0; j < 16; j++) {
      const f = H(B, C, D);
      const temp = add(A, f, X[order3[j]], 0x6ed9eba1);
      A = D;
      D = C;
      C = B;
      B = rotateLeft(temp, S3[j % 4]);
    }

    a0 = add(a0, A);
    b0 = add(b0, B);
    c0 = add(c0, C);
    d0 = add(d0, D);
  }

  // Produce the final hash value (little-endian)
  const result = [];
  for (const val of [a0, b0, c0, d0]) {
    result.push(val & 0xff);
    result.push((val >>> 8) & 0xff);
    result.push((val >>> 16) & 0xff);
    result.push((val >>> 24) & 0xff);
  }

  return result;
}

// Encoding helper functions
function hexToBytes(hex) {
  hex = hex.replace(/\s/g, "");
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    const byte = parseInt(hex.substr(i, 2), 16);
    if (isNaN(byte)) {
      throw new Error("Invalid hex character");
    }
    bytes.push(byte);
  }
  return bytes;
}

function base64ToBytes(base64) {
  try {
    const binaryString = atob(base64.trim());
    const bytes = [];
    for (let i = 0; i < binaryString.length; i++) {
      bytes.push(binaryString.charCodeAt(i));
    }
    return bytes;
  } catch (e) {
    throw new Error("Invalid Base64 string");
  }
}

function bytesToHex(bytes) {
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function bytesToBase64(bytes) {
  const binaryString = String.fromCharCode(...bytes);
  return btoa(binaryString);
}

function bytesToBinary(bytes) {
  return bytes.map((b) => b.toString(2).padStart(8, "0")).join(" ");
}

function stringToUtf16LE(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    bytes.push(code & 0xff);
    bytes.push((code >> 8) & 0xff);
  }
  return bytes;
}

function stringToUtf16BE(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    bytes.push((code >> 8) & 0xff);
    bytes.push(code & 0xff);
  }
  return bytes;
}

function getInputBytes(text, encoding) {
  // Handle binary encodings
  if (encoding === "hex") {
    return hexToBytes(text);
  }
  if (encoding === "base64") {
    return base64ToBytes(text);
  }

  // Handle UTF-16 variants
  if (encoding === "utf-16le") {
    return stringToUtf16LE(text);
  }
  if (encoding === "utf-16be") {
    return stringToUtf16BE(text);
  }

  // Handle UTF-8 and other text encodings using TextEncoder
  if (encoding === "utf-8") {
    const encoder = new TextEncoder();
    return Array.from(encoder.encode(text));
  }

  // For other encodings, try to use TextEncoder with the encoding
  try {
    const encoder = new TextEncoder();
    const bytes = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code < 256) {
        bytes.push(code);
      } else {
        const utf8Bytes = encoder.encode(text[i]);
        bytes.push(...utf8Bytes);
      }
    }
    return bytes;
  } catch (e) {
    const encoder = new TextEncoder();
    return Array.from(encoder.encode(text));
  }
}

function encodeOutput(hashBytes, encoding) {
  switch (encoding) {
    case "hex":
      return bytesToHex(hashBytes);
    case "hexupper":
      return bytesToHex(hashBytes).toUpperCase();
    case "base64":
      return bytesToBase64(hashBytes);
    case "binary":
      return bytesToBinary(hashBytes);
    default:
      return bytesToHex(hashBytes);
  }
}

// DOM Elements
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const autoUpdate = document.getElementById("autoUpdate");
const enableHmac = document.getElementById("enableHmac");
const hmacKeyField = document.getElementById("hmacKeyField");
const hmacKey = document.getElementById("hmacKey");
const uppercase = document.getElementById("uppercase");
const inputEncoding = document.getElementById("inputEncoding");
const outputEncoding = document.getElementById("outputEncoding");
const inputError = document.getElementById("inputError");
const outputSuccess = document.getElementById("outputSuccess");

// Event Listeners
inputText.addEventListener("input", function () {
  if (autoUpdate.checked) {
    generateHash();
  }
});

hmacKey.addEventListener("input", function () {
  if (autoUpdate.checked) {
    generateHash();
  }
});

autoUpdate.addEventListener("change", function () {
  if (this.checked) {
    generateHash();
  }
});

enableHmac.addEventListener("change", function () {
  hmacKeyField.style.display = this.checked ? "block" : "none";
  if (autoUpdate.checked) {
    generateHash();
  }
});

uppercase.addEventListener("change", function () {
  if (autoUpdate.checked) {
    generateHash();
  }
});

inputEncoding.addEventListener("change", function () {
  if (autoUpdate.checked) {
    generateHash();
  }
});

outputEncoding.addEventListener("change", function () {
  if (autoUpdate.checked) {
    generateHash();
  }
});

function generateHash() {
  inputError.textContent = "";
  outputSuccess.textContent = "";

  const text = inputText.value;

  if (!text) {
    outputText.value = "";
    return;
  }

  try {
    const inputEnc = inputEncoding.value;
    const outputEnc = outputEncoding.value;

    let hashBytes;

    if (enableHmac.checked) {
      const key = hmacKey.value;
      if (!key) {
        inputError.textContent = "Please enter an HMAC key";
        outputText.value = "";
        return;
      }
      // HMAC-MD4
      const blockSize = 64;
      let keyBytes = getInputBytes(key, "utf-8");

      if (keyBytes.length > blockSize) {
        keyBytes = md4Bytes(keyBytes);
      }

      while (keyBytes.length < blockSize) {
        keyBytes.push(0);
      }

      const ipad = keyBytes.map((b) => b ^ 0x36);
      const opad = keyBytes.map((b) => b ^ 0x5c);

      const inputBytes = getInputBytes(text, inputEnc);
      const innerHash = md4Bytes([...ipad, ...inputBytes]);
      hashBytes = md4Bytes([...opad, ...innerHash]);
    } else {
      const inputBytes = getInputBytes(text, inputEnc);
      hashBytes = md4Bytes(inputBytes);
    }

    let result = encodeOutput(hashBytes, outputEnc);

    // Apply uppercase if checked and output is hex
    if (uppercase.checked && outputEnc === "hex") {
      result = result.toUpperCase();
    }

    outputText.value = result;
    outputSuccess.textContent = "MD4 hash generated successfully!";
  } catch (error) {
    inputError.textContent = "Error: " + error.message;
    outputText.value = "";
  }
}

function clearAll() {
  inputText.value = "";
  outputText.value = "";
  hmacKey.value = "";
  inputError.textContent = "";
  outputSuccess.textContent = "";
}

function copyOutput() {
  if (!outputText.value) {
    inputError.textContent = "Nothing to copy!";
    return;
  }

  outputText.select();
  outputText.setSelectionRange(0, 99999);

  navigator.clipboard
    .writeText(outputText.value)
    .then(function () {
      outputSuccess.textContent = "Hash copied to clipboard!";
    })
    .catch(function () {
      document.execCommand("copy");
      outputSuccess.textContent = "Hash copied to clipboard!";
    });
}

// Initialize
generateHash();

// MD2 Implementation
const MD2_S = [
  41, 46, 67, 201, 162, 216, 124, 1, 61, 54, 84, 161, 236, 240, 6, 19, 98, 167,
  5, 243, 192, 199, 115, 140, 152, 147, 43, 217, 188, 76, 130, 202, 30, 155, 87,
  60, 253, 212, 224, 22, 103, 66, 111, 24, 138, 23, 229, 18, 190, 78, 196, 214,
  218, 158, 222, 73, 160, 251, 245, 142, 187, 47, 238, 122, 169, 104, 121, 145,
  21, 178, 7, 63, 148, 194, 16, 137, 11, 34, 95, 33, 128, 127, 93, 154, 90, 144,
  50, 39, 53, 62, 204, 231, 191, 247, 151, 3, 255, 25, 48, 179, 72, 165, 181,
  209, 215, 94, 146, 42, 172, 86, 170, 198, 79, 184, 56, 210, 150, 164, 125,
  182, 118, 252, 107, 226, 156, 116, 4, 241, 69, 157, 112, 89, 100, 113, 135,
  32, 134, 91, 207, 101, 230, 45, 168, 2, 27, 96, 37, 173, 174, 176, 185, 246,
  28, 70, 97, 105, 52, 64, 126, 15, 85, 71, 163, 35, 221, 81, 175, 58, 195, 92,
  249, 206, 186, 197, 234, 38, 44, 83, 13, 110, 133, 40, 132, 9, 211, 223, 205,
  244, 65, 129, 77, 82, 106, 220, 55, 200, 108, 193, 171, 250, 36, 225, 123, 8,
  12, 189, 177, 74, 120, 136, 149, 139, 227, 99, 232, 109, 233, 203, 213, 254,
  59, 0, 29, 57, 242, 239, 183, 14, 102, 88, 208, 228, 166, 119, 114, 248, 235,
  117, 75, 10, 49, 68, 80, 180, 143, 237, 31, 26, 219, 153, 141, 51, 159, 17,
  131, 20,
];

function md2(message) {
  const bytes = getInputBytes(message, "utf8");
  const hashBytes = md2Bytes(bytes);
  return bytesToHex(hashBytes);
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
  // Most browsers only support UTF-8 for TextEncoder, so we'll use a fallback
  try {
    // Try to encode using the specified encoding via a roundtrip
    const encoder = new TextEncoder();
    const decoder = new TextDecoder(encoding);

    // For single-byte encodings, map characters directly
    const bytes = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code < 256) {
        bytes.push(code);
      } else {
        // For multi-byte characters, encode as UTF-8 and hope for the best
        const utf8Bytes = encoder.encode(text[i]);
        bytes.push(...utf8Bytes);
      }
    }
    return bytes;
  } catch (e) {
    // Fallback to UTF-8
    const encoder = new TextEncoder();
    return Array.from(encoder.encode(text));
  }
}

function md2Bytes(inputBytes) {
  const bytes = [...inputBytes];

  // Padding
  const padLen = 16 - (bytes.length % 16);
  for (let i = 0; i < padLen; i++) {
    bytes.push(padLen);
  }

  // Checksum
  const checksum = new Array(16).fill(0);
  let L = 0;
  for (let i = 0; i < bytes.length; i += 16) {
    for (let j = 0; j < 16; j++) {
      const c = bytes[i + j];
      checksum[j] ^= MD2_S[c ^ L];
      L = checksum[j];
    }
  }
  bytes.push(...checksum);

  // Hash
  const X = new Array(48).fill(0);
  for (let i = 0; i < bytes.length; i += 16) {
    for (let j = 0; j < 16; j++) {
      X[16 + j] = bytes[i + j];
      X[32 + j] = X[16 + j] ^ X[j];
    }
    let t = 0;
    for (let j = 0; j < 18; j++) {
      for (let k = 0; k < 48; k++) {
        X[k] = X[k] ^ MD2_S[t];
        t = X[k];
      }
      t = (t + j) % 256;
    }
  }

  return X.slice(0, 16);
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
      // HMAC-MD2
      const blockSize = 16;
      let keyBytes = getInputBytes(key, "utf8");

      if (keyBytes.length > blockSize) {
        keyBytes = md2Bytes(keyBytes);
      }

      while (keyBytes.length < blockSize) {
        keyBytes.push(0);
      }

      const ipad = keyBytes.map((b) => b ^ 0x36);
      const opad = keyBytes.map((b) => b ^ 0x5c);

      const inputBytes = getInputBytes(text, inputEnc);
      const innerHash = md2Bytes([...ipad, ...inputBytes]);
      hashBytes = md2Bytes([...opad, ...innerHash]);
    } else {
      const inputBytes = getInputBytes(text, inputEnc);
      hashBytes = md2Bytes(inputBytes);
    }

    let result = encodeOutput(hashBytes, outputEnc);

    // Apply uppercase if checked and output is hex
    if (uppercase.checked && outputEnc === "hex") {
      result = result.toUpperCase();
    }

    outputText.value = result;
    outputSuccess.textContent = "MD2 hash generated successfully!";
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

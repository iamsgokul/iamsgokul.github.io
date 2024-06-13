function generateQRCode() {
  var text = document.getElementById("text").value;
  if (!text) {
    alert("Please enter some text or URL");
    return;
  }

  var qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = ""; // Clear previous QR Code

  var qrcode = new QRCode(qrcodeContainer, {
    text: text,
    width: 300,
    height: 300,
  });
  document.getElementById("qrcodeout").style.display = "block";
}

function clearQRCode() {
  var text = document.getElementById("text");
  text.value = "";

  var qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = ""; // Clear previous QR Code
  document.getElementById("qrcodeout").style.display = "none";
}

function downloadQRCode() {
  var qrcodeContainer = document
    .getElementById("qrcode")
    .getElementsByTagName("img")[0];
  if (!qrcodeContainer) {
    alert("No QR code to download!");
    return;
  }

  var imgSrc = qrcodeContainer.src;
  var link = document.createElement("a");
  link.href = imgSrc;
  link.download = "qrcode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

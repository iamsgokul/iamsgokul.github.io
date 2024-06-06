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
}

function clearQRCode() {
  var text = document.getElementById("text");
  text.value = "";

  var qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = ""; // Clear previous QR Code
}

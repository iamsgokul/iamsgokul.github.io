function resetTextarea() {
  document.getElementById("formatjsonoutput").style.display = "none";
  document.getElementById("jsonInput").value = "";
  document.getElementById("formattedJSON").innerHTML = "";
}

/*--Json Formatter--*/
function formatJSON() {
  document.getElementById("formatjsonoutput").style.display = "block";
  try {
    var jsonInput = document.getElementById("jsonInput").value;
    var jsonObj = JSON.parse(jsonInput);
    var formattedJSON = syntaxHighlight(jsonObj);
    document.getElementById("formattedJSON").innerHTML = formattedJSON;
  } catch (error) {
    document.getElementById("formattedJSON").textContent =
      "Invalid JSON: " + error.message;
  }
}

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  var lines = json.split("\n");
  var numberedLines = lines.map(function (line, index) {
    return '<span class="line-number">' + (index + 1) + "</span>" + line;
  });

  return numberedLines.join("\n");
}

/*--Json Minfier--*/
function minifyJSON() {
  document.getElementById("formatjsonoutput").style.display = "block";
  try {
    var jsonInput = document.getElementById("jsonInput").value;
    var minifiedJSON = JSON.stringify(JSON.parse(jsonInput));
    document.getElementById("minifiedJSON").textContent = minifiedJSON;
  } catch (error) {
    document.getElementById("minifiedJSON").textContent =
      "Invalid JSON: " + error.message;
  }
}

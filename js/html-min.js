/*- HTML Minifier Start-*/
document.getElementById("labHtlCompr").addEventListener("click", function () {
    var fullHtml = document.getElementById("inputCode").value;
    var headHTML = "";
    var headstatus = document.getElementById("headstatus").checked;
    if (fullHtml != 0) {
        if (headstatus != true) {
            //Compress all the things!
            fullHtml = fullHtml.replace(/(\r\n|\n|\r|\t)/gm, "");
            fullHtml = fullHtml.replace(/\s+/g, " ");
            fullHtml = fullHtml.replace(/> /g, ">");
        } else {
            //Don't compress the head
            fullHtml = fullHtml.replace(new RegExp("</HEAD", "gi"), '</head');
            fullHtml = fullHtml.replace(new RegExp("</head ", "gi"), '</head');

            var bodySplit = "</head>";
            var i = fullHtml.indexOf(bodySplit) != -1;
            if (i == true) {
                var bodySplit = "</head>";
                tempo = fullHtml.split(new RegExp(bodySplit, 'i'));
                headHTML = tempo[0];
                fullHtml = tempo[1];
            } else {
                bodySplit = "";
            }
            fullHtml = fullHtml.replace(/(\r\n|\n|\r|\t|\s)/gm, "");
            fullHtml = fullHtml.replace(/\s+/g, " ");
            fullHtml = fullHtml.replace(/> /g, ">");
            fullHtml = headHTML + bodySplit + '\n' + fullHtml;
        }
    } else {
        alert("Please past your html code in the textbox !")
    }
    document.getElementById("outputCode").value = fullHtml;
    document.getElementById("outputCode").style.display = 'block';
});

//reset text areas
document.getElementById("clearText").addEventListener("click", function () {
    document.getElementById("inputCode").value = "";
    document.getElementById("outputCode").value = "";
    document.getElementById("inputCode").focus();
    document.getElementById("outputCode").style.display = 'none';
});

var textBox = document.getElementById("outputCode");
textBox.onfocus = function () {
    textBox.select();
    textBox.onmouseup = function () {
        textBox.onmouseup = null;
        return false;
    };
};

/*- Html Minifier End -*/
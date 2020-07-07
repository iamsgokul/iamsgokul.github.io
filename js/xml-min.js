document.getElementById("labHtlCompr").addEventListener("click", function () {
        var e = document.getElementById("inputCode").value,
            t = document.getElementById("headstatus").checked;
        0 != e ? (1 != t ? e = (e = (e = e.replace(/(\r\n|\n|\r|\t)/gm, "")).replace(/\s+/g, " ")).replace(/> /g, ">") : (e = (e = (e = e.replace(/(\r\n|\n|\r|\t|\s)/gm, "")).replace(/\s+/g, " ")).replace(/> /g, ">"), e = bodySplit + "\n" + e), document.getElementById("outputCode").value = e, document.getElementById("outputCode").style.display = "block") : (alert("Please past your html code in the textbox !"), document.getElementById("outputCode").style.display = "none")
    }),
    document.getElementById("clearText").addEventListener("click", function () {
        document.getElementById("inputCode").value = "", document.getElementById("outputCode").value = "", document.getElementById("inputCode").focus(), document.getElementById("outputCode").style.display = "none"
    });
var textBox = document.getElementById("outputCode");
textBox.onfocus = function () {
    textBox.select(), textBox.onmouseup = function () {
        return textBox.onmouseup = null, !1
    }
};
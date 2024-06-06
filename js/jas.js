/*- Responsive Check Start -*/
function loadUrl() {
  var elems = document.getElementsByClassName("device-cont");
  for (var i = 0; i < elems.length; i += 1) {
    elems[i].style.display = "block";
  }
  document.getElementById("resp1").src = document.getElementById("url").value;
  document.getElementById("resp2").src = document.getElementById("url").value;
  document.getElementById("resp3").src = document.getElementById("url").value;
  document.getElementById("resp4").src = document.getElementById("url").value;
  document.getElementById("resp5").src = document.getElementById("url").value;
  document.getElementById("resp6").src = document.getElementById("url").value;
  document.getElementById("resp7").src = document.getElementById("url").value;
  document.getElementById("resp8").src = document.getElementById("url").value;
  document.getElementById("resp9").src = document.getElementById("url").value;
  document.getElementById("resp10").src = document.getElementById("url").value;
  document.getElementById("resp11").src = document.getElementById("url").value;
  document.getElementById("resp12").src = document.getElementById("url").value;
}
/*- Responsive Check End -*/
/*-Character Count Start-*/
function countit(what) {
  formcontent = what.form.charcount.value;
  what.form.displaycount.value = formcontent.length;
}
/*-Character Count End-*/

/*-CSS Mini Start-*/
function get(a) {
  return document.getElementById(a);
}

function highlightCode(a) {
  if (hc.checked) {
    var b = a.innerHTML;
    (b = b.replace(/\{([\s\S]+?)\}/g, function (a) {
      return a
        .replace(/\'(.*?)\'/g, "<span class='st'>'$1'</span>")
        .replace(/\"(.*?)\"/g, "<span class='st'>\"$1\"</span>")
        .replace(
          /(\{|\n|;)?(.[^\{]*?):(.[^\{]*?)(;|\})/g,
          "$1<span class='pr'>$2</span>:<span class='vl'>$3</span>$4"
        )
        .replace(/<span class='pr'>\{/g, "{<span class='pr'>");
    })),
      (b = b.replace(/&lt;(.*?)('|")(.*?)('|")&gt;/g, function (a) {
        return a
          .replace(/'(.*?)'/g, "<span class='vl'>'$1'</span>")
          .replace(/"(.*?)"/g, "<span class='vl'>\"$1\"</span>");
      })),
      (b = b.replace(/\{([\s\S]+?)\}/g, function (a) {
        return a
          .replace(/([\(\)\{\}\[\]\:\;\,]+)/g, "<span class='pn'>$1</span>")
          .replace(/\!important/gi, "<span class='im'>!important</span>");
      })),
      (b = b.replace(/\/\*([\w\W]+?)\*\//gm, "<span class='cm'>/*$1*/</span>")),
      (a.innerHTML = "<code>" + b + "</code>"),
      (hr.style.display = "block"),
      (rt.style.display = "block");
  } else (hr.style.display = "none"), (rt.style.display = "none");
}

function compressCSS(a) {
  var b = get(a),
    c = /@(media|-w|-m|-o|keyframes|page)(.*?)\{([\s\S]+?)?\}\}/gi,
    d = b.value,
    e = d.length;
  (d =
    rc.checked || sc.checked
      ? d.replace(/\/\*[\w\W]*?\*\//gm, "")
      : d.replace(/(\n+)?(\/\*[\w\W]*?\*\/)(\n+)?/gm, "\n$2\n")),
    (d = d.replace(/([\n\r\t\s ]+)?([\,\:\;\{\}]+?)([\n\r\t\s ]+)?/g, "$2")),
    (d = sc.checked ? d : d.replace(/\}(?!\})/g, "}\n")),
    (d = bi.checked
      ? d.replace(c, function (a) {
          return a.replace(/\n+/g, "\n  ");
        })
      : d.replace(c, function (a) {
          return a.replace(/\n+/g, "");
        })),
    (d = bi.checked && !sc.checked ? d.replace(/\}\}/g, "}\n}") : d),
    (d =
      bi.checked && !sc.checked
        ? d.replace(/@(media|-w|-m|-o|keyframes)(.*?)\{/g, "@$1$2{\n  ")
        : d),
    (d = cm.checked
      ? d.replace(/;\}/g, "}")
      : d.replace(/\}/g, ";}").replace(/;+\}/g, ";}").replace(/\};\}/g, "}}")),
    (d = d.replace(/\:0(px|em|pt)/gi, ":0")),
    (d = d.replace(/ 0(px|em|pt)/gi, " 0")),
    (d = d.replace(/\s+\!important/gi, "!important")),
    (d = d.replace(/(^\n+|\n+$)/, "")),
    (b.value = d),
    (hr.innerHTML =
      "/* " +
      (e - d.length) +
      " of " +
      e +
      " unused characters has been removed. */\n" +
      d.replace(/</g, "&lt;").replace(/>/g, "&gt;")),
    highlightCode(hr);
}

function clearField(a) {
  var b = get(a);
  (b.value = ""), b.focus();
}

function selectAll(a) {
  get(a).focus(), get(a).select();
}
var hc = get("highlightCode"),
  rc = get("removeComments"),
  sc = get("superCompact"),
  cm = get("keepLastComma"),
  bi = get("betterIndentation"),
  bs = get("breakSelector"),
  tt = get("toTab"),
  to = get("tabOpt").getElementsByTagName("input"),
  sb = get("spaceBetween"),
  ip = get("inlineSingleProp"),
  rs = get("removeLastSemicolon"),
  il = get("inlineLayout"),
  si = get("singleBreak"),
  hr = get("highlightedResult"),
  rt = document.getElementsByTagName("h2")[1];
/*-CSS Mini End-*/
/*- Fav Icon Start -*/
function checkfavi(visitor_name, exten, displayObj) {
  displayObj.value =
    '<link href="' +
    visitor_name.value +
    '" rel="shortcut icon" type="' +
    exten.value +
    '">';
}
/*- Fav Icon End -*/

/*-Google Ads Start-*/
function adsensconvert() {
  var re = /[<>"'&]/g;
  for (i = 0; i < arguments.length; i++)
    arguments[i].value = arguments[i].value.replace(re, function (m) {
      return removechar(m);
    });
}

function removechar(match) {
  if (match == "<") return "&lt;";
  else if (match == ">") return "&gt;";
  else if (match == '"') return "&quot;";
  else if (match == "'") return "&#039;";
  else if (match == "&") return "&amp;";
}
/*-Google Ads End-*/

/*- Google Direct Download Link Start-*/
function clearFiled() {
  document.getElementById("googledrid").style.display = "none";
}

function checkName(a, b) {
  25 > a.value.length
    ? (alert("Please enter correct Google Drive File ID"),
      (b.style.display = "none"))
    : ((b.value =
        "https://docs.google.com/uc?id=" + a.value + "&export=download"),
      (b.style.display = "block"));
}
/*- Google Direct Download Link End-*/

/*- Meta Tag Start-*/
function MakeIt(form) {
  var txt =
    '<meta name="Description" content="' + form.description.value + '">\r\n';
  txt += '<meta name="Keywords" content="';
  if (form.keywords.value) txt += form.keywords.value + '">\r\n';
  txt += '<meta name="Author" content="' + form.author.value + '">\r\n';
  txt += '<meta name="Language" content="' + form.language.value + '">\r\n';
  form.source.value = txt;
}

function AddText(form, Action) {
  var AddTxt = "";
  var txt = "";
  form.keywords.value += AddTxt;
}
/*- Meta Tag End -*/

/*- Blogger Site Map Start-*/
function blogSiteMap(form) {
  var siteUrl = form.siteurl.value;
  var txt = `Sitemap: ${siteUrl}/sitemap.xml  // (for all Blogger blog posts).
Sitemap: ${siteUrl}/sitemap-pages.xml  // (for all Blogger Pages)`;
  form.source.value = txt;
  form.source.display = "block";
}

function robotsTxt(form) {
  var siteUrl = form.siteurl.value;

  var txt = `User-agent: Mediapartners-Google
Disallow: 

User-agent: *
Disallow: /search
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap-pages.xml`;

  form.source.value = txt;
  form.source.style.display = "block";
}

/*- Blogger Site Map End -*/

/*- Social Media Meta Tag Start-*/
function genrate(
  facebookProfile,
  facebookPage,
  googleProfile,
  googlePage,
  twitterAcc,
  exte
) {
  exte.value =
    "<meta content='" +
    facebookProfile.value +
    "' property='article:author'/>\r\n" +
    "<meta content='" +
    facebookPage.value +
    "' property='article:publisher'/>\r\n" +
    "<link href='" +
    googleProfile.value +
    "' rel='article:author'/>\r\n" +
    "<link href='" +
    googlePage.value +
    "' rel='article:author'/>\r\n" +
    "<meta content='" +
    twitterAcc.value +
    "' rel='article:author'/>\r\n";
}
/*- Social Media Meta Tag End-*/

/*- Social Media Meta Tag Start-*/
function rest() {
  (document.getElementById("thumblin").style.display = "none"),
    (document.getElementById("thumImg1").style.display = "none"),
    (document.getElementById("thumImg2").style.display = "none"),
    (document.getElementById("thumImg3").style.display = "none"),
    (document.getElementById("thumImg4").style.display = "none"),
    (document.getElementById("thumImg5").style.display = "none"),
    (document.getElementById("thumImg6").style.display = "none"),
    (document.getElementById("thumImg7").style.display = "none"),
    (document.getElementById("downImg1").style.display = "none"),
    (document.getElementById("downImg2").style.display = "none"),
    (document.getElementById("downImg3").style.display = "none"),
    (document.getElementById("downImg4").style.display = "none"),
    (document.getElementById("downImg5").style.display = "none"),
    (document.getElementById("downImg6").style.display = "none"),
    (document.getElementById("downImg7").style.display = "none"),
    (document.getElementById("downImg8").style.display = "none");
}

function getThumb(e) {
  var t = e.value;
  if (!0 === t.includes("www.youtube.com/"))
    if (t.length > 40 && t.length <= 50) {
      var m = e.value.replace(/\s+/, "").split("=");
      (m = m[m.length - 1]),
        (document.getElementById("thumblin").innerHTML =
          "http://img.youtube.com/vi/" + m + "/0.jpg"),
        thumblin.length > 5
          ? (document.getElementById("thumblin").style.display = "none")
          : (document.getElementById("thumblin").style.display = "block"),
        (document.getElementById("thumImg1").src =
          "http://img.youtube.com/vi/" + m + "/0.jpg"),
        (document.getElementById("thumImg2").src =
          "http://img.youtube.com/vi/" + m + "/1.jpg"),
        (document.getElementById("thumImg3").src =
          "http://img.youtube.com/vi/" + m + "/2.jpg"),
        (document.getElementById("thumImg4").src =
          "http://img.youtube.com/vi/" + m + "/3.jpg"),
        (document.getElementById("thumImg5").src =
          "http://img.youtube.com/vi/" + m + "/hqdefault.jpg"),
        (document.getElementById("thumImg6").src =
          "http://img.youtube.com/vi/" + m + "/mqdefault.jpg"),
        (document.getElementById("thumImg7").src =
          "http://img.youtube.com/vi/" + m + "/maxresdefault.jpg"),
        (document.getElementById("downImg1").href =
          "http://img.youtube.com/vi/" + m + "/0.jpg"),
        (document.getElementById("downImg2").href =
          "http://img.youtube.com/vi/" + m + "/1.jpg"),
        (document.getElementById("downImg3").href =
          "http://img.youtube.com/vi/" + m + "/2.jpg"),
        (document.getElementById("downImg4").href =
          "http://img.youtube.com/vi/" + m + "/3.jpg"),
        (document.getElementById("downImg5").href =
          "http://img.youtube.com/vi/" + m + "/hqdefault.jpg"),
        (document.getElementById("downImg6").href =
          "http://img.youtube.com/vi/" + m + "/mqdefault.jpg"),
        (document.getElementById("downImg7").href =
          "http://img.youtube.com/vi/" + m + "/maxresdefault.jpg"),
        (document.getElementById("thumblin").style.display = "block"),
        (document.getElementById("thumImg1").style.display = "block"),
        (document.getElementById("thumImg2").style.display = "block"),
        (document.getElementById("thumImg3").style.display = "block"),
        (document.getElementById("thumImg4").style.display = "block"),
        (document.getElementById("thumImg5").style.display = "block"),
        (document.getElementById("thumImg6").style.display = "block"),
        (document.getElementById("thumImg7").style.display = "block"),
        (document.getElementById("downImg1").style.display = "block"),
        (document.getElementById("downImg2").style.display = "block"),
        (document.getElementById("downImg3").style.display = "block"),
        (document.getElementById("downImg4").style.display = "block"),
        (document.getElementById("downImg5").style.display = "block"),
        (document.getElementById("downImg6").style.display = "block"),
        (document.getElementById("downImg7").style.display = "block"),
        console.log(m);
    } else alert("Please enter the valied YouTube URL");
  else alert("Please enter the valied YouTube URL");
}
/*- Social Media Meta Tag End-*/

/*- Stock Avg Price Start-*/
function calculator() {
  var opnbtn = document.getElementsByClassName("calout")[0];
  opnbtn.classList.add("open");
  let shval = document.getElementById("cquantity").value;
  let shpri = document.getElementById("cprice").value;
  let nshval = document.getElementById("nquantity").value;
  let nshpri = document.getElementById("nprice").value;

  let oldInv = parseFloat(shval) * parseFloat(shpri);
  document.getElementById("oldinv").innerHTML = oldInv;
  let newInv = parseFloat(nshval) * parseFloat(nshpri);
  document.getElementById("newinv").innerHTML = newInv;

  let avgPri =
    (parseFloat(shval) * parseFloat(shpri) +
      parseFloat(nshval) * parseFloat(nshpri)) /
    (parseFloat(shval) + parseFloat(nshval));
  document.getElementById("avgPric").innerHTML = avgPri;

  let totPric =
    parseFloat(shval) * parseFloat(shpri) +
    parseFloat(nshval) * parseFloat(nshpri);
  document.getElementById("totalAmt").innerHTML = totPric;

  let totQat = parseInt(shval) + parseInt(nshval);
  document.getElementById("totalQat").innerHTML = totQat;
}
function clearFld() {
  var clsbtn = document.getElementsByClassName("calout open")[0];
  clsbtn.classList.remove("open");
}
/*- Stock Avg Price End-*/

/*-- TNEB Start --*/
function ebCalculator() {
  const valUs = document.getElementById("getValue").value;

  document.getElementById("showOutput").style.display = "block";
  if (valUs >= 101 && valUs <= 200) {
    const minVal = valUs - 100;
    const sumVal = minVal * 2.25;
    document.getElementById("showOutput").innerHTML =
      "Your Bill Amount: <span> Rs " + sumVal + "</span>";
  } else if (valUs >= 201 && valUs <= 400) {
    const minVal = valUs - 200;
    const sumVal = minVal * 4.5 + 225;
    document.getElementById("showOutput").innerHTML =
      "Your Bill Amount: <span> Rs " + sumVal + "</span>";
  } else if (valUs >= 401 && valUs <= 500) {
    const minVal = valUs - 400;
    const sumVal = minVal * 6 + 1125;
    document.getElementById("showOutput").innerHTML =
      "Your Bill Amount: <span> Rs " + sumVal + "</span>";
  } else if (valUs >= 501 && valUs <= 600) {
    const minVal = valUs - 500;
    const sumVal = minVal * 8 + 1950;
    document.getElementById("showOutput").innerHTML =
      "Your Bill Amount: <span> Rs " + sumVal + "</span>";
  } else if (valUs >= 601 && valUs <= 800) {
    const minVal = valUs - 600;
    const sumVal = minVal * 9 + 2750;
    document.getElementById("showOutput").innerHTML =
      "Your Bill Amount: <span> Rs " + sumVal + "</span>";
  } else if (valUs >= 801 && valUs <= 1000) {
    const minVal = valUs - 800;
    const sumVal = minVal * 10 + 4550;
    document.getElementById("showOutput").innerHTML =
      "Your Bill Amount: <span> Rs " + sumVal + "</span>";
  } else if (valUs > 1000) {
    const minVal = valUs - 1000;
    const sumVal = minVal * 11 + 6550;
    document.getElementById("showOutput").innerHTML =
      "Your Bill Amount: <span> Rs " + sumVal + "</span>";
  } else {
    document.getElementById("showOutput").innerHTML = "No Charge";
  }
}

function clearEBcalc() {
  document.getElementById("showOutput").style.display = "none";
}
/*-- TNEB End --*/
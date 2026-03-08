/*- Google Drive Audio Start-*/
document.addEventListener('DOMContentLoaded', function () {
    var generateBtn = document.getElementById('generate');
    var resetBtn = document.getElementById('reset');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function () {
            var urlInput = document.getElementById('url');
            var geval = urlInput.value.replace(/\/view/g, '/preview').replace(/\?usp=sharing/g, '');
            var width = document.getElementById('wid').value;
            var height = document.getElementById('hei').value;
            if (urlInput.value.length > 20) {
                var getval = '<iframe frameborder="0" width="' + width + '" height="' + height + '" src="https://drive.google.com/file/d/' + geval + '/preview"></iframe>';
                var textarea = document.querySelector('textarea');
                textarea.style.display = 'block';
                textarea.value = getval;
                var liveurl = 'https://drive.google.com/file/d/' + geval + '/preview';
                document.getElementById('iframe').src = liveurl;
                document.querySelector('.preview-output').style.display = 'block';
            } else {
                alert('Enter the Correct Audio File ID');
            }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            document.getElementById('url').value = '';
            document.getElementById('wid').value = '400';
            document.getElementById('hei').value = '200';
            document.querySelector('textarea').style.display = 'none';
            document.querySelector('.preview-output').style.display = 'none';
        });
    }
});
/*- Google Drive Audio End-*/


/*-- CSS UnMinifer Start--*/
var minout = document.getElementById('minfiy-output');
var minoutlb = document.getElementById('minoutlable');
var copybtn = document.getElementById('minfiy-sel');
window.onload = function () {
    var minifyBtn = document.getElementById('minfiy-btn');
    if (minifyBtn) {
        minifyBtn.onclick = function () {
            var minInput = document.getElementById('minfiy-input');
            if (minInput && minInput.value.length > 0) {
                var minin = minInput.value
                    .split('{').join(' {\n    ')
                    .split(';').join(';\n    ')
                    .split(',').join(', ')
                    .split('    }').join('}\n')
                    .replace(/\}(.+)/g, '}\n$1')
                    .replace(/\n    ([^:]+):/g, '\n    $1: ')
                    .replace(/([A-z0-9\)])}/g, '$1;\n}');
                minout.style.display = 'block';
                minoutlb.style.display = 'block';
                copybtn.style.display = 'inline-block';
                minout.value = minin;
                return false;
            } else {
                alert('Please copy and past the css code in text box and click unminify button.');
            }
        };
    }
    
    var copyBtn = document.getElementById('minfiy-sel');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var output = document.getElementById('minfiy-output');
            output.select();
            document.execCommand('copy');
            alert('Code Copied to clipboard');
        });
    }
};

function clearTxt() {
    document.getElementById("minfiy-input").value = "";
    document.getElementById("minfiy-output").value = "";
    minout.style.display = 'none';
    minoutlb.style.display = 'none';
    copybtn.style.display = 'none';
}

/*-- CSS UnMinifer End--*/

/*- Text Transfer Start -*/
function lowCasTran() {
    document.getElementById('txt-box').style.textTransform = 'lowercase';
}

function uprCasTran() {
    document.getElementById('txt-box').style.textTransform = 'uppercase';
}

function capCasTran() {
    document.getElementById('txt-box').style.textTransform = 'capitalize';
}

function initalCas() {
    document.getElementById('txt-box').style.textTransform = 'initial';
}

function clearbtn() {
    document.getElementById('txt-box').value = '';
}
/*- Text Transfer End -*/

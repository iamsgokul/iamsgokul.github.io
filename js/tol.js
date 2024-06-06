/*- Google Drive Audio Start-*/
$(function () {
    $('#generate').click(function () {
        var geval = $('#url').val().replace(/\/view/g, '/preview').replace(/\?usp=sharing/g, '');
        var width = $('#wid').val();
        var height = $('#hei').val();
        if ($('#url').val().length > 20) {
            var getval = '<iframe frameborder="0" width="' + width + '" height="' + height + '" src="https://drive.google.com/file/d/' + geval + '/preview"></iframe>';
            $('textarea').show();
            $('textarea').html(getval);
            var liveurl = 'https://drive.google.com/file/d/' + geval + '/preview';
            $("#iframe").attr("src", liveurl);
            $('.preview-output').show();
        } else {
            alert('Enter the Correct Audio Fisle ID');
        }
    })
    $('#reset').click(function () {
        $('#url').val('');
        $('#wid').val('400');
        $('#hei').val('200');
        $('textarea').hide();
        $('.preview-output').hide();
    })
})
/*- Google Drive Audio End-*/


/*-- CSS UnMinifer Start--*/
var minout = document.getElementById('minfiy-output');
var minoutlb = document.getElementById('minoutlable');
var copybtn = document.getElementById('minfiy-sel');
window.onload = function () {
    document.getElementById('minfiy-btn').onclick = function () {
        if ($('#minfiy-input').val() != 0) {
            var minin = document.getElementById('minfiy-input').value
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

function clearTxt() {
    document.getElementById("minfiy-input").value = "";
    document.getElementById("minfiy-output").value = "";
    minout.style.display = 'none';
    minoutlb.style.display = 'none';
    copybtn.style.display = 'none';
}
$("#minfiy-sel").click(function () {
    $("#minfiy-output").select();
    document.execCommand('copy');
    alert('Code Copyed to clipboard')
});

/*-- CSS UnMinifer End--*/

/*- Text Transfer Start -*/
function lowCasTran() {
    $('#txt-box').css('text-transform', 'lowercase');
}

function uprCasTran() {
    $('#txt-box').css('text-transform', 'uppercase');
}

function capCasTran() {
    $('#txt-box').css('text-transform', 'capitalize');
}

function initalCas() {
    $('#txt-box').css('text-transform', 'initial');
}

function clearbtn() {
    $('#txt-box').val('');
}
/*- Text Transfer End -*/
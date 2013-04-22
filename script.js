(function() {

var htmlCodeMirror = CodeMirror.fromTextArea(document.getElementById('html'), {
	mode: 'text/html'
});
htmlCodeMirror.on("change", function(cm, change) {
	preview();
});

var cssCodeMirror = CodeMirror.fromTextArea(document.getElementById('css'), {
	mode: 'text/css'
});
cssCodeMirror.on("change", function(cm, change) {
	preview();
});

var jsCodeMirror = CodeMirror.fromTextArea(document.getElementById('js'), {
	mode: 'text/javascript'
});


var iframe = document.getElementById('preview');

document.getElementById('run').onclick = run;

var timer;
var delay = 100;

function preview() {
	clearTimeout(timer);
	timer = setTimeout(update, delay);
}

function update() {
	var target =  iframe.contentDocument ||  iframe.contentWindow.document;
	target.open();
	target.write(htmlCodeMirror.getValue());
	target.close();
	var style = document.createElement('style');
	style.textContent = cssCodeMirror.getValue();
	target.querySelector('head').appendChild(style);
}

function run() {
	iframe.contentWindow.eval(jsCodeMirror.getValue());
}

setTimeout(update, delay);

/*
$('#html').keyup(function(){
        body.html(this.value);
});

$('#css').keyup(function(){
        style.text(this.value);
});
*/
})();

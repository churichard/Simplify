var html = "";

document.addEventListener('keydown', handleKeypress, false);

function handleKeypress(){
	if (event.keyCode == 84){
		getSelectionHtml();
		if (html != ""){
			var site = "http://words.bighugelabs.com/api/2/e2b80f9b79a99670c738434e668ebc08/" + html + "/";
			$.get(
				site,
				function(data) {
					var res = data.match(/\|.*?\n/) +"|"; 
					var syns = res.split("|");
					alert(syns[2]);
				}
			);
			html = "";
		}
	}
}

function getSelectionHtml() {
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            selected = container.innerHTML;
			html = selected.split(" ")[1];
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            selected = document.selection.createRange().htmlText;
			html = selected.split(" ")[1];
        }
    }
}
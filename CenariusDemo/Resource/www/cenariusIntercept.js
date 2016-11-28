
    HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = interceptor;

    window.addEventListener('submit', function(e) {
        interceptor(e);
    }, true);

    function interceptor(e) {
        var frm = e ? e.target : this;
        interceptor_onsubmit(frm);
        frm._submit();
    }

    function interceptor_onsubmit(f) {
        var jsonArr = [];
        for (i = 0; i < f.elements.length; i++) {
            var parName = f.elements[i].name;
            var parValue = f.elements[i].value;
            var parType = f.elements[i].type;

            jsonArr.push({
                name : parName,
                value : parValue,
                type : parType
            });
        }

        interception.customSubmit(JSON.stringify(jsonArr),
                f.attributes['method'] === undefined ? null
                        : f.attributes['method'].nodeValue,
                f.attributes['enctype'] === undefined ? null
                        : f.attributes['enctype'].nodeValue);
    }

    lastXmlhttpRequestPrototypeMethod = null;
    XMLHttpRequest.prototype.reallyOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        lastXmlhttpRequestPrototypeMethod = method;
        this.reallyOpen(method, url, async, user, password);
    };
    XMLHttpRequest.prototype.reallySend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        interception.customAjax(lastXmlhttpRequestPrototypeMethod, body);
        lastXmlhttpRequestPrototypeMethod = null;
        this.reallySend(body);
    };


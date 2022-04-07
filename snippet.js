var renderFuncs = {

}
var states = {

}
var events = {

}
var allowUpdateStates = {};
var observers = [];


function getState(name) {
    return states[name];
}
function updateState(state, func) {
    func(state);
}

function iterateState(state, stateFunc) {
    var gen = "";
    var index = 0;
    for (let item of state) {
        gen += stateFunc(item, index);
        index++;
    }
    return gen;
}

function addEvent(event, id, state, props, callback) {
    setTimeout(() => {
        if (document.getElementById(id) !== null) {
            var element = document.getElementById(id);
            document.getElementById(id).addEventListener(event, (e) => {
                e.preventDefault();
                callback(state, props, element);
            }, true);
        }
    }, 60);
}

function bindState(id, state, props, callback) {
    setTimeout(() => {
        var element = document.getElementById(id);
        element.oninput = (e) => {
            e.preventDefault();
            callback(state, props, element);
        }
    }, 60);
}

function bindClassState(class, state, props, callback) {
    setTimeout(() => {
        var elements = document.getElementsByClassName(class);
        for (let element of elements) {
            element.oninput = (e) => {
                e.preventDefault();
                callback(state, props, element);
            }
        }
    }, 60);
}

function addClassEvent(event, className, state, callback) {
    setTimeout(() => {
        var elements = document.getElementsByClassName(className);
        for (let element of elements) {
            element.addEventListener(event, (e) => {
                e.preventDefault();
                callback(state, element);
            }, true);
        }
    }, 60);
}

function runCallBack(state) {
    callback(state)
}

window.onload = function () {
    var elements = document.getElementsByClassName("snippet");
    for (let element of elements) {
        render(element);
    }
    //run init function
    if (typeof init === "function") {
        init();
    }
}

function renderDirect(element, renderFunc, state) {
    if (!element) {
        element = document.createElement("div");
    }
    document.body.appendChild(element);
    render(element, renderFunc, state)
}

function render(element, renderFunc, state, props) {
    var renderFunc = element.dataset.renderfunc || renderFunc;
    var stateString = element.dataset.state || state;
    var state = states[stateString];
    var statesToListen = allowUpdateStates[renderFunc];
    props = props || {};
    renderFunc = renderFuncs[renderFunc];

    states[stateString] = ObservableSlim.create(state, true, (changes) => {
        var doUpdate = false;
        if (!statesToListen) {
            doUpdate = true;
        }
        for (let change of changes) {
            var jsonPointer = change.jsonPointer;
            // //statesToIgnore.indexOf(jsonPointer) !== -1
            // if(statesToIgnore && includes(jsonPointer, statesToIgnore)){
            //     doUpdate = false;
            // }
            if (statesToListen && includes(jsonPointer, statesToListen)) {
                doUpdate = true;
            }
        }
        if (doUpdate) {
            setTimeout(() => {
                element.innerHTML = renderFunc(state, props);
            }, 30)

        }
    });
    state = states[stateString];

    element.innerHTML = renderFunc(state, props);
}

// function ignoreState(component, jsonPointer){
//     if(!ignoreStates[component]){
//         ignoreStates[component] = [];
//     }
//     ignoreStates[component].push(jsonPointer);
// }
function allowUpdateState(component, jsonPointers) {
    if (!allowUpdateStates[component]) {
        allowUpdateStates[component] = [];
    }
    allowUpdateStates[component].push(...jsonPointers);
}

function includes(jsonPointer, statesToIgnore) {
    for (let state of statesToIgnore) {
        if (jsonPointer.indexOf(state) !== -1) {
            return true;
        }
    }
    return false;
}
function runFunc(state, callback) {
    callback(state);
}

function loadFile(path, state, props) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.send();
    if (xhr.status === 200) {
        return processRawText(xhr.responseText, state, props);
    } else {
        return null;
    }
}

function processRawText(text, state, props) {
    var hashValue = generateRandomString(10);
    text = replaceHash(text, hashValue);
    if (text.indexOf("!divide!") == -1 && text.indexOf("!divideDown") == -1) {
        text = "`" + text + "`";
        return eval(text);
    } else {
        //separate the html and the pure javascript
        if (text.indexOf("!divide!") != -1) {
            //javascript on top
            var sections = text.split("!divide!");
            var js = sections[0];
            var html = sections[1];
            eval(js);
            html = "`" + html + "`";
            return eval(html);

        } else if (text.indexOf("!divideDown!") != -1) {
            //javascript on bottom
            var sections = text.split("!divide!");
            var js = sections[1];
            var html = sections[0];
            eval(js)
            html = "`" + html + "`";
            return eval(html);
        } else {
            return "<h1 style = 'color:red'>Error: Invalid Snippet Format</h1>"
        }
    }
}

function replaceHash(text, hashValue) {
    //replace all # with hashValue where the previous char is "
    var index = text.indexOf("#");
    while (index != -1) {
        var prevChar = text[index - 1];
        if (prevChar == "\"") {
            text = text.substring(0, index) + hashValue + text.substring(index + 1);
        }
        index = text.indexOf("#", index);
    }
    return text;
}

function generateRandomString(num) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < num; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
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

function addEvent(event, id, state, callback) {
    setTimeout(() => {
        if (document.getElementById(id) !== null) {
            var element = document.getElementById(id);
            document.getElementById(id).addEventListener(event, (e) => {
                e.preventDefault();
                callback(state, element);
            }, true);
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
    if (init) {
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

function render(element, renderFunc, state) {
    var renderFunc = element.dataset.renderfunc || renderFunc;
    var stateString = element.dataset.state || state;
    var state = states[stateString];
    var statesToListen = allowUpdateStates[renderFunc];
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
                element.innerHTML = renderFunc(state);
            }, 30)

        }
    });
    state = states[stateString];

    element.innerHTML = renderFunc(state);
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

function loadFile(path, state) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.send();
    if (xhr.status === 200) {
        return processRawText(xhr.responseText, state);
    } else {
        return null;
    }
}

function processRawText(text, state) {
    text = "`" + text + "`";
    return eval(text);
}
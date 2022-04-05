var renderFuncs = {
    
}
var states = {

}
var events = {

}
var ignoreStates = {};
var observers = [];


function getState(name){
    return states[name];
}
function updateState(state, func){
    func(state);
}

function iterateState(state, stateFunc){
    var gen = "";
    for(let item of state){
        gen += stateFunc(item);
    }
    return gen;
}

function addEvent(event, id, state, callback){
    setTimeout(() =>{
        if(document.getElementById(id) !== null){
            document.getElementById(id).addEventListener(event, (e) => {
                e.preventDefault();
                callback(state);
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

function runCallBack(state){
    callback(state)
}

window.onload = function(){
    var elements = document.getElementsByClassName("snippet");
    for(let element of elements){
        render(element);
    }
}

function renderDirect(element, renderFunc, state){
    if(!element){
        element = document.createElement("div");
    }
    document.body.appendChild(element);
    render(element, renderFunc, state)
}

function render(element, renderFunc, state){
    var renderFunc = element.dataset.renderfunc || renderFunc;
    var stateString = element.dataset.state || state;
    var state = states[stateString];
    var statesToIgnore = ignoreStates[renderFunc];
    renderFunc = renderFuncs[renderFunc];

    states[stateString] = ObservableSlim.create(state, true, (changes) => {
        var doUpdate = true;
        for(let change of changes){
            var jsonPointer = change.jsonPointer;
            console.log(jsonPointer);
            //statesToIgnore.indexOf(jsonPointer) !== -1
            if(statesToIgnore && includes(jsonPointer, statesToIgnore)){
                doUpdate = false;
            }
        }
        if(doUpdate){
            console.log("updating");
            element.innerHTML = renderFunc(state);
        }
    });
    state = states[stateString];

    element.innerHTML = renderFunc(state);
}

function ignoreState(component, jsonPointer){
    if(!ignoreStates[component]){
        ignoreStates[component] = [];
    }
    ignoreStates[component].push(jsonPointer);
}

function includes(jsonPointer, statesToIgnore){
    console.log(jsonPointer);
    console.log(statesToIgnore);
    for(let state of statesToIgnore){
        if(jsonPointer.indexOf(state) !== -1){
            console.log("false")
            return true;
        }
    }
    return false;
}
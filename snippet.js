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

        document.getElementById(id).addEventListener(event, (e) => {
            e.preventDefault();
            callback(state);
        }, true);
    }, 60)
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

function render(element){
    var renderFunc = element.dataset.renderfunc;
    var stateString = element.dataset.state;
    var state = states[stateString];
    var statesToIgnore = ignoreStates[renderFunc];
    renderFunc = renderFuncs[renderFunc];

    states[stateString] = ObservableSlim.create(state, true, (changes) => {
        var doUpdate = true;
        for(let change of changes){
            var jsonPointer = change.jsonPointer;
            console.log(jsonPointer);
            if(statesToIgnore && statesToIgnore.indexOf(jsonPointer) !== -1){
                doUpdate = false;
            }
        }
        if(doUpdate){
            element.innerHTML = renderFunc(state);
        }
    });
    state = states[stateString];

    element.innerHTML = renderFunc(state);
}
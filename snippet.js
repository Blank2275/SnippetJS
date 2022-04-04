var renderFuncs = {
    
}
var states = {

}
var events = {

}
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
    var x = () => callback(state)
    setTimeout(() =>{
        document.getElementById(id).addEventListener(event, (e) => {
            e.preventDefault();
            x();
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
    renderFunc = renderFuncs[renderFunc];

    states[stateString] = ObservableSlim.create(state, true, (changes) => {
        element.innerHTML = renderFunc(state)
    });
    state = states[stateString];

    element.innerHTML = renderFunc(state);
}
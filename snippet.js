var renderFuncs = {
    
}
var states = {

}
var events = {

}
var observers = [];
// class Snippet extends HTMLElement {
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//         this.renderFunc = renderFuncs[this.getAttribute("data-renderFunc")];
//         var stateString = this.getAttribute("state")
//         this.state = states[stateString];
//         this.observer = ObservableSlim.create(this.state, true, (changes) => {
//             this.render();
//         });
//         this.shadowRoot.innerHTML = `
//             Error
//         `;
//         this.render();
//         watchState(this, this.renderFunc, this.state, stateString);
//     }
//     render(){
//         this.shadowRoot.innerHTML = this.renderFunc(this.state);
//     }
// }


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
        document.getElementById(id).addEventListener(event, x, true);
    }, 60)
}

function runCallBack(state){
    callback(state)
}

window.onload = function(){
    //customElements.define('custom-snippet', Snippet);
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
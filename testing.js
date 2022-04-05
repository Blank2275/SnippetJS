renderFuncs={"testComponent": (state) => {
    return `<div>
        <h1>${state.title}</h1>
        <p>${state.text}</p>
        </div>`;
},

"moviesComponent": (state) => {
    addEvent("click", "popupButton", state, (state) => {
        state.popupOpen = true;
        renderDirect(document.getElementById("popup-container"), "popupComponent", "state");
    });
    return `<div>
        ${iterateState(state.movies, (movie) => {
                return`<div>
                    <h1>${movie.title}</h1>
                    <p>${movie.releaseYear}</p>
                    <p>${movie.director}</p>
                    <p>${movie.rating}</p>
                </div>`;
            })
    }
    <button id = "popupButton">popup</button>
    </div>
    `;
},
"popupComponent": (state) => {
    addEvent("click", "popupClose", state, (state) => {
        state.popupOpen = false;
    });
    if(state.popupOpen){
        return `
        <div id = "popup">
            <h1>Popup</h1>
            <p>some text</p>
            <button id = "popupClose">Close</button>
        </div>
        `;
    } else {
        return ``;
    }
},
"counterComponent": (state) => {
    addEvent("click", "counter", state, (state) => {
        state.count += parseInt(document.getElementById("increment").value);
    });
    addEvent("click", "clear", state, (state) => {
        state.count = 0;
        state.nums = [];
    })
    return `<div>
        <input id = "increment" placeholder="increment" value="1" type = "number"></input>
        <p>${state.count}</p>
        ${(() => {
            if(state.nums.length === 0){
                return `<p class = "green">No numbers</p>`;
            } else if(state.nums[state.nums.length - 1] >= 50){
                return `<p class = "green">Greater Than 50</p>`;
            } else {
                return `<p class = "red">Less Than 50</p>`;
            }
        })()}
        <button id = "counter">Increment</button>
        <button id = "clear">Clear</button>
    </div>
    `;
},
"randomComponent": (state) => {
    while(state.nums.length < state.count) {
        state.nums.push(Math.floor(Math.random() * 100));
    }
    return `<div>
        ${iterateState(state.nums, (num) => {
            var styleClass = num >= 50 ? "green" : "red";
            return `<p class = ${styleClass}>${num}</p>`;
        }
        )}
    </div>`;
}
}
ignoreState("counterComponent", `/nums`);
states["state"] = {
    "count": 0,
    "increment": 1,
    "nums": [],
    "title": "Snippet Working",
    "text": "This is a working snippet",
    "popupOpen": false,
    "movies": [{
        "title": "Star Wars a new Hope",
        "releaseYear": 1977,
        "director": "George Lucas",
        "rating": "PG"
    },
    {
        "title": "Star Wars The Empire Strikes Back",
        "releaseYear": 1980,
        "director": "Irvin Kershner",
        "rating": "PG"
    }]
}
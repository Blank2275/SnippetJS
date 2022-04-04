renderFuncs["testComponent"] = (state) => {
    return `<div>
        <h1>${state.title}</h1>
        <p>${state.text}</p>
        </div>`;
}

renderFuncs["moviesComponent"] = (state) => {
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
    </div>
    `;
}
renderFuncs["counterComponent"] = (state) => {
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
}
ignoreStates["counterComponent"] = ["/nums/length"];
renderFuncs["randomComponent"] = (state) => {
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

states["state"] = {
    "count": 0,
    "increment": 1,
    "nums": [],
    "title": "Snippet Working",
    "text": "This is a working snippet",
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
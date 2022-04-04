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
        console.log("click")
        state.count += parseInt(document.getElementById("increment").value);
    })
    return `<div>
        <input id = "increment" placeholder="increment" value="1" type = "number"></input>
        <p>${state.count}</p>
        <button id = "counter">Increment</button>
    </div>
    `;
}
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
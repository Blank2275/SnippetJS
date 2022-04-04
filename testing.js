renderFuncs["testComponent"] = (state) => {
    return `<div>
        <h1>${state.title}</h1>
        <p>${state.text}</p>
        </div>`;
}

renderFuncs["moviesComponent"] = (state) => {
    return `<div>
        ${iterateState(state, (movie) => {
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
        console.log(state)
        state.count += state.increment;
    })
    return `<div>
        <p>${state.count}</p>
        <button id = "counter">Increment</button>
    </div>
    `;
}
states["counterState"] = {
    "count": 0,
    "increment": 1
}

states["titleState"] = {
    "title": "Snippet Working",
    "text": "This is a working snippet"
};

states["moviesState"] = [
    {
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
    }
]
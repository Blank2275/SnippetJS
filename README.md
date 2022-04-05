# SnippetJS
SnippetJS is inspired roughly by react, bringing HTML into javascript but is not meant to replace or compete with it. It is designed for projects where 
building it with only react would be cumbersome but it needs to have reactive dynamically generated methods. It allows you to create React like components
but inser them into a webpage built with normal HTML. 

To get started, you need to download <a href = "https://github.com/ElliotNB/observable-slim">Observable-Slim</a> download the observalse slim min.js file
and put a link to the downloaded file in the head of your HTML.

In the body, below the HTML Content and these script tags have to be in this order or else it will not work
```html
    <script src="snippet.js"></script>
    <script src="your-js-file.js"></script>
```

in your html document, where you want your component to be inseted add a div like the following
 ```html
<div class = "snippet" data-renderFunc="testComponent" data-state="state"></div>
 ```
 
 in your javascript file which you linked above, add this code to make a renderFunction for a hello world example
 
 ```js
 renderFuncs = {
  "testComponent": (state) => {
    return `
      <h1>${state.title}</h1>
      <h2>${state.subTitle}</h2>
    `
  }
 }
 ```
 this defines the function called to render our testComponent, the string returned will be the innerHTML of the parent div with the class of snippet,
 the name has to be the same as what was passed in the data-renderFunc
 
 below this (or above, it doesn't really matter) add this code to define the state
 ```js
 states["state"] = {
    "title": "Hello Snippets",
    "subTitle": "Your First Snippet"
 }
 ```
 this is the state of our application, whenever it changes, the application is re-rendered. The whole application will re render for any property of it
 changing, you can select which values update which component with the allowUpdateState function which will be talked about more later in this doc.
 <br>
 *note: the "state" in states["state"] should be the same name as passed in in the data-state attribute in the HTML*
 

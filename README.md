# SnippetJS

SnippetJS is inspired roughly by react, bringing HTML into javascript but is not meant to replace or compete with it. It is designed for projects where building it with only react would be cumbersome but it needs to have reactive dynamically generated methods. It allows you to create React-like components but insert them into a webpage built with normal HTML.

To get started, you need to download Observable-Slim download the observable slim min.js file and put a link to the downloaded file in the head of your HTML.

```html
<script src="observable-slim.min.js"></script>
```

In the body, below the HTML Content and these script tags have to be in this order or else it will not work

```html
<script src="snippet.js"></script>
<script src="your-js-file.js"></script>
```

in your html document, where you want your component to be inseted add a div like the following

```html
<div class="snippet" data-renderFunc="testComponent" data-state="state"></div>
```

in your javascript file which you linked above, add this code to make a renderFunction for a hello world example

```js
renderFuncs = {
	testComponent: (state) => {
		addEvent('click', 'toggle', state, (state) => {
			state.toggle = !state.toggle;
			state.title = state.toggle ? 'Hello World!' : 'Hello Snippets';
		});
		return `
       <h1>${state.title}</h1>
       <h2>${state.subTitle}</h2>
       <button id = "toggle">Toggle</button>
   `;
	},
};
```

this defines the function called to render our testComponent, the string returned will be the innerHTML of the parent div with the class of snippet, the name has to be the same as what was passed in the data-renderFunc

the addEvent function is used addEvent(eventName, id, state, callback(state))

below this (or above, it doesn't really matter) add this code to define the state

```js
states['state'] = {
	title: 'Hello World!',
	subTitle: 'Your First Snippet',
	toggle: true,
};
```

this is the state of our application, whenever it changes, the application is re-rendered. The whole application will re render for any property of it changing, you can select which values update which component with the allowUpdateState function which will be talked about more later in this doc.

_note: the "state" in states["state"] should be the same name as passed in in the data-state attribute in the HTML_

A more complicated example of a contact manager (without saving between sessions) is below

First, add this code to your renderFuncs JSON Object

```js
"contactListComponent": (state) => {
       addEvent('click', 'addContact', state, (state) => {
           state.contacts.push({
               name: document.getElementById("name").value,
               email: document.getElementById("email").value
           });
       });
       addEvent('click', 'removeContact', state, (state) => {
           state.contacts.pop();
       });
       return `
       <h1>Contact List</h1>
       <input id = "name" placeholder = "Name" />
       <input id = "email" placeholder = "Email" /><br/>
       <button id = "addContact">Add Contact</button>
       <button id = "removeContact">Remove Contact</button>
       <ul>
           ${iterateState(state.contacts, (contact) => {
           return `
               <li>
                   <h2>${contact.name}</h2>
                   <h3>${contact.email}</h3>
               </li>
               `;
       })}
       </ul>
   `;
   }
```

This uses the same techniques for events and adding HTML but it uses the iterateState function which takes an array for its first argument and a function for the second. It will loop over every element in that array and pass that element as an argument for the function. What string the function returns each time the function is called is added to the document.

This also uses plain javascript for getting the value of the text inputs for new contacts

The last thing you need for it to work is to provide some contacts in the state by adding

```js
    "contacts": [{
       "name": 'John Doe',
       "email": 'jodoe@something.com',
   }, {
       "name": 'Jane Doe',
       "email": 'jadoe@something.com'
   }]
```

There is a init function which you can define globally in your js file if you want, it is not required. If it is defined, it will be called after the application is rendered. You can call the

```js
addEvent(event, id, state, props, callback(state, props, element));
```

_note: props can be any json object but it must be an object or it will not work_
props are used to pass information down to child elements that are not state. For example, if you want to inform an element of a list from iterateState which index it is so it can pull the correct information from the state.
or

```js
addClassEvent(event, class, state, props, callback(state, props, element));
```

functions. The addClassEvent function will add the listener to an entire class

you can create a .snip file where you can put the return value of a renderFunc and

```js
return loadFile(filepath, state, props);
```

everything else should be the same. <br>

you can now add javascript to .snip files in a dedicated section if you want. You can add !divide! to your snip. Anything above is javascript and anything below is HTML Template like before. This is optional, if you don't have !divide!, it will all be treated like HTML. If you prefer your javascript on the bottom, use !divideDown! instead

_note: data-attributes are no longer the best way to add events to dynamically generated lists of elements._
_note:The # operator only works in .snip files, they are the best way to make snips anyway_
instead, use the # operator (hash operator). when assigning an id to an element, put a # in front of whatever id you chose. Inside of that same .snip file, it has to be the same file, you can use the addEvent function and put that same id with the hash and it will only detect events for that one html element in that specific snip even if you create several of that same type of snip.
behind the scenes, it replaces the # with a random 10 digit string so it should be unique every time.

```jsx
addEvent('click', '#dynamic-button', props, state, callback);

<button id="#dynamic-button">Click Me</button>;
```

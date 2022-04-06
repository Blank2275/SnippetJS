renderFuncs = {
    "contactListComponent": (state) => {
        addClassEvent("click", "contact-summary", state, (state, element) => {
            var contactId = element.getAttribute("data-contact-id");
            state.selectedContact = contactId;
        });
        return `<div>
            ${iterateState(state.contacts, (contact, id) => {
            return `<div class = "contact-summary" data-contact-id="${id + 1}">
                        <h1 class = "contact-summary-name">${contact.name}</h1>
                        <img class = "icon" src = "${contact.image}">
                    </div>`;
        })
            }
        </div>`;
    },
    "contactComponent": (state) => {
        var contact = state.contacts[parseInt(state.selectedContact) - 1];

        if (state.selectedContact != "-1") {
            return `
                <div class = "contact-details">
                    <img class = "contact-image-big" src = "${contact.image}">
                    <br>
                    <h1 class = "contact-details-name">${contact.name}</h1>
                    <h2 class = "contact-details-phone">${contact.phone}</h2>
                    <h3 class = "contact-details-email">${contact.email}</h3>
                    <h3 class = "contact-details-address">${contact.address}</h3>
                </div>
            `;
        } else {
            return ``;
        }
    },
    "tabBarComponent": (state) => {
        return `
        `
    },
    "newContactComponent": (state) => {
        addEvent("click", "add-contact", state, (state) => {
            let contact = {
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZeMhHXHoO8OZoHEcFppXKFCa9G7I8Q4VtTg&usqp=CAU",
                id: state.contacts.length.toString()
            }
            state.contacts.push(contact);
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("email").value = "";
            document.getElementById("address").value = "";
        });
        return loadFile("snips/newContactComponent.snip", state);
    }
}

allowUpdateState("newContactComponent", []);

states["state"] = {
    "selectedContact": -1,
    "tabs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "contacts": [
        {
            "name": "John Doe",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZeMhHXHoO8OZoHEcFppXKFCa9G7I8Q4VtTg&usqp=CAU",
            "email": "jdoe1234@gmail.com",
            "phone": "123-456-7890",
            "address": "123 Main St, Anytown, CA 12345",
            "id": "1"
        },
        {
            "name": "Jane Doe",
            "image": "https://cdn.osxdaily.com/wp-content/uploads/2013/07/contacts-icon.jpg",
            "email": "janey567@icloud.com",
            "phone": "123-456-7891",
            "address": "143 Fake St, Anytown, CO 11425",
            "id": "2"
        },
        {
            "name": "John Smith",
            "image": "https://www1.nyc.gov/assets/nycha/images/content/pages/contact-in-person.png",
            "email": "jsmithlol@gmail.com",
            "phone": "123-456-7892",
            "address": "123 Fake St, Anytown, CO 11425",
            "id": "3"
        }
    ]
}
function init() {
    addEvent("click", "removeContact", states["state"], (state) => {
        var contactId = state.selectedContact;
        if (contactId != "-1") {
            state.contacts.splice(parseInt(contactId) - 1, 1);
            state.selectedContact = -1;
        }
    });
}
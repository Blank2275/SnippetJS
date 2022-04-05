renderFuncs = {
    "contactListComponent": (state) => {
        addClassEvent("click", "contact-summary", state, (state, element) => {
            var contactId = element.getAttribute("data-contact-id");
            state.selectedContact = contactId;
        });
        return `<div>
            ${iterateState(state.contacts, (contact) => {
                    return `<div class = "contact-summary" data-contact-id="${contact.id}">
                        <h1 class = "contact-summary-name">${contact.name}</h1>
                        <img class = "icon" src = "${contact.image}">
                    </div>`;
                }) 
            }
        </div>`;
    },
    "contactComponent": (state) => {
        var contact = state.contacts[parseInt(state.selectedContact) - 1];
        if(state.selectedContact != "-1"){
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
    }
}

states["state"] = {
    "selectedContact":-1,
    "contacts": [
        {
            "name": "John Doe",
            "image": "https://www.w3schools.com/howto/img_avatar.png",
            "email": "jdoe1234@gmail.com",
            "phone": "123-456-7890",
            "address": "123 Main St, Anytown, CA 12345",
            "id": "1"
        },
        {
            "name": "Jane Doe",
            "image": "https://www.w3schools.com/howto/img_avatar.png",
            "email": "janey567@icloud.com",
            "phone": "123-456-7891",
            "address": "143 Fake St, Anytown, CO 11425",
            "id": "2"
        },
        {
            "name": "John Smith",
            "image": "https://www.w3schools.com/howto/img_avatar.png",
            "email": "jsmithlol@gmail.com",
            "phone": "123-456-7892",
            "address": "123 Fake St, Anytown, CO 11425",
            "id": "3"
        }
    ]
}
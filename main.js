
function User(id, name, mail, number) {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.number = number;
}

function ContactBook() {
    this.mainContainer = document.getElementById("main-container");
    this.list = document.getElementById("person-list");
    this.form = document.getElementById("input-form");
    this.inputName = document.getElementById("input-name");
    this.inputMail = document.getElementById("input-email");
    this.inputNumber = document.getElementById("input-number");
    this.addPerson = document.getElementById("add-person");
    this.readPerson = document.getElementById("read-data");

    this.persons = []; 
    var lisa = new User(0, "Lisa", "lisa@bla.com", "435657");
    var tom = new User(1, "Tom", "tom@bla.com", "43875643");
    this.persons.push(lisa);
    this.persons.push(tom);

    this.renderList = function() {
        this.list.innerHTML = "";
        for (let index = 0; index < this.persons.length; index++) {
            const user = this.persons[index];
            var item = this.renderUser(user);
            this.list.appendChild(item);
        }
    }

    this.renderUser = function(user, disableButtons) {
        var item = document.createElement("li");
        item.id = user.id;

        var personId = document.createElement("span");
        personId.innerHTML = user.id;
        item.appendChild(personId);

        var personalContainer = document.createElement("div");
        personalContainer.classList.add("personalData");
        item.appendChild(personalContainer);

        this.renderPersonalData(personalContainer, user);

        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttons");
        item.appendChild(buttonContainer);

        if (!disableButtons) {
            this.renderButtons(buttonContainer);
        } else {
            var closeButton = document.createElement("button");
            closeButton.innerHTML = "Close";
            item.appendChild(closeButton);
            closeButton.addEventListener("click", (event) => {
                this.readPerson.innerHTML = "";
            });
        }
        
        return item;
    }

    this.renderButtons = function(container, saveState) {
        var readButton = document.createElement("button");
        readButton.innerHTML = "Read";
        container.appendChild(readButton);
        readButton.addEventListener("click", (event) => {
            this.readPerson.innerHTML = "";
            var readUser = parseInt(event.target.parentNode.parentNode.id);
            var readUserData = this.persons.filter((person) => {
                if (person.id === readUser) {
                  return true;
                }
            });
            var user = this.renderUser(readUserData[0], true);
            this.readPerson.appendChild(user);
        });

        if (saveState) {
            var saveButton = document.createElement("button");
            saveButton.innerHTML = "Save";
            container.appendChild(saveButton);
            saveButton.addEventListener("click", (event) => {
                var saveUser = parseInt(event.target.parentNode.parentNode.id);
                var inputContainer = event.target.parentNode.parentNode.getElementsByClassName("personalData")[0];
                var inputs = inputContainer.getElementsByTagName("input");
                var newName = inputs[0].value;
                var newMail = inputs[1].value;
                var newNum = inputs[2].value
                this.persons.map((person) => {
                    if (person.id === saveUser) {
                      person.name = newName;
                      person.mail = newMail;
                      person.number = newNum;
                    }
                });
                this.renderList();
            });
        } else {
            var updateButton = document.createElement("button");
            updateButton.innerHTML = "Update";
            container.appendChild(updateButton);
            updateButton.addEventListener("click", (event) => {
                var updateUser = parseInt(event.target.parentNode.parentNode.id);
                var updateUserData = this.persons.filter((person) => {
                    if (person.id === updateUser) {
                      return true;
                    }
                });

                var inputContainer = event.target.parentNode.parentNode.getElementsByClassName("personalData")[0];
                inputContainer.innerHTML = "";
                this.renderInputFields(inputContainer, updateUserData[0]);

                var buttonContainer = event.target.parentNode.parentNode.getElementsByClassName("buttons")[0];
                buttonContainer.innerHTML = "";
                this.renderButtons(container, true);
            });
        }
        
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        container.appendChild(deleteButton);
        deleteButton.addEventListener("click", (event) => {
            var deletedUser = parseInt(event.target.parentNode.parentNode.id);
            this.persons = this.persons.filter((person) => {
                if (person.id !== deletedUser) {
                  return true;
                }
              });
            this.renderList();
        });
    }

    this.renderInputFields = function(inputContainer, userData) {
        var inputName = document.createElement("input");
        inputName.value = userData.name;
        inputName.type = "text";
        inputName.placeholder = "Update the name";
        inputContainer.appendChild(inputName);

        var inputMail = document.createElement("input");
        inputMail.value = userData.mail;
        inputName.type = "email";
        inputName.placeholder = "Update the E-mail";
        inputContainer.appendChild(inputMail);

        var inputNum = document.createElement("input");
        inputNum.value = userData.number;
        inputName.type = "text";
        inputName.placeholder = "Update the number";
        inputContainer.appendChild(inputNum);
    }

    this.renderPersonalData = function(personalContainer, user) {
        var name = document.createElement("span");
        name.innerHTML = user.name;
        personalContainer.appendChild(name);

        var mail = document.createElement("span");
        mail.innerHTML = user.mail;
        personalContainer.appendChild(mail);

        var num = document.createElement("span");
        num.innerHTML = user.number;
        personalContainer.appendChild(num);
    }

    this.resetForm = function() {
        this.inputName.value = "";
        this.inputMail.value = "";
        this.inputNumber.value = "";
    }

    this.registerEvents = function() {
        this.addPerson.addEventListener("click", (event) => {
            var personId = 0;
            if (this.persons.length !== 0) {
                personId = this.persons[this.persons.length - 1].id + 1;
            } 
            var person = new User(personId, this.inputName.value, this.inputMail.value, this.inputNumber.value);
            this.persons.push(person);
            this.renderList();
            this.resetForm();
        });
    }

    this.init = function() {
        this.renderList();
        this.registerEvents();
    }
}

var contacts = new ContactBook();
contacts.init();


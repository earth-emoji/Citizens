import { openModal, closeModal } from "./components/modal/index.js";
const uri: string = '/api/Strategies';
let strategies = [];

function getStrategies() {
    fetch(uri)
      .then(response => response.json())
      .then(data => _displayStr(data))
      .catch(error => console.error('Unable to get items.', error));
}

function addStrategy() {
    const description = (<HTMLInputElement> document.getElementById('Description'));
    const slug = (<HTMLInputElement> document.getElementById('Slug'));
  
    const obj = {
      slug: slug.value,
      description: description.value.trim()
    };
  
    fetch(uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(() => {
        getStrategies();
        description.value = '';
        document.getElementById("strModal").style.display='none';
      })
      .catch(error => console.error('Unable to add item.', error));
  }

function _displayStr(data) {
    const ul = document.getElementById("strategies");
    ul.innerHTML = "";

    const header = document.createElement("li");
    header.innerHTML = "<h4>Strategies</h4>";

    ul.append(header);
  
    data.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.description}`;

        let a = document.createElement("a");
        a.setAttribute("href", `/Dashboard/Strategies/Details/${item.id}`);
        a.innerHTML = "<p>Details</p>";

        li.append(a);
        ul.append(li);
    });
  
    strategies = data;
}

var form: HTMLFormElement = <HTMLFormElement> document.getElementById("str-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    addStrategy();
});

openModal("strModal", "openSM");
closeModal("strModal", "closeSM");
getStrategies();
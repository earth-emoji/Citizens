import { openModal, closeModal } from "./components/modal/index.js";
import { assignTeam } from "./components/strategies/index.js";

const uri: string = '/api/Tactics';
let tatics = [];

function getTactics() {
    fetch(uri)
      .then(response => response.json())
      .then(data => _displayTactics(data))
      .catch(error => console.error('Unable to get items.', error));
}

function addTactic() {
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
        getTactics();
        description.value = '';
        document.getElementById("taskModal").style.display='none';
      })
      .catch(error => console.error('Unable to add item.', error));
  }

function _displayTactics(data) {
    const ul = document.getElementById("tactics");
    ul.innerHTML = "";

    const header = document.createElement("li");
    header.innerHTML = "<h4>Tactics</h4>";

    ul.append(header);
  
    data.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.description}`;

        let a = document.createElement("a");
        a.setAttribute("href", `/Dashboard/Tactics/Details/${item.id}`);
        a.innerHTML = "<p>Details</p>";

        li.append(a);
        ul.append(li);
    });
  
    tatics = data;
}

var form: HTMLFormElement = <HTMLFormElement> document.getElementById("task-form");
var teamForm: HTMLFormElement = <HTMLFormElement> document.getElementById("teams-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    addTactic();
});

if (teamForm != null) {
  teamForm.addEventListener("submit", function(event) {
    event.preventDefault();
    assignTeam(this);
  });
}

openModal("taskModal", "openTM");
closeModal("taskModal", "closeTM");
getTactics();
import { openModal, closeModal } from "./components/modal/index.js";
const uri = '/api/Objectives';
let objectives = [];
function getObjectives() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayObjs(data))
        .catch(error => console.error('Unable to get items.', error));
}
function addObjective() {
    const description = document.getElementById('Description');
    const slug = document.getElementById('Slug');
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
        getObjectives();
        description.value = '';
        document.getElementById("objModal").style.display = 'none';
    })
        .catch(error => console.error('Unable to add item.', error));
}
function _displayObjs(data) {
    const ul = document.getElementById("objectives");
    ul.innerHTML = "";
    const header = document.createElement("li");
    header.innerHTML = "<h4>Objectives</h4>";
    ul.append(header);
    data.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.description}`;
        let a = document.createElement("a");
        a.setAttribute("href", `/Dashboard/Objectives/Details/${item.id}`);
        a.innerHTML = "<p>Details</p>";
        li.append(a);
        ul.append(li);
    });
    objectives = data;
}
var form = document.getElementById("obj-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    addObjective();
});
openModal("objModal", "openOM");
closeModal("objModal", "closeOM");
getObjectives();
//# sourceMappingURL=objective.js.map
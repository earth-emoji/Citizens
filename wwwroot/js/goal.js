import { bs4Card } from "./components/utils/html.js";
const uri = '/api/Goals';
let goals = [];
function getGoals() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayGoals(data))
        .catch(error => console.error('Unable to get items.', error));
}
function addGoal() {
    const description = document.getElementById('Description');
    const slug = document.getElementById('Slug');
    const goal = {
        slug: slug.value,
        description: description.value.trim()
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(goal)
    })
        .then(response => response.json())
        .then(() => {
        getGoals();
        description.value = '';
        var modal = document.querySelector("#exampleModal");
        modal.classList.remove("show");
        modal.style.display = "none";
        modal.removeAttribute("aria-modal");
        modal.setAttribute("aria-hidden", "true");
        document.querySelector(".modal-backdrop.fade").classList.remove("show");
    })
        .catch(error => console.error('Unable to add item.', error));
}
function _displayGoals(data) {
    const ul = document.getElementById("goals");
    ul.innerHTML = "";
    data.forEach(item => {
        let li = document.createElement("li");
        var card = bs4Card(item.description);
        let a = document.createElement("a");
        a.setAttribute("href", `/Dashboard/Goals/Details/${item.id}`);
        a.innerHTML = "<p>Details</p>";
        li.append(card);
        ul.append(li);
    });
    goals = data;
}
var form = document.getElementById("goal-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    addGoal();
});
getGoals();
//# sourceMappingURL=goal.js.map
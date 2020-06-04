import { assignTask } from "./components/tasks/index.js";
const forms = document.querySelectorAll(".task-assign-form");
forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        assignTask(this);
    });
});
//# sourceMappingURL=task.js.map
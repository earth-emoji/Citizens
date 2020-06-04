import { assignTask } from "./components/tasks/index.js";

const forms: NodeListOf<HTMLFormElement> = <NodeListOf<HTMLFormElement>> document.querySelectorAll(".task-assign-form");

forms.forEach(function(form: HTMLFormElement) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        assignTask(this);
    });
});
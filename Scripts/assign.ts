import { assignMember } from "./components/teams/index.js";

const forms: NodeListOf<HTMLFormElement> = <NodeListOf<HTMLFormElement>> document.querySelectorAll(".team-assign-form");

forms.forEach(function(form: HTMLFormElement) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        assignMember(form);
    });
});
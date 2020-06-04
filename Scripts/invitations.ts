import { sendInvite } from "./components/gatherings/invitation.js";

const forms: NodeListOf<HTMLFormElement> = <NodeListOf<HTMLFormElement>> document.querySelectorAll(".invite-form");

forms.forEach(function(form: HTMLFormElement) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        sendInvite(this);
    });
});
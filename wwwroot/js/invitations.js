import { sendInvite } from "./components/gatherings/invitation.js";
const forms = document.querySelectorAll(".invite-form");
forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendInvite(this);
    });
});
//# sourceMappingURL=invitations.js.map
import { assignMember } from "./components/teams/index.js";
const forms = document.querySelectorAll(".team-assign-form");
forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        assignMember(form);
    });
});
//# sourceMappingURL=assign.js.map
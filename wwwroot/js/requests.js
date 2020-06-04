import { inquiryResponse } from "./components/fellowships/request.js";
const forms = document.querySelectorAll(".response-form");
forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        inquiryResponse(form);
    });
});
//# sourceMappingURL=requests.js.map
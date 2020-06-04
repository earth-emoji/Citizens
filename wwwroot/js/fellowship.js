import { sendInquiry } from "./components/fellowships/request.js";
const form = document.getElementById("inquiry-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendInquiry(this);
});
//# sourceMappingURL=fellowship.js.map
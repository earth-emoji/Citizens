import { sendInquiry } from "./components/fellowships/request.js";

const form: HTMLFormElement = <HTMLFormElement> document.getElementById("inquiry-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    sendInquiry(this);
});

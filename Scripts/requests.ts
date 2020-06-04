import { inquiryResponse } from "./components/fellowships/request.js";

const forms: NodeListOf<HTMLFormElement> = <NodeListOf<HTMLFormElement>> document.querySelectorAll(".response-form");

forms.forEach(function(form: HTMLFormElement) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        inquiryResponse(form);
    });
});
import { w3Alert, removeElement } from "./../utils/html.js";
export function sendInquiry(form) {
    const type = document.getElementById('request-type');
    const uri = form.action;
    const inquiry = {
        type: type.value
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inquiry)
    })
        .then(response => response.json())
        .then((data) => {
        // send success message
        var message = document.getElementById("message");
        message.append(w3Alert(`${data.message}`, "green"));
        // display data in the console
        console.log(data);
    })
        .catch(error => console.error("Request wasn't sent.", error));
}
export function inquiryResponse(form) {
    const response = document.querySelector('input[name=response]:checked');
    const uri = form.action;
    const body = {
        response: response.value,
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then((data) => {
        // send success message
        var message = document.getElementById("message");
        var li = form.parentNode;
        message.append(w3Alert(`${data.message}`, "green"));
        removeElement("requests", li.id);
        // display data in the console
        console.log(data);
    })
        .catch(error => console.error("Request wasn't sent.", error));
}
//# sourceMappingURL=request.js.map
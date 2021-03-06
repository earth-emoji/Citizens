import { w3Alert } from "../utils/html.js";
export function assignTask(form) {
    const member = form.elements[0];
    const uri = form.action;
    const body = {
        member: member.value
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
        var taskBtn = form.elements[1];
        message.append(w3Alert(`${data.message}`, "green"));
        taskBtn.disabled = true;
        taskBtn.type = "button";
        taskBtn.innerHTML = "Assigned";
        // display data in the console
        console.log(data);
    })
        .catch(error => console.error("Request wasn't sent.", error));
}
//# sourceMappingURL=index.js.map
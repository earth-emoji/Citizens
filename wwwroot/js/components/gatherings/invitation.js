export function sendInvite(form) {
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
        const status = document.querySelector(`#${member.value} p.invite-status`);
        const inviteBtn = form.elements[1];
        status.innerHTML = "Invited";
        inviteBtn.disabled = true;
        inviteBtn.type = "button";
        inviteBtn.innerHTML = "Pending";
        // display data in the console
        console.log(data);
    })
        .catch(error => console.error("Request wasn't sent.", error));
}
//# sourceMappingURL=invitation.js.map
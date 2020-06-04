import { w3Alert, removeElement } from "./../utils/html.js";

export function sendInquiry(form: HTMLFormElement) {
  const type = (<HTMLInputElement> document.getElementById('request-type'));
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
      var message: HTMLElement = document.getElementById("message");
      message.append(w3Alert(`${data.message}`, "green"));

      // display data in the console
      console.log(data);
    })
    .catch(error => console.error("Request wasn't sent.", error));
}

export function inquiryResponse(form: HTMLFormElement) {

  const response = (<HTMLInputElement> document.querySelector('input[name=response]:checked'));
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
      var message: HTMLElement = document.getElementById("message");
      var li: HTMLElement = <HTMLElement> form.parentNode;
      message.append(w3Alert(`${data.message}`, "green"));
      removeElement("requests", li.id);

      // display data in the console
      console.log(data);
    })
    .catch(error => console.error("Request wasn't sent.", error));
}
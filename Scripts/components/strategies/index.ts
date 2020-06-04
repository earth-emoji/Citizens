import { removeElement } from "../utils/html.js";

export function assignTeam(form: HTMLFormElement) {

    const team: HTMLInputElement = <HTMLInputElement> form.elements[0];
    const uri: string = form.action;

    const body = {
        team: team.value
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
            var teamName: HTMLElement = document.createElement("p");
            var team: HTMLElement = document.getElementById("team");

            teamName.innerHTML = data.team;
            removeElement(team.id, "teams-form");
            team.append(teamName);
            // display data in the console
            console.log(data);
        })
        .catch(error => console.error("Request wasn't sent.", error));

}
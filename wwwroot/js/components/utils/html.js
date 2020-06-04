export function emptyList(ul) {
    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
    }
}
export function w3Alert(content, color) {
    var w3_alert = document.createElement("div");
    w3_alert.classList.add("w3-panel");
    w3_alert.classList.add(`w3-${color}`);
    w3_alert.classList.add(`w3-padding`);
    w3_alert.innerHTML = `${content}`;
    return w3_alert;
}
export function bs4Card(content) {
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var cardText = document.createElement("p");
    card.classList.add("card");
    cardBody.classList.add("card-body");
    cardText.classList.add("card-text");
    cardText.innerHTML = `${content}`;
    cardBody.append(cardText);
    card.append(cardBody);
    return card;
}
export function removeElement(parentElm, childElm) {
    if (childElm == parentElm) {
        console.log("The parent div cannot be removed.");
    }
    else if (document.getElementById(childElm)) {
        var child = document.getElementById(childElm);
        var parent = document.getElementById(parentElm);
        parent.removeChild(child);
    }
    else {
        console.log("Child div has already been removed or does not exist.");
        return false;
    }
}
//# sourceMappingURL=html.js.map
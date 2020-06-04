export function openModal(modal, trigger) {
    var element = document.getElementById(trigger);
    element.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById(modal).style.display = 'block';
    });
}
export function closeModal(modal, trigger) {
    var element = document.getElementById(trigger);
    element.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById(modal).style.display = 'none';
    });
}
//# sourceMappingURL=index.js.map
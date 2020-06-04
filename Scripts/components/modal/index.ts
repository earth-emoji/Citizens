export function openModal(modal: string, trigger: string) {

    var element: HTMLElement = document.getElementById(trigger);

    element.addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById(modal).style.display='block';
    });
}

export function closeModal(modal: string, trigger: string) {

    var element: HTMLElement = document.getElementById(trigger);

    element.addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById(modal).style.display='none';
    });
}
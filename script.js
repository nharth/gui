const draggableElements = document.querySelectorAll('.module');

// Make elements draggable
draggableElements.forEach(element => {
    element.setAttribute('draggable', true);

    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id || 'no-id');
        console.log(`${e.target.textContent} is being dragged`);
    });

    element.addEventListener('dragend', (e) => {
        console.log(`${e.target.textContent} drag ended`);
    });
});

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
    ev.preventDefault();

    // Get the id of the dragged element
    const data = ev.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);

    // Calculate the drop position relative to the panel
    const panel = ev.target;
    const panelRect = panel.getBoundingClientRect();
    const dropX = ev.clientX - panelRect.left;
    const dropY = ev.clientY - panelRect.top;

    // Append the dragged element to the panel
    if (panel.id === "panel") { // Ensure it's dropped in the right area
        draggedElement.style.position = "absolute";
        draggedElement.style.left = `${dropX}px`;
        draggedElement.style.top = `${dropY}px`;
        panel.appendChild(draggedElement);
    }
}
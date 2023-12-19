export function addPlayerToList(name, strength) {
    const li = document.createElement('li');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = name;
    li.appendChild(nameInput);

    const strengthInput = document.createElement('input');
    strengthInput.type = 'number';
    strengthInput.min = '1';
    strengthInput.max = '100';
    strengthInput.value = strength;
    li.appendChild(strengthInput);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.addEventListener('click', function() {
        li.remove();
    });
    li.appendChild(deleteButton);

    document.getElementById('playerList').appendChild(li);
}

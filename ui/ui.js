window.onload = async () => {
    const spawnButton = document.querySelector('#spawn');
    const modelsElem = document.querySelector('#models');
    modelsElem.innerHTML = '';
    modelsElem.disabled = true;
    spawnButton.disabled = true;

    const response = await fetch('vehicles.json', {
        method: 'GET',
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const json = await response.json()

    for (const element of json) {
        modelsElem.innerHTML += `<option value="${element.Name}">${element.DisplayName}</option>`
    }

    modelsElem.disabled = false;
    spawnButton.disabled = false;

    spawnButton.onclick = (e) => {
        fetch(`https://${GetParentResourceName()}/spawnClick`, {
            method: 'POST',
            body: JSON.stringify({
                hash: modelsElem.value
            })
        })
    }
}

window.addEventListener('message', (event) => {
    const data = event.data;

    if (typeof data.visible != 'undefined') {
        document.querySelector('.container').style.display = data.visible && 'block' || 'none';
    }
})

window.onkeydown = (e) => {
    if (e.key == 'Escape' || e.key == 'Backspace') {
        fetch(`https://${GetParentResourceName()}/close`, {
            method: 'POST'
        })
    }
}
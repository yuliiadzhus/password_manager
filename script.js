let data = [];
const form = document.getElementById('pm-form');
const list = document.getElementById('list');

form.onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const newItem = {
        service: document.getElementById('service').value,
        login: document.getElementById('login').value,
        pass: document.getElementById('pass').value,
        show: false
    };

    if (id === "") data.push(newItem);
    else data[id] = newItem;

    form.reset();
    document.getElementById('edit-id').value = "";
    document.getElementById('main-btn').innerText = "Зберегти";
    render();
};

function render() {
    list.innerHTML = data.map((item, i) => `
        <div class="card">
            <h3>${item.service}</h3>
            <p>👤 ${item.login}</p>
            <p>🔑 ${item.show ? item.pass : '••••••••'}</p>
            <div class="actions">
                <span onclick="toggle(${i})">${item.show ? 'Приховати' : 'Показати'}</span>
                <span onclick="edit(${i})">Редагувати</span>
                <span class="del" onclick="remove(${i})">Видалити</span>
            </div>
        </div>
    `).join('');
}

window.toggle = (i) => { data[i].show = !data[i].show; render(); };
window.remove = (i) => { data.splice(i, 1); render(); };
window.edit = (i) => {
    document.getElementById('service').value = data[i].service;
    document.getElementById('login').value = data[i].login;
    document.getElementById('pass').value = data[i].pass;
    document.getElementById('edit-id').value = i;
    document.getElementById('main-btn').innerText = "Оновити";
};
let passwords = [];
const form = document.getElementById('password-form');
const list = document.getElementById('password-list');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const service = document.getElementById('service-name').value;
    const login = document.getElementById('login').value;
    const pass = document.getElementById('password').value;
    const editIndex = document.getElementById('edit-index').value;

    const entry = { service, login, pass, visible: false };

    if (editIndex === "") {
        passwords.push(entry);
    } else {
        passwords[editIndex] = entry;
        document.getElementById('edit-index').value = "";
        submitBtn.textContent = "Додати запис";
    }

    form.reset();
    render();
});

function render() {
    list.innerHTML = '';
    passwords.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <div class="item-header">${item.service}</div>
            <div><strong>Логін:</strong> ${item.login}</div>
            <div><strong>Пароль:</strong> 
                <span>${item.visible ? item.pass : '••••••••'}</span>
            </div>
            <div class="actions">
                <button class="btn-small btn-show" onclick="togglePass(${index})">
                    ${item.visible ? 'Приховати' : 'Показати'}
                </button>
                <button class="btn-small btn-edit" onclick="editEntry(${index})">Редагувати</button>
                <button class="btn-small btn-delete" onclick="deleteEntry(${index})">Видалити</button>
            </div>
        `;
        list.appendChild(li);
    });
}

window.togglePass = (index) => {
    passwords[index].visible = !passwords[index].visible;
    render();
};

window.deleteEntry = (index) => {
    if(confirm('Видалити цей запис?')) {
        passwords.splice(index, 1);
        render();
    }
};

window.editEntry = (index) => {
    const entry = passwords[index];
    document.getElementById('service-name').value = entry.service;
    document.getElementById('login').value = entry.login;
    document.getElementById('password').value = entry.pass;
    document.getElementById('edit-index').value = index;
    
    submitBtn.textContent = "Зберегти зміни";
    window.scrollTo(0, 0);
};
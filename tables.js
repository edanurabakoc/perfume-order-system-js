let ordersPerfumes = localStorage.getItem('perfumes');

if (!ordersPerfumes) {
    ordersPerfumes = [];
} else {
    ordersPerfumes = JSON.parse(ordersPerfumes);
}

document.addEventListener('DOMContentLoaded', function () {
    RenderPerfumes();
});

function RenderPerfumes() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    ordersPerfumes.forEach((element, key) => {
        let newRow = document.createElement('tr');
        newRow.setAttribute('id', `row-${key}`);
        newRow.innerHTML = `
        <td>${key + 1}.product</td>
        <td>${element.name}</td>
        <td>${element.sex}</td> 
        <td>
        <a class='amountClass'>${element.amount}</a>
        </td>
        <td>${element.installment}</td> 
        <td>${element.ml}</td> 
        <td>
        <button id='${key}-delete-btn' onclick='DeleteButton(${key});'>Delete</button>
        </td>
        `;
        tbody.appendChild(newRow);
    });
}

function DeleteButton(id) {
    ordersPerfumes = ordersPerfumes.filter((_, key) => key !== id);
    UpdateLocalStorage();
    RenderPerfumes();
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('increase')) {
        increaseAmount(parseInt(e.target.dataset.key));
    } else if (e.target.classList.contains('decrease')) {
        decreaseAmount(parseInt(e.target.dataset.key));
    }
});

function increaseAmount(key) {
    if (ordersPerfumes[key]) {
        ordersPerfumes[key].amount++;
        UpdateLocalStorage();
        RenderPerfumes();
    }
}

function decreaseAmount(key) {
    if (ordersPerfumes[key] && ordersPerfumes[key].amount > 0) {
        ordersPerfumes[key].amount--;
        UpdateLocalStorage();
        RenderPerfumes();
    }
}

function UpdateLocalStorage() {
    localStorage.setItem('perfumes', JSON.stringify(ordersPerfumes));
    BringProducts() ;
}

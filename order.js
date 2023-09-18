let orderedPerfumes = JSON.parse(localStorage.getItem('orders'));
let renderPerfumes = JSON.parse(localStorage.getItem('perfumes'));

let isSortedAscending = false;

if (!orderedPerfumes) {
    orderedPerfumes = [];
}

function GetNotCompletedCount() {
    let notCompleted = orderedPerfumes.filter(orders => orders.isCompleted === false);
    document.querySelector('#notCompletedOrders').textContent = notCompleted.length;
}

document.addEventListener('DOMContentLoaded', function () {
    RenderPerfumeOrders();
    SortOrders();
    CheckRowForZeroAmount();
    GetNotCompletedCount();
    GetPrices();

    document.getElementById('dateHeader').addEventListener('click', function () {
        SortOrders();
    });
});

function RenderPerfumeOrders() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    orderedPerfumes.forEach((element, key) => {

        let newRow = document.createElement('tr');
        if (element.isCompleted == false) {
            newRow.style.backgroundColor = 'yellow';
        }
        newRow.setAttribute('id', `row-${key}`);
        newRow.innerHTML = `
        <td>${key + 1}.product</td>
        <td>${element.name}</td> 
        <td>${element.sex}</td> 
        <td>${element.gift ? `Yes` : `No`}</td> 
        <td>
        <span class='decrease' style='cursor: pointer;' title='decrease' data-key='${key}'>&darr;</span>
        <a class='amountClass'> ${element.amount}</a>
        <span class='increase' style='cursor: pointer;' title='increase' data-key='${key}'>&uarr;</span>
        </td>
        <td>${element.installment}</td> 
        <td>${element.ml}</td> 
        <td>${element.price}</td>  
        <td>
        <button id='${key}-delete-btn' onclick='DeleteButton(${key});'>Delete</button>
        ${element.isCompleted === false
                ? `<button id='${key}-completed-btn' onclick='CompletedButton(${key});'>Completed</button>`
                : ''
            }
        </td>
        <td> 
        ${element.isCompleted === true
                ? `
                <span > Completed
                    <a onclick='CancelComplete(${key});'
                        style='color: white; padding-right: 4px; padding-left: 4px; background: red; padding-bottom: 2px; cursor: pointer;'>
                        x
                    </a>
                </span>`
                : ''
            }
        </td>
        <td>${element.date}</td>
        `;
        tbody.appendChild(newRow);
    });
}

function DeleteButton(id) {
    let selectedRow = document.querySelector(`tbody tr#row-${id}`);
    let selectedRowPerfumeName = selectedRow.children[1].innerText;

    let perfume = renderPerfumes.find(perfume => perfume.name == selectedRowPerfumeName);
    if (perfume) {
        let selectedRowPerfumeAmount = parseInt(selectedRow.children[4].children[1].innerText);
        perfume.amount += selectedRowPerfumeAmount;
        localStorage.setItem('perfumes', JSON.stringify(renderPerfumes));
    }

    orderedPerfumes = orderedPerfumes.filter((_, key) => key !== id);
    UpdateLocalStorage();
    RenderPerfumeOrders();
    GetNotCompletedCount();
    GetPrices();
    CheckRowForZeroAmount();
}

function CompletedButton(id) {

    let selectedRow = document.querySelector(`tbody tr#row-${id}`);
    let selectedRowCompleted = selectedRow.children[8];
    let selectedRowCompletedText = selectedRow.children[9];

    orderedPerfumes[id].isCompleted = true;
    selectedRow.style.backgroundColor = '';

    localStorage.setItem('orders', JSON.stringify(orderedPerfumes));

    let selectedRowCompletedButton = selectedRow.querySelector(`button[id='${id}-completed-btn']`);

    selectedRowCompletedButton.remove();

    if (selectedRowCompleted) {
        selectedRowCompletedText.innerHTML = `
        <span > Completed 
             <a onclick='CancelComplete(${id});'
                 style='color: white; padding-right: 4px; padding-left: 4px; background: red; padding-bottom: 2px ;cursor: pointer;'>
              x
            </a> 
        </span>`;
    }
    GetNotCompletedCount();
    GetPrices();
    CheckRowForZeroAmount();
}

function CancelComplete(id) {
    orderedPerfumes[id].isCompleted = false;
    localStorage.setItem('orders', JSON.stringify(orderedPerfumes));

    let selectedRow = document.querySelector(`tbody tr#row-${id}`);
    let selectedRowCompleted = selectedRow.children[8];
    selectedRowCompleted.innerHTML = selectedRowCompleted.innerHTML + `<button id='${id}-completed-btn' onclick='CompletedButton(${id});'>Completed</button>`;
    selectedRow.style.backgroundColor = 'yellow';
    let selectedRowCompletedText = selectedRow.children[9];
    selectedRowCompletedText.innerText = '';

    GetNotCompletedCount();
    GetPrices();
    CheckRowForZeroAmount();
}

function CheckRowForZeroAmount() {
    let allRows = document.querySelectorAll('tbody tr');

    allRows.forEach(function (row) {
        let zeroAmount = parseInt(row.children[4].children[1].innerText, 10);
        if (zeroAmount === 0) {
            row.style.backgroundColor = 'red';
        }
    });
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('increase')) {
        increaseAmount(parseInt(e.target.dataset.key));
    } else if (e.target.classList.contains('decrease')) {
        decreaseAmount(parseInt(e.target.dataset.key));
    }
});

function increaseAmount(key) {
    if (orderedPerfumes[key]) {
        orderedPerfumes[key].amount++;
        UpdateLocalStorage();
        RenderPerfumeOrders();
        UpdateLocalStorage(key);
        CheckRowForZeroAmount();
    }
}

function decreaseAmount(key) {
    if (orderedPerfumes[key] && orderedPerfumes[key].amount > 0) {
        orderedPerfumes[key].amount--;
        UpdateLocalStorage();
        RenderPerfumeOrders();
        UpdateLocalStorage(key);
        CheckRowForZeroAmount();
    }
}

function UpdateLocalStorage(id) {
    let selectedRow = document.querySelector(`tbody tr#row-${id}`);
    let selectedRowPerfumeName = selectedRow.children[1].innerText;
    let perfume = renderPerfumes.find(perfume => perfume.name == selectedRowPerfumeName);
    let selectedRowPerfumeAmount = parseInt(selectedRow.children[4].children[1].innerText);

    let newTotalAmount = selectedRowPerfumeAmount * perfume.price;
    selectedRow.children[7].innerHTML = newTotalAmount;

    orderedPerfumes[id].price = newTotalAmount;
    UpdateLocalStorage();
}

function UpdateLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(orderedPerfumes));
}

function GetPrices() {
    let completedOrders = orderedPerfumes.filter(orders => orders.isCompleted === true);
    let totalPrice = 0;

    completedOrders.forEach(order => {
        totalPrice = totalPrice + order.price;
    });

    document.querySelector('#allPrice').textContent = totalPrice;

    let nonCompletedOrders = orderedPerfumes.filter(orders => orders.isCompleted === false);

    let pendingPrice = 0;

    nonCompletedOrders.forEach(order => {
        pendingPrice = pendingPrice + order.price;
    });
    document.querySelector('#pendingPrice').textContent = pendingPrice;
}

function SortOrders() {
    orderedPerfumes.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (isNaN(dateA) && isNaN(dateB)) {
            return 0;
        }
        if (isNaN(dateA)) {
            return 1;
        }
        if (isNaN(dateB)) {
            return -1;
        }
        return isSortedAscending ? dateA - dateB : dateB - dateA;
    });
    isSortedAscending = !isSortedAscending;

    RenderPerfumeOrders();
    CheckRowForZeroAmount();
    UpdateLocalStorage();
}


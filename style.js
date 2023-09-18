var productType, listProduct, productQuantity, productInstallment;
var subTotal, totalAmountDue, shippingFee = 7;
var list, options;

let perfumes = [
    {
        name: 'Prada',
        price: 500,
        sex: 'Female',
        amount: 20,
        installment: 3,
        gift: true,
        ml: '50ml'
    },
    {
        name: 'Calvin Klein',
        price: 400,
        sex: 'Male',
        amount: 20,
        installment: 6,
        gift: true,
        ml: '30ml'
    },
    {
        name: 'Hermes',
        price: 500,
        sex: 'Female',
        amount: 30,
        installment: 12,
        gift: true,
        ml: '30ml'
    },
    {
        name: 'Lacoste',
        price: 300,
        sex: 'Female',
        amount: 20,
        installment: 3,
        gift: true,
        ml: '30ml'
    },
    {
        name: 'Axe',
        price: 200,
        sex: 'Male',
        amount: 40,
        installment: 3,
        gift: true,
        ml: '30ml'
    },
]

let renderPerfumes = localStorage.getItem('perfumes');
let productFile = document.getElementById('productFile');

if (!renderPerfumes) {
    localStorage.setItem('perfumes', JSON.stringify(perfumes));
    renderPerfumes = perfumes;
} else {
    renderPerfumes = JSON.parse(renderPerfumes);
}

function RemoveOptions(selectElement) {
    while (selectElement.options.length) {
        selectElement.remove(0);
    }
}

function ProductQuantityFill() {
    var perfumName = document.getElementById('listProduct').value;
    var perfum = renderPerfumes.find(f => f.name == perfumName);
    let perfumAmount = perfum.amount;

    RemoveOptions(document.getElementById('productQuantity'));

    for (let index = 1; index <= perfumAmount; index++) {
        options = document.createElement('option');
        options.text = `${index} Amount`;
        options.value = index;

        list = document.getElementById('productQuantity');
        list.options.add(options);
    }
    img();
}

function img() {
    let selectedPerfumeName = document.getElementById('listProduct').value;
    let selectedPerfume = renderPerfumes.find(perfume => perfume.name == selectedPerfumeName);

    if (selectedPerfume && selectedPerfume.name === 'Prada') {
        document.getElementById('img').src = 'img/img-prada.jpg';
    }
    if (selectedPerfume && selectedPerfume.name === 'Hermes') {
        document.getElementById('img').src = 'img/img-hermes.jpg';
    }
    if (selectedPerfume && selectedPerfume.name === 'Calvin Klein') {
        document.getElementById('img').src = 'img/img-calvinklein.jpg';
    }
    if (selectedPerfume && selectedPerfume.name === 'Lacoste') {
        document.getElementById('img').src = 'img/img-lacoste.jpg';
    }
    if (selectedPerfume && selectedPerfume.name === 'Axe') {
        document.getElementById('img').src = 'img/img-axe.jpg';
    }
    if (selectedPerfume && selectedPerfume.img) {
        document.getElementById('img').src = selectedPerfume.img;
    }
}

function ProductInstallmentFill() {
    var perfumName = document.getElementById('listProduct').value;
    var perfumInstallment = renderPerfumes.find(f => f.name == perfumName).installment;

    RemoveOptions(document.getElementById('productInstallment'));

    for (i = 0; i <= perfumInstallment; i++) {
        options = document.createElement('option');
        list = document.getElementById('productInstallment');
        list.options.add(options);
        options.text = i;
        options.value = i;
    }
}

function BringProducts() {
    document.querySelectorAll('select#listProduct option').forEach(option => option.remove());
    list = document.getElementsByName('productType');

    list.forEach(element => {

        if (element.checked === true) {
            productType = element.value;
        }
    });

    if (productType == 'Male') {
        renderPerfumes.filter(f => f.sex == 'Male').forEach(p => {

            let optionElement = document.createElement('option');
            optionElement.text = p.name;
            optionElement.value = p.name;

            let selectListElement = document.getElementById('listProduct');
            selectListElement.options.add(optionElement);
        });
    }
    else if (productType == 'Female') {
        renderPerfumes.filter(f => f.sex == 'Female').forEach(p => {

            let optionElement = document.createElement('option');
            optionElement.text = p.name;
            optionElement.value = p.name;

            let selectListElement = document.getElementById('listProduct');
            selectListElement.options.add(optionElement);
        });
    }
}

function Calculate() {
    let perfumName = document.getElementById('listProduct').value;
    var perfum = renderPerfumes.find(perfume => perfume.name == perfumName);
    let perfumPrice = perfum.price;

    document.getElementById('txtUnitPrice').value = perfumPrice;

    list = document.getElementById('productQuantity');
    productQuantity = Number(list[list.selectedIndex].value);
    console.log(productQuantity);

    list = document.getElementById('productInstallment');
    productInstallment = list[list.selectedIndex].value;
    console.log(productInstallment);

    subTotal = perfumPrice * productQuantity;

    if (productInstallment == 1) {
        subTotal = subTotal * 1.1;

    }
    else if (productInstallment == 2) {
        subTotal = subTotal * 1.2;
    }
    else if (productInstallment == 3) {
        subTotal = subTotal * 1.3;
    }
    else if (productInstallment == 4) {
        subTotal = subTotal * 1.4;
    }
    else if (productInstallment == 5) {
        subTotal = subTotal * 1.5;
    }
    else if (productInstallment == 6) {
        subTotal = subTotal * 1.6;
    }
    else if (productInstallment == 7) {
        subTotal = subTotal * 1.7;
    }
    else if (productInstallment == 8) {
        subTotal = subTotal * 1.8;
    }
    else if (productInstallment == 9) {
        subTotal = subTotal * 1.9;
    }
    else if (productInstallment == 10) {
        subTotal = subTotal * 1.9;
    }
    else if (productInstallment == 11) {
        subTotal = subTotal * 1.9;
    }
    else if (productInstallment == 12) {
        subTotal = subTotal * 1.9;
    }

    console.log(subTotal.toFixed(2));
    document.getElementById('txtSubtotalButton').value = subTotal.toFixed(2);

    if (subTotal < 1000) {
        document.getElementById('txtShipping').value = shippingFee;
        totalAmountDue = subTotal + shippingFee;
    }
    else if (subTotal >= 1000) {
        document.getElementById('txtShipping').value = 0;
        totalAmountDue = subTotal;
    }
    console.log(totalAmountDue.toFixed(2));
    document.getElementById('result').innerHTML = 'Total Amount Due (Including Interest and Shipping): ' + totalAmountDue.toFixed(2);
}

function InputCheck() {
    var perfumeName = document.getElementById('listProduct').value;
    var sexValue;
    if (document.getElementById('manProducts').checked) {
        sexValue = 'Male';
    } else {
        sexValue = 'Female';
    }

    var sex = sexValue;
    var perfumAmount = parseInt(document.getElementById('productQuantity').value);
    var perfumInstallment = parseInt(document.getElementById('productInstallment').value);

    if (!perfumeName || !sex || isNaN(perfumAmount) || isNaN(perfumInstallment)) {
        alert('Fill all inputs!');
        return false;

    } else {
        Calculate();
        return true;
    }
}

function SaveOrderToLocalStorage() {
    var isChecked = InputCheck();
    if (isChecked == false) {
        return;
    }
    let sexValue;
    if (document.getElementById('manProducts').checked) {
        sexValue = 'Male';
    }
    else {
        sexValue = 'Female';
    }

    let order = {
        name: document.getElementById('listProduct').value,
        price: parseInt(document.getElementById('txtSubtotalButton').value),
        sex: sexValue,
        gift: document.querySelector('input[name="giftPackage"]:checked').value == 'true' ? true : false,
        amount: parseInt(document.getElementById('productQuantity').value),
        installment: parseInt(document.getElementById('productInstallment').value),
        ml: document.getElementById('productMl').value,
        isCompleted: false,
        date: document.getElementById('myDatetimeInput').value,
    }

    let orders = [];

    if (localStorage.getItem('orders') != null) {
        orders = JSON.parse(localStorage.getItem('orders'));
    }

    orders.unshift(order);

    localStorage.setItem('orders', JSON.stringify(orders));
}

function DecreaseAmount() {
    let selectedPerfumeName = document.getElementById('listProduct').value;
    let selectedPerfume = renderPerfumes.find(f => f.name == selectedPerfumeName);
    if (parseInt(document.getElementById('productQuantity').value) > selectedPerfume.amount) {
        alert('Insufficient Stock!')
        return;
    };

    selectedPerfume.amount = selectedPerfume.amount - parseInt(document.getElementById('productQuantity').value);
    localStorage.setItem('perfumes', JSON.stringify(renderPerfumes));

    ProductQuantityFill();
}

function SetTodayDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;

    document.getElementById('myDatetimeInput').value = formattedDatetime;
}
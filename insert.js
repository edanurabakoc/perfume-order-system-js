let renderPerfumes = localStorage.getItem('perfumes');

function limitInput(event, maxValue) {
    const value = event.target.value;
    if (parseInt(value) > maxValue || isNaN(value)) {
        event.preventDefault();
    }
}

document.getElementById('productInstallment').addEventListener('input', (e) => limitInput(e, 12));
document.getElementById('productQuantity').addEventListener('input', (e) => limitInput(e, 1000));
document.getElementById('productPrice').addEventListener('input', (e) => limitInput(e, 100000));

function Add() {
    const productName = document.getElementById('listProduct').value;
    const productPrice = document.getElementById('productPrice').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productInstallment = parseInt(document.getElementById('productInstallment').value);
    const productTypeList = document.getElementsByName('productType');

    let productTypeSelected = false;

    for (const element of productTypeList) {
        if (element.checked) {
            productTypeSelected = true;
            break;
        }
    }

    if (!productName || !productPrice || !productQuantity || !productTypeSelected) {
        alert('All fields must be completed!');
        return;
    }

    if (productInstallment < 1 || productInstallment > 12) {
        alert('The number of installments must be between 1 and 12.');
        return;
    }

    const productQuantityInt = parseInt(productQuantity);
    if (productQuantityInt < 1 || productQuantityInt > 1000) {
        alert('The product quantity must be between 1 and 1000.');
        return;
    }

    const productPriceInt = parseInt(productPrice);
    if (productPriceInt < 1 || productPriceInt > 100000) {
        alert('The product price must be between 1 and 100000.');
        return;
    }

    let productType;
    let reader = new FileReader();

    for (const element of productTypeList) {
        if (element.checked) {
            productType = element.value;
            break;
        }
    }

    const newPerfume = {
        name: productName,
        price: parseInt(productPrice),
        sex: productType,
        amount: parseInt(productQuantity),
        ml: document.getElementById('productMl').value,
        installment: productInstallment,
        img: null
    };

    reader.onload = function (event) {
        newPerfume.img = event.target.result;

        const newArray = JSON.parse(renderPerfumes || '[]');
        newArray.unshift(newPerfume);
        localStorage.setItem('perfumes', JSON.stringify(newArray));
        document.getElementById('result').innerHTML = `New Product ${(newPerfume.name)} Added`;
    };

    const productFile = document.getElementById('productFile').files[0];
    if (productFile) {
        reader.readAsDataURL(productFile);
    } else {
        const newArray = JSON.parse(renderPerfumes || '[]');
        newArray.unshift(newPerfume);
        localStorage.setItem('perfumes', JSON.stringify(newArray));
        document.getElementById('result').innerHTML = `New Product ${(newPerfume.name)} Added`;
    }
}


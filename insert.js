let renderPerfumes = localStorage.getItem('perfumes');

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

    if (isNaN(productInstallment) || productInstallment > 12) {
        alert('The number of installments cannot be greater than 12');
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

